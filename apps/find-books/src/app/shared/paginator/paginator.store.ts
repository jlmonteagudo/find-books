import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface PaginatorState {
  length: number;
  pageSize: number;
  pageIndex: number;
}

const INITIAL_STATE: PaginatorState = {
  length: 0,
  pageSize: 10,
  pageIndex: 0,
};

@Injectable()
export class PaginatorStore extends ComponentStore<PaginatorState> {
  constructor() {
    super(INITIAL_STATE);
  }

  readonly length$: Observable<number> = this.select((state) => state.length);
  readonly pageSize$: Observable<number> = this.select(
    (state) => state.pageSize
  );
  readonly pageIndex$: Observable<number> = this.select(
    (state) => state.pageIndex
  );

  readonly updatePage = (pageEvent: PageEvent) =>
    this.patchState({
      pageSize: pageEvent.pageSize,
      pageIndex: pageEvent.pageIndex,
    });

  readonly updateLength = (length: number) => {
    this.setState((state) => {
      const pageIndex =
        state.pageIndex * state.pageSize > length ? 0 : state.pageIndex;
      return {
        ...state,
        length,
        pageIndex,
      };
    });
  };
}
