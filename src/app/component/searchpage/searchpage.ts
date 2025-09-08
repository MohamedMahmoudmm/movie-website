import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Search } from '../search/search';
import { CardComponents } from '../card-components/card-components';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchpage',
  imports: [Header, Search, CardComponents,FormsModule,CommonModule],
  templateUrl: './searchpage.html',
  styleUrl: './searchpage.css'
})
export class Searchpage {
  query: string = '';
  results: any[] = [];

  constructor(private http: HttpClient) {}

  SearchMovies() {
    if (!this.query.trim()) return;

    this.http.get<any>(`https://api.themoviedb.org/3/search/movie?api_key=a6493890665a35d49413ed72aa7c489c&query=${this.query}`)
      .subscribe({
        next: (res) => {
          console.log('API Response:', res);
          this.results = res.results; 
        },
        error: (err) => console.error('Search error:', err)
      });
  } 
}
