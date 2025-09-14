import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language-service';
import { CommonServices } from '../../services/common-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() favCount: number = 0;
  languages: string[] = ['en', 'ar', 'fr', 'zh'];
  private langService = inject(LanguageService);
  public service = inject(CommonServices);

  currentLang: string = this.langService.currentLang;
  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.langService.setLanguage(lang);
  }

  t(key: string) {
    return this.langService.translate(key);
  }

  logout() {
    localStorage.removeItem('session_id');
  }
}
