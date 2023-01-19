import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'fb-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
