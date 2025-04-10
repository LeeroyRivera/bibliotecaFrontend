import { Component } from '@angular/core';
import { BooksDataService } from '../../services/books-data.service';
import { RouterModule } from '@angular/router';
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

}
