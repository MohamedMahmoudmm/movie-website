import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language-service';
import { ScrollToTop } from './component/scroll-to-top/scroll-to-top';
import { Header } from './component/header/header';
import { CommonServices } from './services/common-services';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScrollToTop,Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  currentLang = 'en';

  constructor(private langService: LanguageService,public services: CommonServices) {
    this.langService.lang$.subscribe((lang) => (this.currentLang = lang));
  }

 



 
}
