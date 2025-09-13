import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language-service';
import { ScrollToTop } from './component/scroll-to-top/scroll-to-top';
import { Header } from './component/header/header';
import { CommonServices } from './services/common-services';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScrollToTop, Header, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private langService = inject(LanguageService);
  lang$ = this.langService.lang$;

  constructor(public services: CommonServices) {}
}
