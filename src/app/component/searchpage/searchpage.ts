// searchpage.ts
import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Search } from '../search/search';
import { CardComponents } from '../card-components/card-components';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-searchpage',
  imports: [Header, Search, CardComponents, FormsModule, CommonModule, Footer],
  templateUrl: './searchpage.html',
  styleUrl: './searchpage.css',
})
export class Searchpage implements OnInit {
  query: string = '';
  results: any[] = [];
  genres: any[] = [];
  selectedGenre: number | null = null;
  sortBy: string = 'popularity.desc';

  private apiKey = 'a6493890665a35d49413ed72aa7c489c';

  // Pagination state
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getGenres();
    this.loadMovies();
  }

  getGenres() {
    this.http
      .get<any>(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`
      )
      .subscribe({
        next: (res) => (this.genres = res.genres),
        error: (err) => console.error('Error fetching genres:', err),
      });
  }

  loadMovies() {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=${this.sortBy}`;
    if (this.selectedGenre) {
      url += `&with_genres=${this.selectedGenre}`;
    }

    this.http.get<any>(url).subscribe({
      next: (res) => (this.results = res.results),
      error: (err) => console.error('Error loading movies:', err),
    });
  }

  SearchMovies() {
    if (!this.query.trim()) {
      this.loadMovies();
      return;
    }

    this.http
      .get<any>(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.query}`
      )
      .subscribe({
        next: (res) => (this.results = res.results),
        error: (err) => console.error('Search error:', err),
      });
  }

  onFilterChange() {
    if (!this.query.trim()) {
      this.loadMovies();
    } else {
      this.SearchMovies();
    }
  }
}
