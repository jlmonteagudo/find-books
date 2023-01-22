import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';
import { LanguageSelectorComponent } from '../shared/language-selector/language-selector.component';
import { SearchComponent } from '../shared/search/search.component';
import { PaginatorComponent } from '../shared/paginator/paginator.component';
import { BooksStore } from './books.store';
import { Book } from './interfaces/books-http-response.interface';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SearchStore } from '../shared/search/search.store';
import { PaginatorStore } from '../shared/paginator/paginator.store';
import { BooksListComponent } from './components/books-list.component';

@Component({
  selector: 'fb-books',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    LanguageSelectorComponent,
    MatProgressBarModule,
    SearchComponent,
    PaginatorComponent,
    BooksListComponent,
  ],
  template: `
    <fb-search />
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
  providers: [BooksStore, SearchStore, PaginatorStore],
})
export class BooksComponent implements OnInit, OnDestroy {
  private readonly booksStore = inject(BooksStore);
  private readonly snackBar = inject(MatSnackBar);

  private destroy$ = new Subject<void>();

  books$: Observable<Book[]> = this.booksStore.books$;
  booksLoaded$: Observable<boolean> = this.booksStore.booksLoaded$;
  isLoading$: Observable<boolean> = this.booksStore.isLoading$;

  ngOnInit(): void {
    this.booksStore.findBooks(this.booksStore.findBooksCriteria$);
    this.booksStore.errorMessage$
      .pipe(
        takeUntil(this.destroy$),
        filter((errorMessage) => !!errorMessage),
        tap((errorMessage) => this.snackBar.open(errorMessage, 'CLOSE'))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
