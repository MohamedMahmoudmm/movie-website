import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Search } from '../search/search';
import { CardComponents } from '../card-components/card-components';
import { MovieModel } from '../../models/movie-model';
import { HttpService } from '../../services/http-service';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-mainpage',
  imports: [Header, Search, CardComponents, Footer],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})
export class Mainpage {
  movies: MovieModel[] = [];

  sessionId: string | null = '257779405c116d07a85e34239541134469da2573';

  // Pagination state
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(private http: HttpService) {
    // this.sessionId = localStorage.getItem('session_id');
    console.log(this.sessionId);
  }

  ngOnInit() {
    this.getAllMovie();
  }
  getAllMovie(page: number = 1) {
    this.http.get('movie/popular', {page:`${page}`}).subscribe({
      next: (movies) => {
        this.movies = movies.results;
        this.totalPages = movies.total_pages;
        this.currentPage = movies.page;
      },
    });
  }

  onPageChange(page: number) {
    this.getAllMovie(page);
  }
}
