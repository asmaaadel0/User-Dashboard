import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimation', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  prepareRoute(outlet: any) {
    return outlet.activatedRouteData['animation'] || '';
  }
  title = 'User-Dashboard';
  searchTerm: string = '';
  constructor(private router: Router) {}

  onSearchTermChanged(term: string) {
    this.searchTerm = term;
    this.router.navigate([], {
      queryParams: { search: this.searchTerm },
      queryParamsHandling: 'merge',
    });
  }
}
