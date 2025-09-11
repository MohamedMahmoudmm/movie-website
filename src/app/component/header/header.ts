import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() favCount: number = 0;
  languages: string[] = ['en', 'ar', 'fr', 'zh'];
  currentLang: string = 'en';

  private langService = inject(LanguageService)

  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.langService.setLanguage(lang);
  }

}
