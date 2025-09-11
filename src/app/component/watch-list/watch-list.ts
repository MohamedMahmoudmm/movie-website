import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { MovieModel } from '../../models/movie-model';
import { HttpService } from '../../services/http-service';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-watch-list',
  imports: [Header, CommonModule],
  templateUrl: './watch-list.html',
  styleUrl: './watch-list.css',
})
export class WatchList {
  watchList: MovieModel[] = [];
  sessionId: string = '';
  AccountService = inject(AccountService);
  AccountId = this.AccountService.getAccountDetails().subscribe((user) => user.id);
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.sessionId = localStorage.getItem('session_id') ?? '';
    this.getwatchList();
  }
  getwatchList() {
    this.watchList = [];
    this.http
      .get(`account/${this.AccountId}/watchlist/movies`, { session_id: this.sessionId })
      .subscribe({
        next: (movies) => {
          console.log(movies.results);
          movies.results.forEach((element: MovieModel) => {
            element.inWatchlist = true;
          });
          this.watchList = movies.results;
        },
      });
  }

  toggleWatchlist(movie: MovieModel, event: Event) {
    event.stopPropagation();
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist: !movie.inWatchlist,
    };

    this.http.post(body, `account/${this.AccountId}/watchlist?session_id=${this.sessionId}`).subscribe({
      next: () => {
        movie.inWatchlist = !movie.inWatchlist;
        this.getwatchList();
      },
      error: (err) => console.error('Error adding to favorite:', err),
    });
    console.log(movie.inWatchlist);
  }
}
