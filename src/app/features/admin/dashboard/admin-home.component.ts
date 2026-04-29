import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-home',
  template: `
    <div>
      <div class="page-header">
        <div>
          <h1>Welcome back, {{ auth.currentUser?.firstName }}!</h1>
          <p>Here's an overview of the LawStreet admin panel.</p>
        </div>
      </div>
      <div class="stats-grid">
        <div class="stat-card card">
          <div class="stat-icon">📜</div>
          <div class="stat-label">Total Laws</div>
          <div class="stat-value">—</div>
          <a routerLink="/admin/laws" class="stat-link">Manage Laws →</a>
        </div>
        <div class="stat-card card">
          <div class="stat-icon">🔑</div>
          <div class="stat-label">Roles</div>
          <div class="stat-value">—</div>
          <a routerLink="/admin/roles" class="stat-link">Manage Roles →</a>
        </div>
        <div class="stat-card card">
          <div class="stat-icon">👥</div>
          <div class="stat-label">Users</div>
          <div class="stat-value">—</div>
          <a routerLink="/admin/users" class="stat-link">Manage Users →</a>
        </div>
      </div>
      <div class="quick-actions card" style="margin-top:24px;">
        <h2 style="font-size:1.1rem; margin-bottom:16px; color:#1a3a5c;">Quick Actions</h2>
        <div class="qa-grid">
          <a class="qa-item" routerLink="/admin/laws"><span class="qa-icon">➕</span><span>Add New Law</span></a>
          <a class="qa-item" routerLink="/admin/roles"><span class="qa-icon">🔑</span><span>Create Role</span></a>
          <a class="qa-item" routerLink="/admin/users"><span class="qa-icon">👤</span><span>View Users</span></a>
          <a class="qa-item" routerLink="/"><span class="qa-icon">🔍</span><span>Search Laws</span></a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
    .stat-card { text-align: center; }
    .stat-icon { font-size: 2rem; margin-bottom: 8px; }
    .stat-label { font-size: .82rem; text-transform: uppercase; letter-spacing: .06em; color: #9ca3af; font-weight: 600; }
    .stat-value { font-size: 2rem; font-weight: 700; color: #1a3a5c; font-family: 'Playfair Display',serif; margin: 4px 0; }
    .stat-link { font-size: .82rem; color: #2563a8; font-weight: 600; text-decoration: none; &:hover { color: #1a3a5c; } }
    .qa-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
    .qa-item { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 20px 12px; background: #f8f7f4; border: 1px solid #e5e7eb; border-radius: 10px; text-decoration: none; color: #374151; font-size: .88rem; font-weight: 500; transition: all .18s; cursor: pointer;
      &:hover { background: #1a3a5c; color: #fff; border-color: #1a3a5c; }
    }
    .qa-icon { font-size: 1.5rem; }
  `]
})
export class AdminHomeComponent {
  constructor(public auth: AuthService) {}
}
