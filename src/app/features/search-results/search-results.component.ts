import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LawService, LawSearchParams } from '../../core/services/law.service';
import { Law } from '../../core/models/law.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  laws: Law[] = [];
  total = 0;
  totalPages = 0;
  page = 0;
  pageSize = 10;
  loading = false;
  error = '';

  searchQuery = '';
  selectedCategory = '';
  selectedJurisdiction = '';
  selectedStatus = '';

  categories: string[] = ['Criminal', 'Labour', 'Commercial', 'Constitutional', 'Land', 'Family', 'Tax', 'Environmental'];
  jurisdictions: string[] = ['Federal', 'Lagos', 'Abuja', 'Kano', 'Rivers', 'Ogun', 'Oyo'];
  statuses = ['active', 'repealed', 'amended'];

  constructor(private route: ActivatedRoute, private router: Router, private lawService: LawService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.selectedCategory = params['category'] || '';
      this.selectedJurisdiction = params['jurisdiction'] || '';
      this.selectedStatus = params['status'] || '';
      this.page = +(params['page'] || 0);
      this.loadLaws();
    });
  }

  loadLaws() {
    this.loading = true;
    this.error = '';

    const params: LawSearchParams = {
      search: this.searchQuery,
      category: this.selectedCategory,
      jurisdiction: this.selectedJurisdiction,
      status: this.selectedStatus,
      page: this.page,
      pageSize: this.pageSize
    };

    this.lawService.searchLaws(params).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.laws = res.data?.items ?? [];
          this.total = res.data.totalCount;
          this.totalPages = res.data.totalPages;
        } else {
          this.error = res.message;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Failed to load laws. Please try again.';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.page = 0;
    this.router.navigate(['/search'], {
      queryParams: {
        q: this.searchQuery || null,
        category: this.selectedCategory || null,
        jurisdiction: this.selectedJurisdiction || null,
        status: this.selectedStatus || null,
        page: 0
      },
      queryParamsHandling: 'merge'
    });
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedJurisdiction = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  goToPage(p: number) {
    this.router.navigate(['/search'], { queryParams: { page: p }, queryParamsHandling: 'merge' });
  }

  viewLaw(uid: string) {
    this.router.navigate(['/law', uid]);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
