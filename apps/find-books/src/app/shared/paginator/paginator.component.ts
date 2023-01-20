import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PaginatorStore } from './paginator.store';

@Component({
  selector: 'fb-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  template: `
    <mat-paginator
      #paginator
      (page)="handlePageEvent($event)"
      [length]="length$ | async"
      [pageSize]="pageSize$ | async"
      [showFirstLastButtons]="true"
      [pageSizeOptions]="[5, 10, 25]"
      [hidePageSize]="false"
      [pageIndex]="pageIndex$ | async"
      aria-label="Select page"
    >
    </mat-paginator>
    <p>PAGINATOR LENGTH: {{ length$ | async }}</p>
    <p>PAGINATOR SIZE: {{ pageSize$ | async }}</p>
    <p>PAGINATOR INDEX: {{ pageIndex$ | async }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  private readonly paginatorStore = inject(PaginatorStore);

  length$: Observable<number> = this.paginatorStore.length$;
  pageSize$: Observable<number> = this.paginatorStore.pageSize$;
  pageIndex$: Observable<number> = this.paginatorStore.pageIndex$;

  handlePageEvent(e: PageEvent) {
    this.paginatorStore.updatePage(e);
  }
}
