import { Component } from '@angular/core';
import { CardComponents } from '../card-components/card-components';
import { MovieDetailsComponent } from '../movie-details-component/movie-details-component';
import { HttpService } from '../../services/http-service';
import { MovieModel } from '../../models/movie-model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-details',
  imports: [CardComponents, MovieDetailsComponent],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  movies: MovieModel[] = [];
  movie: any;
  apiKey = 'b11725f9e5398c8211838ec6320bf330';
  genres: any[] = [];
  movieId: any;
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private LanguageService: LanguageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
      this.http
        .get(`movie/${this.movieId}?api_key=${this.apiKey}&language=${this.LanguageService.lang$}`)
        .subscribe((data) => {
          this.movie = data;
          console.log(this.movie);
        });
    });
    this.getRecommendtions();
  }

  /* getAllGenre()
  {
    this.http.get('genre/movie/list?api_key=a6493890665a35d49413ed72aa7c489c').subscribe({
      next: (genres) => {
        console.log(genres.genres);
        this.genres = genres.genres
      }
    })
  }
    */

  getRecommendtions() {
    this.http.get(`movie/${this.movieId}/recommendations?api_key=${this.apiKey}`).subscribe({
      next: (movies) => {
        console.log(movies.results);
        this.movies = movies.results;
      },
    });
  }
}
