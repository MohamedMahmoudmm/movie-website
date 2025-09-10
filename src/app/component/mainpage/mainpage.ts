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
  favList:MovieModel[]=[]

  // Pagination state
  totalPages: number = 1;
  currentPage: number = 1;

  sessionId : string ='';
  constructor(private http : HttpService){  
  }

   ngOnInit() {
    this.sessionId = localStorage.getItem('session_id')??'';
   
    this.getAllMovie(); 
    this.getFav();
  }
 getFav(){
    this.http.get(`account/21908959/favorite/movies?session_id=${this.sessionId}`).subscribe({
      next: (movies) => {
        console.log(movies.results);
        this.favList = movies.results
        this.updateFavOnMainPage()
      }
    })
  }
  getAllMovie(page: number = 1) {
    this.http.get('movie/popular', {page:`${page}`}).subscribe({
      next: (movies) => {
        console.log(movies.results);
        
        this.movies = movies.results;
        this.totalPages = movies.total_pages;
        this.currentPage = movies.page;
        this.updateFavOnMainPage()
      }
    })
  }
  
  onPageChange(page: number) {
    this.getAllMovie(page);
  }
  
  updateFavOnMainPage(){
  const favIds = new Set(this.favList.map(f => f.id));
  this.movies.forEach(m => {
    m.inFav = favIds.has(m.id);  // update the flag
  });
  }
}
