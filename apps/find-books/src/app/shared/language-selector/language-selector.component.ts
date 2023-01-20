import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { LanguageSelectorStore } from './language-selector.store';
import { Language } from './interfaces/language.interface';

@Component({
  selector: 'fb-language-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule],
  template: `
    <mat-select
      [value]="currentLanguageCode$ | async"
      (selectionChange)="setCurrentLanguageCode($event.value)"
    >
      <mat-option *ngFor="let lang of languages$ | async" [value]="lang.code">
        {{ lang.displayName }}
      </mat-option>
    </mat-select>
  `,
  styles: [
    `
      mat-select {
        width: 120px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  private readonly languageSelectorStore = inject(LanguageSelectorStore);

  readonly languages$ = this.languageSelectorStore.languages$;

  readonly currentLanguageCode$ =
    this.languageSelectorStore.currentLanguageCode$;

  setCurrentLanguageCode(currentLanguageCode: Language['code']) {
    this.languageSelectorStore.updateCurrentLanguageCode(currentLanguageCode);
  }
}
