import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Search } from '../search/search';
import { CardComponents } from '../card-components/card-components';
import { MovieModel } from '../../models/movie-model';
import { HttpService } from '../../services/http-service';
import { Footer } from '../footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  imports: [Header, Search, CardComponents, Footer],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})
export class Mainpage {
  movies: MovieModel[] = [];
  favList:MovieModel[]=[];
  watchList:MovieModel[]=[];

  // Pagination state
  totalPages: number = 1;
  currentPage: number = 1;


  sessionId : string ='';
  constructor(private http : HttpService,private router:Router){
  }

   ngOnInit() {
    this.sessionId =localStorage.getItem('session_id')??''; 
    if(!this.sessionId)this.router.navigate(['/login']);

    this.getAllMovie();
    this.getFav();
    this.getWatchList();
  }
  getFav() {
    this.http.get(`account/21908959/favorite/movies?session_id=${this.sessionId}`).subscribe({
      next: (movies) => {
        console.log('favList', movies.results);
        this.favList = movies.results;
        this.updateFavOnMainPage();
      },
    });
  }
  getWatchList() {
    this.http.get(`account/21908959/watchlist/movies?session_id=${this.sessionId}`).subscribe({
      next: (movies) => {
        console.log('watchList', movies.results);
        this.watchList = movies.results;
        this.updateWatchOnMainPage();
      },
    });
  }

  getAllMovie(page: number = 1) {
    this.http.get(`movie/popular?page=${page}`).subscribe({
      next: (movies) => {
        console.log('fetched movies', movies.results);

        this.movies = movies.results;
        this.totalPages = Math.min(movies.total_pages, 500);
        this.currentPage = movies.page;
        this.updateFavOnMainPage();
        this.updateWatchOnMainPage();
      },
    });
  }

  onPageChange(page: number) {
    this.getAllMovie(page);
  }

  updateFavOnMainPage() {
    const favIds = new Set(this.favList.map((f) => f.id));
    this.movies.forEach((m) => {
      m.inFav = favIds.has(m.id); // update the flag
    });
  }

  updateWatchOnMainPage() {
    const favIds = new Set(this.watchList.map((f) => f.id));
    this.movies.forEach((m) => {
      m.inWatchlist = favIds.has(m.id); // ✅ update the flag
    });
  }
}
