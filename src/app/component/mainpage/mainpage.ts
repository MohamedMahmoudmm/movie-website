import { Component, inject, Input, signal } from '@angular/core';
import { Search } from '../search/search';
import { CardComponents } from '../card-components/card-components';
import { MovieModel } from '../../models/movie-model';
import { HttpService } from '../../services/http-service';
import { Footer } from '../footer/footer';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { CommonServices } from '../../services/common-services';

@Component({
  selector: 'app-mainpage',
  imports: [ Search, CardComponents, Footer],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})
export class Mainpage {

  // Pagination state
  totalPages: number = 1;
  currentPage: number = 1;
  sessionId : string ='';
  constructor(private http : HttpService,private router:Router,public services:CommonServices){
  }
   ngOnInit() {
    this.sessionId =localStorage.getItem('session_id')??'';
    if(!this.sessionId)this.router.navigate(['/login']);

    this.getAllMovie();
  }

  getAllMovie(page: number = 1) {
    this.http.get('movie/popular', { page: page }).subscribe({
      next: (movies) => {
        console.log('fetched movies', movies.results);

        this.services.movies = movies.results;
        this.totalPages = Math.min(movies.total_pages, 500);
        this.currentPage = movies.page;
        this.services.updateFavOnMainPage();
        this.services.updateWatchOnMainPage();
      },
    });
  }
  onPageChange(page: number) {
    this.getAllMovie(page);
  }
}
