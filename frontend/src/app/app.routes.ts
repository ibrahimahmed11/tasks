import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminChildComponent } from './admin-child.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { CourseDetailsComponent } from './course-details.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'courses/:id', component: CourseDetailsComponent, canActivate: [authGuard] },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, adminGuard],
    children: [
      { path: 'courses', component: AdminChildComponent },
      { path: 'tasks', component: AdminChildComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
