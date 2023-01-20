import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { ToolbarComponent } from './ui/layout/toolbar.component';
import { LanguageSelectorStore } from './shared/language-selector/language-selector.store';

@Component({
  standalone: true,
  imports: [RouterModule, ToolbarComponent],
  selector: 'fb-root',
  template: `
    <fb-toolbar />
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .app-container {
        padding: 20px;
      }
    `,
  ],
  providers: [LanguageSelectorStore],
})
export class AppComponent {}
