import { Component, inject, Input } from '@angular/core';
import { MovieModel } from '../../models/movie-model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http-service';
import { AccountService } from '../../services/account-service';
import { CommonServices } from '../../services/common-services';

@Component({
  selector: 'app-card-components',
  imports: [CommonModule, RouterLink],
  templateUrl: './card-components.html',
  styleUrl: './card-components.css',
})
export class CardComponents {
  @Input() movies: MovieModel[] = [];

  
  constructor(public services: CommonServices) {
 
  }

 
}
