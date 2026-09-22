import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `<section class="page"><a routerLink="/">← Dashboard</a><h1>Admin area</h1><nav><a routerLink="courses">Courses</a> · <a routerLink="tasks">Tasks</a></nav><router-outlet></router-outlet></section>`,
})
export class AdminLayoutComponent {}

