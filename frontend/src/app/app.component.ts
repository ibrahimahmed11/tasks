import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { StudyService } from './services/study.service';
import { Course, Task, User } from './models/study.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  courses: Course[] = [];
  tasks: Task[] = [];
  loading = true;
  error = '';
  user: User | null = null;
  showProfile = false;
  activePanel: 'settings' | 'notifications' | 'help' | null = null;
  showNavMenu = false;
  authMode: 'login' | 'register' = 'login';
  authForm = { name: '', email: '', password: '' };
  showCourseForm = false;
  showTaskForm = false;
  newCourse = { name: '', code: '' };
  newTask = { title: '', course: 'Independent study', due: 'Today', type: 'Personal' };

  constructor(
    private readonly authService: AuthService,
    private readonly studyService: StudyService,
  ) {
    this.user = this.authService.user();
    if (this.token) void this.loadDashboard();
    else this.loading = false;
  }

  get token(): string | null { return this.authService.token; }
  get completedTasks(): number { return this.tasks.filter((task) => task.done).length; }

  async loadDashboard(): Promise<void> {
    this.loading = true;
    this.error = '';
    try {
      const dashboard = await this.studyService.getDashboard();
      this.courses = dashboard.courses;
      this.tasks = dashboard.tasks;
    } catch (error) {
      if ((error as { status?: number }).status === 401) {
        await this.logout(false);
      } else {
        this.error = error instanceof Error ? `Backend request failed: ${error.message}` : 'Unable to connect to the backend.';
      }
    } finally {
      this.loading = false;
    }
  }

  async authenticate(): Promise<void> {
    this.error = '';
    try {
      if (this.authMode === 'login') await this.authService.login(this.authForm.email, this.authForm.password);
      else await this.authService.register(this.authForm.name, this.authForm.email, this.authForm.password);
      this.user = this.authService.user();
      this.authForm = { name: '', email: '', password: '' };
      await this.loadDashboard();
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Authentication failed.';
    }
  }

  async logout(notify = true): Promise<void> {
    if (notify && this.token) await this.authService.logout();
    else this.authService.clearSession();
    this.user = null;
    this.showProfile = false;
    this.activePanel = null;
    this.showNavMenu = false;
    this.courses = [];
    this.tasks = [];
    this.loading = false;
  }

  async toggleTask(task: Task): Promise<void> {
    await this.studyService.updateTask(task.id, { done: !task.done });
    await this.loadDashboard();
  }

  async addCourse(): Promise<void> {
    if (!this.newCourse.name.trim() || !this.newCourse.code.trim()) return;
    await this.studyService.addCourse(this.newCourse);
    this.newCourse = { name: '', code: '' };
    this.showCourseForm = false;
    await this.loadDashboard();
  }

  async addTask(): Promise<void> {
    if (!this.newTask.title.trim()) return;
    await this.studyService.addTask(this.newTask);
    this.newTask = { title: '', course: 'Independent study', due: 'Today', type: 'Personal' };
    this.showTaskForm = false;
    await this.loadDashboard();
  }

  async removeCourse(course: Course): Promise<void> {
    await this.studyService.removeCourse(course.id);
    await this.loadDashboard();
  }

  async removeTask(task: Task): Promise<void> {
    await this.studyService.removeTask(task.id);
    await this.loadDashboard();
  }
}
