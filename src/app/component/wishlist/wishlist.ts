import { Component } from '@angular/core';
import { Header } from '../header/header';
// import { CardComponents } from '../card-components/card-components';
import { MovieDetailsComponent } from '../movie-details-component/movie-details-component';

@Component({
  selector: 'app-wishlist',
  imports: [Header , MovieDetailsComponent],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {

}
