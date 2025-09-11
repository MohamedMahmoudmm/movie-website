import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language-service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ScrollToTop } from './component/scroll-to-top/scroll-to-top';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSkeletonLoaderModule,ScrollToTop],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  currentLang = 'en';
  constructor(private langService: LanguageService) {
    this.langService.lang$.subscribe((lang) => (this.currentLang = lang));
  }
}
