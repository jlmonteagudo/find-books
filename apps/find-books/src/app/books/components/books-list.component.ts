import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../interfaces/books-http-response.interface';
import { BookItemComponent } from './book-item.component';

@Component({
  selector: 'fb-books-list',
  standalone: true,
  imports: [CommonModule, BookItemComponent],
  template: `
    <fb-book-item *ngFor="let book of books" [book]="book"></fb-book-item>
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
})
export class BooksListComponent {
  @Input() books!: Book[] | null;
}
