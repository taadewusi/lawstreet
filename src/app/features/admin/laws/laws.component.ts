import { Component, OnInit } from '@angular/core';
import { LawService } from '../../../core/services/law.service';
import { Law, LawCreateRequest } from '../../../core/models/law.model';

@Component({
  selector: 'app-admin-laws',
  templateUrl: './laws.component.html',
  styleUrls: ['./laws.component.scss']
})
export class AdminLawsComponent implements OnInit {
  laws: Law[] = [];
  total = 0;
  totalPages = 0;
  page = 0;
  loading = false;
  error = '';
  success = '';

  showForm = false;
  editingLaw: Law | null = null;
  submitting = false;

  form: LawCreateRequest = this.emptyForm();

  categories = ['Criminal','Labour','Commercial','Constitutional','Land','Family','Tax','Environmental'];
  jurisdictions = ['Federal','Lagos','Abuja','Kano','Rivers','Ogun','Oyo'];

  constructor(private lawService: LawService) {}

  ngOnInit() { this.loadLaws(); }

  emptyForm(): LawCreateRequest {
    return { title: '', category: '', jurisdiction: '', tags: [], chapter: '', section: '' };
  }

  loadLaws() {
    this.loading = true;
    this.lawService.getAllLaws(this.page, 10).subscribe({
      next: res => { this.laws = res.data.items; this.total = res.data.totalCount; this.totalPages = res.data.totalPages; this.loading = false; },
      error: () => { this.error = 'Failed to load laws.'; this.loading = false; }
    });
  }

  openCreate() { this.form = this.emptyForm(); this.editingLaw = null; this.showForm = true; }

  openEdit(law: Law) {
    this.editingLaw = law;
    this.form = { title: law.title, category: law.legalText, jurisdiction: law.jurisdiction,  tags: [...law.tags], section: law.section || '' };
    this.showForm = true;
  }

  submit() {
    this.submitting = true; this.error = ''; this.success = '';
    const obs = this.editingLaw
      ? this.lawService.updateLaw(this.editingLaw.uid, this.form)
      : this.lawService.createLaw(this.form);
    obs.subscribe({
      next: () => { this.success = this.editingLaw ? 'Law updated!' : 'Law created!'; this.submitting = false; this.showForm = false; this.loadLaws(); },
      error: () => { this.error = 'Operation failed.'; this.submitting = false; }
    });
  }

  deleteLaw(uid: string) {
    if (!confirm('Delete this law?')) return;
    this.lawService.deleteLaw(uid).subscribe({ next: () => this.loadLaws(), error: () => this.error = 'Delete failed.' });
  }

  get tagsStr(): string { return this.form.tags.join(', '); }
  set tagsStr(val: string) { this.form.tags = val.split(',').map(t => t.trim()).filter(Boolean); }

  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i); }
  goToPage(p: number) { this.page = p; this.loadLaws(); }
}
