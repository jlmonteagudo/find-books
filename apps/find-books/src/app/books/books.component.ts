import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from './services/books.service';
import { LanguageSelectorComponent } from '../shared/language-selector/language-selector.component';
import { SearchComponent } from '../shared/search/search.component';
import { PaginatorComponent } from '../shared/paginator/paginator.component';

@Component({
  selector: 'fb-books',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSelectorComponent,
    SearchComponent,
    PaginatorComponent,
  ],
  template: `
    <fb-language-selector />
    <br />
    <fb-search />
    <br />
    <fb-paginator />
  `,
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
