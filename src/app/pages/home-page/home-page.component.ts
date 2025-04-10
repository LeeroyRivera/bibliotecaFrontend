import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, HeaderComponent],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  //providers: [BooksDataService]
})
export class HomePageComponent {

  constructor(private router: Router) {}

  goToBooks() {
    // Navegar a la página de libros
    this.router.navigate(['libros']);
  }

}
