import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { UserModel } from '../../models/user-model';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-account-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './account-details.html',
  styleUrl: './account-details.css',
})
export class AccountDetails implements OnInit {
  private accountService = inject(AccountService);
  private langService = inject(LanguageService);

  user: UserModel | null = null;
  profileImage: string | null = null;
  joinedYear = 2025;
  // Example static stats
  stats = [
  { key: 'movies', count: 20 },
  { key: 'shows', count: 35 },
  { key: 'episodes', count: 480 },
];
  ngOnInit(): void {
    this.loadAccountDetails();
  }
  t(key: string): string {
    return this.langService.translate(key);
  }
  private loadAccountDetails() {
    this.accountService.getAccountDetails().subscribe({
      next: (res) => {
        this.user = res;
        this.profileImage = this.accountService.getProfileImage(res);
        console.log('Profile image:', this.profileImage);
      },
      error: (err) => {
        console.error('Failed to load account details:', err);
      },
    });
  }


  @ViewChild('scrollContainer', { static: true })
  scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -250, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 250, behavior: 'smooth' });
  }

  recent = [
    {
      id: 2,
      title: 'Dune: Part Two',
      rating: 8.3,
      poster: 'https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
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
    {
      id: 5,
      title: 'Oppenheimer',
      rating: 8.6,
      poster: 'which-oppenheimer-poster-is-the-best-v0-27dtc0b78i5b1.jpg',
    },
    {
      id: 6,
      title: 'John Wick: Chapter 4',
      rating: 7.9,
      poster: 'https://image.tmdb.org/t/p/w300/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    },
    {
      id: 7,
      title: 'Guardians of the Galaxy Vol. 3',
      rating: 8.1,
      poster: 'https://image.tmdb.org/t/p/w300/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    },
    {
      id: 8,
      title: 'The Batman',
      rating: 7.8,
      poster: 'https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    },
    {
      id: 9,
      title: 'Avatar: The Way of Water',
      rating: 7.7,
      poster: 'https://image.tmdb.org/t/p/w300/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    },
    {
      id: 10,
      title: 'The Super Mario Bros. Movie',
      rating: 7.2,
      poster: 'https://image.tmdb.org/t/p/w300/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
    },
    {
      id: 11,
      title: 'Fast X',
      rating: 7.1,
      poster: 'https://image.tmdb.org/t/p/w300/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
    {
      id: 12,
      title: 'Shazam! Fury of the Gods',
      rating: 6.6,
      poster: 'https://image.tmdb.org/t/p/w300/3GrRgt6CiLIUXUtoktcv1g2iwT5.jpg',
    },
    {
      id: 13,
      title: 'Ant-Man and the Wasp: Quantumania',
      rating: 6.2,
      poster: 'https://image.tmdb.org/t/p/w300/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
    },
    {
      id: 14,
      title: 'Creed III',
      rating: 7.3,
      poster: 'https://image.tmdb.org/t/p/w300/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg',
    },
    {
      id: 15,
      title: 'Black Panther: Wakanda Forever',
      rating: 7.2,
      poster: 'https://image.tmdb.org/t/p/w300/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
    },
    {
      id: 16,
      title: 'Doctor Strange in the Multiverse of Madness',
      rating: 7.0,
      poster: 'https://image.tmdb.org/t/p/w300/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg',
    },
    {
      id: 17,
      title: 'Thor: Love and Thunder',
      rating: 6.3,
      poster: 'https://image.tmdb.org/t/p/w300/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
    },
    {
      id: 18,
      title: 'Spider-Man: No Way Home',
      rating: 8.3,
      poster: 'https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    },
    {
      id: 19,
      title: 'The Flash',
      rating: 6.9,
      poster: 'https://image.tmdb.org/t/p/w300/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    },
    {
      id: 20,
      title: 'The Little Mermaid',
      rating: 6.5,
      poster: 'https://image.tmdb.org/t/p/w300/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg',
    },
    {
      id: 21,
      title: 'Elemental',
      rating: 7.7,
      poster: 'https://image.tmdb.org/t/p/w300/8riWcADI1ekEiBguVB9vkilhiQm.jpg',
    },
  ];
}
