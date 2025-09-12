import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language-service';
import { WatchlistService } from '../../services/watchlist';
// import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink , ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public watchlistService: WatchlistService) {}
  @Input() favCount: number = 0;
  languages: string[] = ['en', 'ar', 'fr', 'zh'];
  currentLang: string = localStorage.getItem('lang') ?? 'en';

  private langService = inject(LanguageService)

  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.langService.setLanguage(lang);
  }

}

