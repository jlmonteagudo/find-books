import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../interfaces/books-http-response.interface';
import { AddCommasPipe } from '../../shared/pipes/add-commas.pipe';

@Component({
  selector: 'fb-book-authors',
  standalone: true,
  imports: [CommonModule, AddCommasPipe],
  template: `
    <h5 mat-subheader>Written By:</h5>
    <span>
      {{ authors | fbAddCommas }}
    </span>
  `,
  styles: [
    `
      h5 {
        margin-bottom: 5px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAuthorsComponent {
  @Input() book!: Book;

  get authors() {
    return this.book.volumeInfo.authors;
  }
}
