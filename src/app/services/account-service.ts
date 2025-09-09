import { Injectable, inject } from '@angular/core';
import { HttpService } from './http-service';
import { UserModel } from '../models/user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpService = inject(HttpService);

  getAccountDetails(): Observable<UserModel> {
    return this.httpService.get('account');
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
