import { Component } from '@angular/core';
import { BooksDataService } from '../../services/books-data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [BooksDataService]
})
export class HomePageComponent {

}
