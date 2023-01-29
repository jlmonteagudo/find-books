import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Book } from '../interfaces/books-http-response.interface';
import { BookAuthorsComponent } from './book-authors.component';
import { EllipsisPipe } from '../../shared/pipes/ellipsis.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fb-book-list-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    BookAuthorsComponent,
    EllipsisPipe,
  ],
  template: `
    <a [routerLink]="[id]">
      <mat-card>
        <mat-card-title-group>
          <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail" />
          <mat-card-title>{{ title | fbEllipsis : 35 }}</mat-card-title>
          <mat-card-subtitle *ngIf="subtitle">{{
            subtitle | fbEllipsis : 40
          }}</mat-card-subtitle>
        </mat-card-title-group>
        <mat-card-content>
          <p *ngIf="description">{{ description | fbEllipsis }}</p>
        </mat-card-content>
        <mat-card-footer>
          <fb-book-authors [book]="book" />
        </mat-card-footer>
      </mat-card>
    </a>
  `,
  styles: [
    `
      :host {
        display: flex;
      }

      :host a {
        display: flex;
      }

      mat-card {
        width: 400px;
        margin: 15px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        padding: 20px;
      }

      @media only screen and (max-width: 768px) {
        mat-card {
          margin: 15px 0 !important;
        }
      }
      mat-card:hover {
        box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, 0.5);
      }
      mat-card-title {
        margin-right: 10px;
      }
      mat-card-title-group {
        margin: 0;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      img {
        width: 60px;
        min-width: 60px;
        margin-left: 5px;
      }
      mat-card-content {
        margin-top: 15px;
        margin: 15px 0 0;
      }
      span {
        display: inline-block;
        font-size: 13px;
      }
      mat-card-footer {
        padding: 0 25px 25px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListItemComponent {
  @Input() book!: Book;

  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }

  get thumbnail(): string | boolean {
    if (this.book.volumeInfo.imageLinks) {
      return this.book.volumeInfo.imageLinks.smallThumbnail.replace(
        'http:',
        ''
      );
    }

    return false;
  }
}
