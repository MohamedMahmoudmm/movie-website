import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  maxVisiblePages = 5;

  get pages(): (number | string)[] {
    let pages: (number | string)[] = [];
    let half = Math.floor(this.maxVisiblePages / 2);
    let startPage = Math.max(1, this.currentPage - half);
    let endPage = Math.min(this.totalPages, this.currentPage + half);

    if (this.currentPage <= half) {
      endPage = Math.min(this.totalPages, this.maxVisiblePages);
    } else if (this.currentPage + half > this.totalPages) {
      startPage = Math.max(1, this.totalPages - this.maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) pages.push('...');
      pages.push(this.totalPages);
    }

    return pages;
  }

  changePage(page: number | string) {
    if (
      typeof page == 'number' &&
      page >= 1 &&
      page <= this.totalPages &&
      page !== this.currentPage
    ) {
      this.pageChange.emit(page);
    }
  }
}
