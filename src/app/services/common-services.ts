import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie-model';
import { HttpService } from './http-service';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root',
})
export class CommonServices {
  movies: MovieModel[] = [];
  favList: MovieModel[] = [];
  watchList: MovieModel[] = [];

  sessionId: string = '';
  AccountId: number = 0;
  constructor(private http: HttpService,private accountService: AccountService) {
    this.sessionId = localStorage.getItem('session_id') ?? '';
    this.accountService.getAccountDetails().subscribe((user) => {
      this.AccountId = user.id;
      this.getFav();
      this.getWatchList();
    });
  }

  getFav() {
    this.http.get(`account/${this.AccountId}/favorite/movies`,{session_id:this.sessionId}).subscribe({
      next: (movies) => {
        this.favList = movies.results;
        this.updateFavOnMainPage();

      },
    });
  }
   toggleFavorite(movie: MovieModel, event: Event) {

    event.stopPropagation();
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: movie.inFav==undefined?false:!movie.inFav
    };
    this.http.post(body, `account/${this.AccountId}/favorite?session_id=${this.sessionId}`).subscribe({
      next: () => {
        movie.inFav = !movie.inFav;
        this.getFav();
      },
      error: (err) => console.error('Error adding to favorite:', err),
    });
  }
  getWatchList() {
    this.http.get(`account/${this.AccountId}/watchlist/movies`,{session_id:this.sessionId}).subscribe({
      next: (movies) => {
        this.watchList = movies.results;
        this.updateWatchOnMainPage();
      },
    });
  }
toggleWatchlist(movie: MovieModel, event: Event){
    event.stopPropagation();
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist:movie.inWatchlist==undefined?false:!movie.inWatchlist
    };

    this.http.post(body, `account/${this.AccountId}/watchlist?session_id=${this.sessionId}`).subscribe({
      next: () => {
        movie.inWatchlist = !movie.inWatchlist;
        this.getWatchList();
      },
      error: (err) => console.error('Error adding to favorite:', err),
    });
  }
  updateFavOnMainPage() {
    const favIds = new Set(this.favList.map((f) => f.id));
    this.movies.forEach((m) => {
      m.inFav = favIds.has(m.id); // ✅ update the flag
    });
  }

  updateWatchOnMainPage() {
    const favIds = new Set(this.watchList.map((f) => f.id));
    this.movies.forEach((m) => {
      m.inWatchlist = favIds.has(m.id); // ✅ update the flag
    });
  }
}
