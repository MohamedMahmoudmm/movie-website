import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel } from '../models/movie-model';

const STORAGE_KEY = 'app_watchlist_v1';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private _watchlist$ = new BehaviorSubject<MovieModel[]>(this.loadFromStorage());
  readonly watchlist$ = this._watchlist$.asObservable();
  readonly count$ = this.watchlist$.pipe(map(list => list.length));

  private loadFromStorage(): MovieModel[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(list: MovieModel[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }

  getCurrent(): MovieModel[] {
    return this._watchlist$.value;
  }

  isInWatchlist(movieId: number): boolean {
    return this.getCurrent().some(m => m.id === movieId);
  }

  add(movie: MovieModel) {
    if (!this.isInWatchlist(movie.id)) {
      const next = [...this.getCurrent(), movie];
      this._watchlist$.next(next);
      this.saveToStorage(next);
    }
  }

  remove(movieId: number) {
    const next = this.getCurrent().filter(m => m.id !== movieId);
    this._watchlist$.next(next);
    this.saveToStorage(next);
  }

  toggle(movie: MovieModel): boolean {
    if (this.isInWatchlist(movie.id)) {
      this.remove(movie.id);
      return false;
    } else {
      this.add(movie);
      return true;
    }
  }
}
