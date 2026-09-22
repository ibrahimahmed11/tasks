import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Course, Dashboard, Task } from '../models/study.models';

@Injectable({ providedIn: 'root' })
export class StudyService {
  private readonly apiUrl = 'http://localhost:5001/api/study';

  constructor(private readonly http: HttpClient) {}

  getDashboard(): Promise<Dashboard> {
    return firstValueFrom(this.http.get<Dashboard>(`${this.apiUrl}/dashboard`));
  }

  addCourse(course: { name: string; code: string }): Promise<Course> {
    return firstValueFrom(this.http.post<Course>(`${this.apiUrl}/courses`, course));
  }

  removeCourse(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/courses/${id}`));
  }

  addTask(task: { title: string; course: string; due: string; type: string }): Promise<Task> {
    return firstValueFrom(this.http.post<Task>(`${this.apiUrl}/tasks`, task));
  }

  updateTask(id: number, changes: Partial<Task>): Promise<Task> {
    return firstValueFrom(this.http.patch<Task>(`${this.apiUrl}/tasks/${id}`, changes));
  }

  removeTask(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/tasks/${id}`));
  }
}
