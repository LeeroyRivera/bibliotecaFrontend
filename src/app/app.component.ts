import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoansComponent } from "./pages/loans/loans.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, LoginComponent, HeaderComponent, HomePageComponent, LoansComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bibliotecaFrontend';
}
