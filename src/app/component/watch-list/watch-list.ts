import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from '../../models/movie-model';
import { WatchlistService } from '../../services/watchlist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [AsyncPipe , NgClass,],
  templateUrl: './watch-list.html',
  styleUrls: ['./watch-list.css']
})
export class WatchlistComponent {
  watchlist$: Observable<MovieModel[]>;
  favCount$: Observable<number>;

  constructor(
    public watchlistService: WatchlistService,
    private snackBar: MatSnackBar
  ) {
    this.watchlist$ = this.watchlistService.watchlist$;
    this.favCount$ = this.watchlistService.count$;
  }

  trackById(index: number, movie: MovieModel): number {
    return movie.id;
  }

  toggleWatchlist(movie: MovieModel): void {
    const added = this.watchlistService.toggle(movie);
    this.snackBar.open(
      added ? 'Added to Watchlist' : 'Removed from Watchlist',
      'Close',
      { duration: 2000 }
    );
  }

  isInWatchlist(movieId: number): boolean {
    return this.watchlistService.isInWatchlist(movieId);
  }
}
