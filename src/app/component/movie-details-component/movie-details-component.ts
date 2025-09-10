import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details-component',
  templateUrl: './movie-details-component.html',
  styleUrl: './movie-details-component.css',
  imports: [CommonModule,],
  standalone: true
})
export class MovieDetailsComponent{
   movie: any;
  apiKey = 'a6493890665a35d49413ed72aa7c489c';

  constructor(private route: ActivatedRoute, private http: HttpService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = params['id'];
      this.http.get(`movie/${movieId}?api_key=${this.apiKey}`).subscribe(data => {
        this.movie = data;
      });
    });
  }
   getStars(vote: number): string[] {
    const stars: string[] = [];
    const rating = Math.round(vote / 2); // TMDB = 10 → 5 stars
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'bi-star-fill text-warning' : 'bi-star');
    }
    return stars;
  }
}