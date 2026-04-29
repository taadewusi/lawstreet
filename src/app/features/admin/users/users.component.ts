import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
import { User, Role } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  total = 0; totalPages = 0; page = 0;
  loading = false;
  error = '';
  success = '';

  constructor(private userService: UserService, private roleService: RoleService) {}

  ngOnInit() { this.loadUsers(); this.loadRoles(); }

  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers(this.page, 10).subscribe({
      next: res => { this.users = res.data.items;  this.totalPages = res.data.totalPages; this.loading = false; },
      error: () => { this.error = 'Failed to load users.'; this.loading = false; }
    });
  }

  loadRoles() { this.roleService.getAllRoles().subscribe({ next: r => this.roles = r }); }

  toggleActive(user: User) {
    const obs = user.isActive ? this.userService.deactivateUser(user.id) : this.userService.activateUser(user.id);
    obs.subscribe({ next: () => { this.success = `User ${user.isActive ? 'deactivated' : 'activated'}.`; this.loadUsers(); }, error: () => this.error = 'Failed.' });
  }

  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i); }
  goToPage(p: number) { this.page = p; this.loadUsers(); }
}
