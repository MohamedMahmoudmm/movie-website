import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie-model';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export class CommonServices {
  
movies: MovieModel[] = [];
  favList:MovieModel[]=[];
  watchList:MovieModel[]=[];
  

  sessionId : string ='';
  constructor(private http:HttpService){
    this.sessionId = localStorage.getItem('session_id')??'';

  }

 getFav(){
    this.http.get(`account/21908959/favorite/movies?session_id=${this.sessionId}`).subscribe({
      next: (movies) => {
        console.log(movies.results);
        this.favList = movies.results
        this.updateFavOnMainPage()
      }
    })
    return this.favList
  }
 getWatchList(){
    this.http.get(`account/21908959/watchlist/movies?session_id=${this.sessionId}`).subscribe({
      next: (movies) => {
        console.log(movies.results);
        this.watchList = movies.results
        this.updateWatchOnMainPage()
      }
    })
    return this.watchList
  }
  getAllMovie()
  {
    this.http.get('movie/now_playing').subscribe({
      next: (movies) => {
        console.log(movies.results);
        
        this.movies = movies.results;
        this.updateFavOnMainPage()
        this.updateWatchOnMainPage()
        
      }
    })
    return this.movies
  }

  updateFavOnMainPage(){
    

  const favIds = new Set(this.favList.map(f => f.id));
  this.movies.forEach(m => {
    m.inFav = favIds.has(m.id);  // ✅ update the flag
  });
  }

  updateWatchOnMainPage(){
    

  const favIds = new Set(this.watchList.map(f => f.id));
  this.movies.forEach(m => {
    m.inWatchlist = favIds.has(m.id);  // ✅ update the flag
  });
  }

}
