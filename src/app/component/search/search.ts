import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  private langService = inject(LanguageService);

  t(key: string): string {
    return this.langService.translate(key);
  }
}
