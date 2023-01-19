import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from './services/books.service';

@Component({
  selector: 'fb-books',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>books works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {
  private readonly booksService = inject(BooksService);

  constructor() {
    this.booksService
      .find({
        currentLanguageCode: 'en',
        pageIndex: 0,
        pageSize: 10,
        searchTerm: 'Angular',
      })
      .subscribe(console.log);
  }
}
