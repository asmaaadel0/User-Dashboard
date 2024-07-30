import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'User-Dashboard';
  loading = false;

  onLoadingChange(isLoading: boolean) {
    this.loading = isLoading;
  }
}
