import { CommonModule } from '@angular/common';
import { Component, DOCUMENT, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.html',
  styleUrls: ['./scroll-to-top.css']
})
export class ScrollToTop implements OnInit {
  windowScrolled = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset =
      window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;

    if (yOffset > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && yOffset < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {}
}
