import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { CardComponents } from '../card-components/card-components';
import { MovieDetailsComponent } from '../movie-details-component/movie-details-component';
import { HttpService } from '../../services/http-service';
import { MovieModel } from '../../models/movie-model';
import { ActivatedRoute, RouterLink } from '@angular/router';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [Header, CardComponents, MovieDetailsComponent, RouterLink],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})

export class Details implements OnInit {
  movies: MovieModel[] = [];
  movie: MovieModel | null = null;
  apiKey = 'a6493890665a35d49413ed72aa7c489c';
  genres: any[] = [];
  movieId: string = '';

  constructor(private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.http.get(`movie/${this.movieId}?api_key=${this.apiKey}`).subscribe(data => {
        this.movie = data;
      });
      this.getRecommendtions();
    });
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
      next: (movies: any) => {
        console.log(movies.results);
        this.movies = movies.results;
      }
    });
  }
}