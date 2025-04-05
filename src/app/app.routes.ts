import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'home', 
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];