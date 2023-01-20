import { Route } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { PaginatorStore } from '../shared/paginator/paginator.store';
import { SearchStore } from '../shared/search/search.store';
import { BooksComponent } from './books.component';
import { BooksStore } from './books.store';

export const bookRoutes: Route[] = [
  {
    path: '',
    component: BooksComponent,
    providers: [
      provideComponentStore(SearchStore),
      provideComponentStore(PaginatorStore),
      provideComponentStore(BooksStore),
    ],
  },
];
