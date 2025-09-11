import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { HttpService } from '../../services/http-service';
import { MovieModel } from '../../models/movie-model';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-wishlist',
  imports: [Header],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  favList: MovieModel[] = [];
  sessionId: string = '';
  constructor(private http: HttpService) {}
  AccountService = inject(AccountService);
  AccountId = this.AccountService.getAccountDetails().subscribe((user) => user.id);
  ngOnInit() {
    this.sessionId = localStorage.getItem('session_id') ?? '';
    this.getFav();
  }
  getFav() {
    this.favList = [];
    this.http
      .get(`account/${this.AccountId}/favorite/movies`, { session_id: this.sessionId })
      .subscribe({
        next: (movies) => {
          console.log(movies.results);
          movies.results.forEach((element: MovieModel) => {
            element.inFav = true;
          });
          this.favList = movies.results;
        },
      });
  }

  toggleFavorite(movie: MovieModel, event: Event) {
    event.stopPropagation();
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: !movie.inFav,
    };

    this.http.post(body, `account/${this.AccountId}/favorite?session_id=${this.sessionId}`).subscribe({
      next: () => {
        movie.inFav = !movie.inFav;
        this.getFav();
      },
      error: (err) => console.error('Error adding to favorite:', err),
    });
    console.log(movie.inFav);
  }
}
