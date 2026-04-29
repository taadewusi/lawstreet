import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchQuery = '';
  suggestions = [
    'Criminal Code Act',
    'Land Use Act',
    'Labour Act',
    'Companies and Allied Matters Act',
    'Constitution of Nigeria 1999',
  ];
  showSuggestions = false;

  constructor(private router: Router) {}

  search() {
    const q = this.searchQuery.trim();
    if (!q) return;
    this.router.navigate(['/search'], { queryParams: { q } });
  }

  selectSuggestion(s: string) {
    this.searchQuery = s;
    this.showSuggestions = false;
    this.search();
  }

  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') this.search();
  }
}
