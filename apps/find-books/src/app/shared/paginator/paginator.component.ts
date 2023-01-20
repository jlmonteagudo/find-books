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
