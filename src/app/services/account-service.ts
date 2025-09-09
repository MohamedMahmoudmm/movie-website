import { Injectable, inject } from '@angular/core';
import { HttpService } from './http-service';
import { UserModel } from '../models/user-model';
import { Observable } from 'rxjs';
import { Login } from '../component/login/login';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpService = inject(HttpService);
  readonly sessionId = localStorage.getItem('session_id');

  getAccountDetails(): Observable<UserModel> {
    return this.httpService.get('account', { session_id: this.sessionId });
  }

  getProfileImage(user: UserModel): string | null {
    if (user.avatar?.tmdb?.avatar_path) {
      return `https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`;
    } else if (user.avatar?.gravatar?.hash) {
      return `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}`;
    }
    return null;
  }
}
