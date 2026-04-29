import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LawService } from '../../core/services/law.service';
import { Law } from '../../core/models/law.model';

@Component({
  selector: 'app-law-detail',
  templateUrl: './law-detail.component.html',
  styleUrls: ['./law-detail.component.scss']
})
export class LawDetailComponent implements OnInit {
  law: Law | null = null;
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private router: Router, private lawService: LawService) {}

 ngOnInit() {
  const uid = this.route.snapshot.paramMap.get('uid');

  if (!uid) {
    this.error = 'Invalid law ID.';
    return;
  }

  this.loading = true;

  this.lawService.getLawById(uid).subscribe({
    next: res => {
      console.log(res);
      this.law = res.data;
      this.loading = false;
    },
    error: () => {
      this.error = 'Law not found.';
      this.loading = false;
    }
  });
}

  goBack() { this.router.navigate(['/search']); }
}
