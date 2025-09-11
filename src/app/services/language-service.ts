import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public langSubject = new BehaviorSubject<string>('en');
  lang$ = this.langSubject.asObservable();

  setLanguage(lang: string) {
    this.langSubject.next(lang);
    localStorage.setItem('lang', `${lang}`);
  }
}
