import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'User-Dashboard';
  searchTerm: string = '';
  constructor(private router: Router) {}

  onSearchTermChanged(term: string) {
    this.searchTerm = term;
    this.router.navigate([], {
      queryParams: { search: this.searchTerm },
      queryParamsHandling: 'merge'
    });
  }
}
