import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MovieModel } from '../../models/movie-model';
import { HttpService } from '../../services/http-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watch-list',
  imports: [Header,CommonModule],
  templateUrl: './watch-list.html',
  styleUrl: './watch-list.css'
})
export class WatchList {
watchList:MovieModel[]=[]
  sessionId:string=''
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.sessionId = localStorage.getItem('session_id')??'';
    this.getwatchList()
  }
  getwatchList(){
    this.watchList=[]
    this.http.get(`account/21908959/watchlist/movies?session_id=${this.sessionId}`).subscribe({
      next: (movies) => {
        console.log(movies.results);
        movies.results.forEach((element: MovieModel) => {
          element.inWatchlist = true
        });
        this.watchList = movies.results
      }
    })
  }

  toggleWatchlist(movie: MovieModel, event: Event) {
  event.stopPropagation(); 
  const body = {
    media_type: 'movie',
    media_id: movie.id,
    watchlist: !movie.inWatchlist
  }

  this.http.post(body, `account/21908959/favorite?session_id=${this.sessionId}`)
    .subscribe({
      next: () => {
        movie.inWatchlist = !movie.inWatchlist;
        this.getwatchList()
      },
      error: (err) => console.error('Error adding to favorite:', err)
    });
    console.log(movie.inWatchlist);
    
}
}
