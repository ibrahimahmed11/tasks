import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamMember } from './models/team-member.model';

type ViewMode = 'card' | 'list';

interface NewMemberForm {
  name: string;
  age: number | null;
  department: string;
  available: boolean;
}

interface FormErrors {
  name?: string;
  age?: string;
  department?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // --- Component state ---

  departments: string[] = ['Development', 'Marketing', 'Design'];

  teamMembers: TeamMember[] = [
    { id: 1, name: 'Ahmed', age: 28, department: 'Development', available: true },
    { id: 2, name: 'Esraa', age: 24, department: 'Development', available: true },
    { id: 3, name: 'Sara', age: 31, department: 'Marketing', available: false },
  ];

  selectedDepartment = 'All';

  viewMode: ViewMode = 'card';

  newMember: NewMemberForm = this.emptyForm();

  formErrors: FormErrors = {};

  private nextId = 4;

  // --- Derived data ---

  /** Members matching the currently selected department filter. */
  get filteredMembers(): TeamMember[] {
    if (this.selectedDepartment === 'All') {
      return this.teamMembers;
    }
    return this.teamMembers.filter((m) => m.department === this.selectedDepartment);
  }

  // --- Actions ---

  addMember(): void {
    if (!this.validateForm()) {
      return;
    }

    const member: TeamMember = {
      id: this.nextId++,
      name: this.newMember.name.trim(),
      age: this.newMember.age as number,
      department: this.newMember.department,
      available: this.newMember.available,
    };

    this.teamMembers.push(member);
    this.newMember = this.emptyForm();
    this.formErrors = {};
  }

  toggleAvailability(id: number): void {
    const member = this.teamMembers.find((m) => m.id === id);
    if (member) {
      member.available = !member.available;
    }
  }

  setViewMode(mode: ViewMode): void {
    this.viewMode = mode;
  }

  // --- Helpers ---

  private validateForm(): boolean {
    const errors: FormErrors = {};

    if (!this.newMember.name || !this.newMember.name.trim()) {
      errors.name = 'Name is required.';
    }

    if (this.newMember.age === null || this.newMember.age === undefined) {
      errors.age = 'Age is required.';
    } else if (this.newMember.age <= 0 || this.newMember.age > 100) {
      errors.age = 'Enter a realistic age (1-100).';
    }

    if (!this.newMember.department) {
      errors.department = 'Please select a department.';
    }

    this.formErrors = errors;
    return Object.keys(errors).length === 0;
  }

  private emptyForm(): NewMemberForm {
    return {
      name: '',
      age: null,
      department: this.departments[0],
      available: false,
    };
  }
}
