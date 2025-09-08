import { Component, Input } from '@angular/core';
import { MovieModel } from '../../models/movie-model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http-service';

@Component({
  selector: 'app-card-components',
  imports: [CommonModule, RouterLink],
  templateUrl: './card-components.html',
  styleUrl: './card-components.css'
})
export class CardComponents {
  @Input() movies: MovieModel[] = [];

  sessionId: string = '257779405c116d07a85e34239541134469da2573';

  constructor(private http: HttpService) {}

  toggleFavorite(movie: MovieModel, event: Event) {
  event.stopPropagation(); 
  const body = {
    media_type: 'movie',
    media_id: movie.id,
    favorite: !movie.inFav
  }

  this.http.post(body, `account/21908959/favorite?session_id=${this.sessionId}`)
    .subscribe({
      next: () => {
        movie.inFav = !movie.inFav;
      },
      error: (err) => console.error('Error adding to favorite:', err)
    });
}

toggleWatchlist(movie: MovieModel, event: Event) {
  event.stopPropagation();
  const body = {
    media_type: 'movie',
    media_id: movie.id,
    watchlist: !movie.inWatchlist
  };

  this.http.post(body, `account/21908959/watchlist?session_id=${this.sessionId}`)
    .subscribe({
      next: () => {
        movie.inWatchlist = !movie.inWatchlist;
      },
      error: (err) => console.error('Error adding to watchlist:', err)
    });
}

}
