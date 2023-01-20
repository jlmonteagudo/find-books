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
  ],
  template: `
    <fb-language-selector />
    <br />
    <fb-search />
    <br />
    <fb-paginator />
    <hr />
    <div>
      <mat-progress-bar
        mode="indeterminate"
        *ngIf="isLoading$ | async"
      ></mat-progress-bar>
      <p>IS LOADING: {{ isLoading$ | async }}</p>
      <p>BOOKS: {{ books$ | async | json }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit, OnDestroy {
  private readonly booksStore = inject(BooksStore);
  private readonly snackBar = inject(MatSnackBar);

  private destroy$ = new Subject<void>();

  books$: Observable<Book[]> = this.booksStore.books$;
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
