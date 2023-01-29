import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksStore } from './books.store';
import { SearchStore } from '../shared/search/search.store';
import { PaginatorStore } from '../shared/paginator/paginator.store';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'fb-books',
  standalone: true,
  imports: [RouterModule, MatSnackBarModule],
  template: ` <router-outlet></router-outlet> `,
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

  ngOnInit() {
    this.booksStore.loadBooks(this.booksStore.findBooksCriteria$);
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
