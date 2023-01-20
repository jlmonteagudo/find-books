import { Route } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { LanguageSelectorStore } from '../shared/language-selector/language-selector.store';
import { PaginatorStore } from '../shared/paginator/paginator.store';
import { SearchStore } from '../shared/search/search.store';
import { BooksComponent } from './books.component';

export const bookRoutes: Route[] = [
  {
    path: '',
    component: BooksComponent,
    providers: [
      provideComponentStore(LanguageSelectorStore),
      provideComponentStore(SearchStore),
      provideComponentStore(PaginatorStore),
    ],
  },
];
