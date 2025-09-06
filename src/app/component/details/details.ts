import { Component } from '@angular/core';
import { Header } from '../header/header';
import { CardComponents } from '../card-components/card-components';
import { MovieDetailsComponent } from '../movie-details-component/movie-details-component';

@Component({
  selector: 'app-details',
  imports: [Header,CardComponents,MovieDetailsComponent],
  templateUrl: './details.html',
  styleUrl: './details.css'
})

export class Details {

}
