import { Route } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookPageComponent } from './pages/book-page.component';
import { BooksListPageComponent } from './pages/books-list-page.component';

export const bookRoutes: Route[] = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: '',
        component: BooksListPageComponent,
      },
      {
        path: ':id',
        component: BookPageComponent,
      },
    ],
  },
];
