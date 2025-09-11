import { Component, inject, Input } from '@angular/core';
import { MovieModel } from '../../models/movie-model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http-service';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-card-components',
  imports: [CommonModule, RouterLink],
  templateUrl: './card-components.html',
  styleUrl: './card-components.css',
})
export class CardComponents {
  @Input() movies: MovieModel[] = [];

  sessionId: string = localStorage.getItem('session_id') ?? '';
  AccountId: number = 0;

  constructor(private http: HttpService, readonly AccountService: AccountService) {
    this.AccountService.getAccountDetails().subscribe((user) => {
      this.AccountId = user.id;
      console.log(this.AccountId);
    })
  }

  toggleFavorite(movie: MovieModel, event: Event) {
    event.stopPropagation();
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: !movie.inFav,
    };
    console.log(this.AccountId);
    this.http
      .post(body, `account/${this.AccountId}/favorite?session_id=${this.sessionId}`)
      .subscribe({
        next: () => {
          movie.inFav = !movie.inFav;
        },
        error: (err) => console.error('Error adding to favorite:', err),
      });
  }

  toggleWatchlist(movie: MovieModel, event: Event) {
    event.stopPropagation();
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist: !movie.inWatchlist,
    };
    console.log(this.AccountId);
    this.http
      .post(body, `account/${this.AccountId}/watchlist?session_id=${this.sessionId}`)
      .subscribe({
        next: () => {
          movie.inWatchlist = !movie.inWatchlist;
        },
        error: (err) => console.error('Error adding to watchlist:', err),
      });
  }
}
