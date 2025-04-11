import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { LoansFormComponent } from './pages/loans-form/loans-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, LoansFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bibliotecaFrontend';
}
