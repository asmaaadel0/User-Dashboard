import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'User-Dashboard';
  searchTerm: string = '';

  onSearchTermChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
  }
}
