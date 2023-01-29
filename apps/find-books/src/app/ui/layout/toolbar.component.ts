import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LanguageSelectorComponent } from '../../shared/language-selector/language-selector.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fb-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LanguageSelectorComponent,
  ],
  template: ` <mat-toolbar color="primary" class="stickyBar">
    <a routerLink="/" class="logo">Find Books</a>
    <span class="spacer"></span>
    <fb-language-selector />
  </mat-toolbar>`,
  styles: [
    `
      .logo {
        color: white;
        text-decoration: none;
      }
      .spacer {
        flex: 1 1 auto;
      }
      .stickyBar {
        position: sticky;
        top: 0;
        z-index: 10;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
