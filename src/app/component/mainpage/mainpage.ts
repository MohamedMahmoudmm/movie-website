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
  favList:MovieModel[]=[]
  

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
  getAllMovie() 
  {
    this.http.get('movie/now_playing').subscribe({
      next: (movies) => {
        console.log(movies.results);
        
        this.movies = movies.results;
        this.updateFavOnMainPage()
      }
    })
  }

  updateFavOnMainPage(){
    

  const favIds = new Set(this.favList.map(f => f.id));
  this.movies.forEach(m => {
    m.inFav = favIds.has(m.id);  // ✅ update the flag
  });
  }
}
