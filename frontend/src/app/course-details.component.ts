import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<section class="page"><a routerLink="/">← Dashboard</a><h1>Course details</h1><p>Selected course ID: <strong>{{ courseId }}</strong></p></section>`,
})
export class CourseDetailsComponent {
  readonly courseId = inject(ActivatedRoute).snapshot.paramMap.get('id');
}
