import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface SearchState {
  searchTerm: string;
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  constructor() {
    super({ searchTerm: '' });
  }

  readonly searchTerm$: Observable<string> = this.select(
    (state) => state.searchTerm
  );

  readonly updateSearchTerm = (searchTerm: string) =>
    this.patchState({ searchTerm });
}
