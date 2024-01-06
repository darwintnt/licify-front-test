import { Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { ActiveComponent } from './views/projects/active/active.component';
import { ApplyComponent } from './views/projects/apply/apply.component';
import { ProjectHomeComponent } from './views/projects/project-home/project-home.component';
import { ProjectRegisterComponent } from './views/projects/project-register/project-register.component';

export const routes: Routes = [
  // auth views
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // admin views
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'active', component: ActiveComponent },
      { path: 'apply', component: ApplyComponent },
      { path: 'project-home', component: ProjectHomeComponent },
      { path: 'project-home/register', component: ProjectRegisterComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
