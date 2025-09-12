// searchpage.ts
import { Component, inject, OnInit } from '@angular/core';
import { Search } from '../search/search';
import { CardComponents } from '../card-components/card-components';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { HttpService } from '../../services/http-service';
import { CommonServices } from '../../services/common-services';

@Component({
  selector: 'app-searchpage',
  imports: [Search, CardComponents, FormsModule, CommonModule, Footer],
  templateUrl: './searchpage.html',
  styleUrl: './searchpage.css',
})
export class Searchpage implements OnInit {
  private httpService = inject(HttpService);
public services = inject(CommonServices);
  query: string = '';
  genres: any[] = [];
  selectedGenre: number | null = null;
  sortBy: string = 'popularity.desc';

  // Pagination state
  totalPages: number = 1;
  currentPage: number = 1;

  ngOnInit() {
    this.getGenres();
    this.loadMovies();
  }

  getGenres() {
    this.httpService.get('genre/movie/list').subscribe({
      next: (res) => (this.genres = res.genres),
      error: (err) => console.error('Error fetching genres:', err),
    });
  }

  loadMovies(page: number = 1) {
    const endpoint = 'discover/movie';
    const params: Record<string, any> = {};
    params['sort_by'] = this.sortBy;
    params['page'] = page;

    if (this.selectedGenre) {
      params['with_genres'] = this.selectedGenre;
    }

    this.httpService.get(endpoint, params).subscribe({
      next: (res) => {
        this.services.movies = res.results;
        this.totalPages = res.total_pages
        this.currentPage = res.page;
        this.services.updateFavOnMainPage();
        this.services.updateWatchOnMainPage();
      },
      error: (err) => console.error('Error loading movies:', err),
    });
  }

  SearchMovies(page: number = 1) {
    if (!this.query.trim()) {
      this.loadMovies(page);
      return;
    }

    this.httpService.get('search/movie', { query: this.query }).subscribe({
      next: (res) => {
        this.services.movies = res.results;
        this.totalPages = Math.min(res.total_pages,500)
        this.currentPage = res.page;
        this.services.updateFavOnMainPage();
        this.services.updateWatchOnMainPage();
      },
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

  onPageChange(newPage: number) {
    if (!this.query.trim()) {
      this.loadMovies(newPage);
    } else {
      this.SearchMovies(newPage);
    }
  }
}
