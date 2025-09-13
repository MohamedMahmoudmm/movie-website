import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import translationsEn from '../../assets/i18n/en.json';
import translationsAr from '../../assets/i18n/ar.json';
import translationsFr from '../../assets/i18n/fr.json';
import translationsZh from '../../assets/i18n/zh.json';
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public langSubject = new BehaviorSubject<string>(localStorage.getItem('lang') ?? 'en');
  public lang$ = this.langSubject.asObservable();
  private translations: Record<string, Record<string, string>> = {
    en: translationsEn,
    ar: translationsAr,
    fr: translationsFr,
    zh: translationsZh,
  };

  setLanguage(lang: string) {
    this.langSubject.next(lang);
    localStorage.setItem('lang', `${lang}`);
  }

  public get currentLang(): string {
    return this.langSubject.getValue();
  }

  translate(key: string): string {
    const lang = this.currentLang;
    return this.translations[lang]?.[key] ?? key;
  }
}
