import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './account-details.html',
  styleUrl: './account-details.css',
})
export class AccountDetails {
  profileImage: string | null = null;

  // Example static profile info
  username = 'montaser';
  joinedYear = 2025;

  // Example static stats
  stats = [
    { label: 'Movies', count: 0 },
    { label: 'Shows', count: 0 },
    { label: 'Episodes', count: 0 },
  ];

  recent = [
    {
      id: 2,
      title: 'Dune: Part Two',
      rating: 8.3,
      poster: 'https://image.tmdb.org/t/p/w300/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    },
    {
      id: 3,
      title: 'Barbie',
      rating: 7.0,
      poster: 'https://image.tmdb.org/t/p/w300/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    },
    {
      id: 4,
      title: 'Across the Spider-Verse',
      rating: 8.7,
      poster: 'https://image.tmdb.org/t/p/w300/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    },
  ];
}
