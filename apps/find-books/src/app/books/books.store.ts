import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { LanguageSelectorStore } from '../shared/language-selector/language-selector.store';
import { PaginatorStore } from '../shared/paginator/paginator.store';
import { SearchStore } from '../shared/search/search.store';
import { Book } from './interfaces/books-http-response.interface';
import { FindBooksCriteria } from './interfaces/find-books-criteria.interface';
import { BooksService } from './services/books.service';

export interface BooksState {
  isLoading: boolean;
  books: Book[];
  errorMessage: string;
}

const INITIAL_STATE: BooksState = {
  isLoading: false,
  books: [],
  errorMessage: '',
};

@Injectable()
export class BooksStore extends ComponentStore<BooksState> {
  constructor(
    private booksService: BooksService,
    private searchStore: SearchStore,
    private paginatorStore: PaginatorStore,
    private languageSelectorStore: LanguageSelectorStore
  ) {
    super(INITIAL_STATE);
  }

  readonly books$: Observable<Book[]> = this.select((state) => state.books);
  readonly isLoading$: Observable<boolean> = this.select(
    (state) => state.isLoading
  );
  readonly errorMessage$: Observable<string> = this.select(
    (state) => state.errorMessage
  );
  readonly findBooksCriteria$: Observable<FindBooksCriteria> = this.select(
    this.searchStore.searchTerm$.pipe(debounceTime(500)),
    this.paginatorStore.pageSize$,
    this.paginatorStore.pageIndex$,
    this.languageSelectorStore.currentLanguageCode$,
    (searchTerm, pageSize, pageIndex, currentLanguageCode) => ({
      searchTerm,
      pageSize,
      pageIndex,
      currentLanguageCode,
    })
  );

  readonly findBooks = this.effect((criteria$: Observable<FindBooksCriteria>) =>
    criteria$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((criteria) =>
        this.booksService.find(criteria).pipe(
          tapResponse(
            (response) => {
              this.patchState({
                books: response.items,
                isLoading: false,
                errorMessage: '',
              });

              this.paginatorStore.updateLength(response.totalItems);
            },
            (error: HttpErrorResponse) => {
              this.patchState({
                books: [],
                isLoading: false,
                errorMessage: error.message,
              });
            }
          )
        )
      )
    )
  );
}
