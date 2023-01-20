import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LanguageSelectorComponent } from '../../shared/language-selector/language-selector.component';

@Component({
  selector: 'fb-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LanguageSelectorComponent,
  ],
  template: ` <mat-toolbar color="primary">
    <span>Find Books</span>
    <span class="spacer"></span>
    <fb-language-selector />
  </mat-toolbar>`,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
