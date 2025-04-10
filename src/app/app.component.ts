import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, LoginComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bibliotecaFrontend';
}
