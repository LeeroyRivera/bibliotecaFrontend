import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterPageComponent }, 
  { path: '**', component: NotFoundComponent },


];
