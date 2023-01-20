import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStore } from './search.store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fb-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <mat-form-field>
      <mat-label>Search</mat-label>
      <input
        matInput
        type="text"
        #searchInput
        (keyup)="handleSearchTermChanged(searchInput.value)"
      />
      <button
        *ngIf="searchInput.value"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="searchInput.value = ''; handleSearchTermChanged('')"
      >
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
    <p>SEARCH TERM: {{ searchTerm$ | async }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly searchStore = inject(SearchStore);

  searchTerm$ = this.searchStore.searchTerm$;

  handleSearchTermChanged(searchTerm: string) {
    this.searchStore.updateSearchTerm(searchTerm);
    console.log(searchTerm);
  }
}
