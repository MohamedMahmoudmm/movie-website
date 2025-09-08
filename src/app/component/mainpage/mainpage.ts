import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Search } from '../search/search';
import { CardComponents } from '../card-components/card-components';
import { MovieModel } from '../../models/movie-model';
import { HttpService } from '../../services/http-service';

@Component({
  selector: 'app-mainpage',
  imports: [Header,Search,CardComponents],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css'
})
export class Mainpage {
  
  movies: MovieModel[] = [];
  

  sessionId : string | null = '257779405c116d07a85e34239541134469da2573';
  constructor(private http : HttpService){  
    // this.sessionId = localStorage.getItem('session_id');  
    console.log(this.sessionId);
  }

  ngOnInit() {
    this.getAllMovie();
  }
  getAllMovie() 
  {
    this.http.get('movie/now_playing').subscribe({
      next: (movies) => {
        this.movies = movies.results;
      }
    })
  }
}
