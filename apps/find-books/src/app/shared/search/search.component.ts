import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
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
        [value]="searchTerm"
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
  `,
  styles: [
    `
      mat-form-field {
        min-width: 500px;
        margin-right: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly searchStore = inject(SearchStore);

  @Input() searchTerm!: string | null;

  searchTerm$ = this.searchStore.searchTerm$;

  handleSearchTermChanged(searchTerm: string) {
    this.searchStore.updateSearchTerm(searchTerm);
  }
}
