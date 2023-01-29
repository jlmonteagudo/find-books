import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LanguageSelectorComponent } from '../../shared/language-selector/language-selector.component';
import { SearchComponent } from '../../shared/search/search.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { BooksStore } from '../books.store';
import { Book } from '../interfaces/books-http-response.interface';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BooksListComponent } from '../components/books-list.component';
import { SearchStore } from '../../shared/search/search.store';

@Component({
  selector: 'fb-books-list-page',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSelectorComponent,
    MatProgressBarModule,
    SearchComponent,
    PaginatorComponent,
    BooksListComponent,
  ],
  template: `
    <fb-search [searchTerm]="searchTerm$ | async" />
    <fb-paginator *ngIf="booksLoaded$ | async" />
    <mat-progress-bar
      mode="indeterminate"
      *ngIf="isLoading$ | async"
    ></mat-progress-bar>
    <fb-books-list [books]="books$ | async" />
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListPageComponent implements OnInit {
  private readonly booksStore = inject(BooksStore);
  private readonly searchStore = inject(SearchStore);

  books$: Observable<Book[]> = this.booksStore.books$;
  booksLoaded$: Observable<boolean> = this.booksStore.booksLoaded$;
  isLoading$: Observable<boolean> = this.booksStore.isLoading$;
  searchTerm$: Observable<string> = this.searchStore.searchTerm$;

  ngOnInit(): void {
    this.booksStore.updateSeletedBook(undefined);
  }
}
