import { Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ActiveComponent } from './views/projects/active/active.component';
import { ApplyComponent } from './views/projects/apply/apply.component';
import { ProjectHomeComponent } from './views/projects/project-home/project-home.component';
import { ProjectRegisterComponent } from './views/projects/project-register/project-register.component';
import { AuthGuard } from './helpers/guards/auth.guard';
import { IsProvider } from './helpers/guards/isProvider.guard';
import { IsConstructor } from './helpers/guards/isConstructor.guard';
import { ApplicationComponent } from './views/projects/application/application.component';

export const routes: Routes = [
  // auth views
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // constructor views
  {
    path: 'constructor',
    component: AdminComponent,
    canActivate: [AuthGuard, IsConstructor],
    children: [
      { path: 'projects', component: ProjectHomeComponent },
      { path: 'projects/register', component: ProjectRegisterComponent },
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
    ],
  },

  // provider views
  {
    path: 'provider',
    component: AdminComponent,
    canActivate: [AuthGuard, IsProvider],
    children: [
      { path: 'active', component: ActiveComponent },
      { path: 'apply', component: ApplyComponent },
      { path: 'applications', component: ApplicationComponent },
      { path: '', redirectTo: 'active', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
