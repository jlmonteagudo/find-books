import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Observable, map } from 'rxjs';
import { BooksStore } from '../books.store';
import { Book } from '../interfaces/books-http-response.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookDetailComponent } from '../components/book-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fb-book-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    BookDetailComponent,
  ],
  template: `
    <button mat-raised-button color="primary" (click)="location.back()">
      <mat-icon>keyboard_backspace</mat-icon>
      BACK
    </button>
    <fb-book-detail [book]="selectedBook$ | async"></fb-book-detail>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly booksStore = inject(BooksStore);
  public readonly location = inject(Location);

  selectedBook$: Observable<Book | undefined | null> =
    this.booksStore.selectedBook$;

  ngOnInit(): void {
    this.booksStore.loadSelectedBook(
      this.route.params.pipe(map((params) => params['id']))
    );
  }
}
