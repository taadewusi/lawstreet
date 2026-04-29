import { Component, OnInit } from '@angular/core';
import { RoleService, RoleCreateRequest } from '../../../core/services/role.service';
import { Role } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class AdminRolesComponent implements OnInit {
  roles: Role[] = [];
  loading = false;
  error = '';
  success = '';
  showForm = false;
  editingRole: Role | null = null;
  submitting = false;

  form: RoleCreateRequest = { name: '', description: '', permissions: [] };
  availablePermissions = ['CREATE_LAW','READ_LAW','UPDATE_LAW','DELETE_LAW','MANAGE_USERS','MANAGE_ROLES','VIEW_REPORTS'];

  constructor(private roleService: RoleService) {}

  ngOnInit() { this.loadRoles(); }

  loadRoles() {
    this.loading = true;
    this.roleService.getAllRoles().subscribe({
      next: roles => { this.roles = roles; this.loading = false; },
      error: () => { this.error = 'Failed to load roles.'; this.loading = false; }
    });
  }

  openCreate() { this.form = { name: '', description: '', permissions: [] }; this.editingRole = null; this.showForm = true; }

  openEdit(role: Role) {
    this.editingRole = role;
    this.form = { name: role.name, description: role.description, permissions: [...role.permissions] };
    this.showForm = true;
  }

  togglePermission(perm: string) {
    const idx = this.form.permissions.indexOf(perm);
    if (idx === -1) this.form.permissions.push(perm);
    else this.form.permissions.splice(idx, 1);
  }

  hasPerm(perm: string): boolean { return this.form.permissions.includes(perm); }

  submit() {
    this.submitting = true; this.error = ''; this.success = '';
    const obs = this.editingRole
      ? this.roleService.updateRole(this.editingRole.id, this.form)
      : this.roleService.createRole(this.form);
    obs.subscribe({
      next: () => { this.success = this.editingRole ? 'Role updated!' : 'Role created!'; this.submitting = false; this.showForm = false; this.loadRoles(); },
      error: () => { this.error = 'Operation failed.'; this.submitting = false; }
    });
  }

  deleteRole(id: string) {
    if (!confirm('Delete this role?')) return;
    this.roleService.deleteRole(id).subscribe({ next: () => this.loadRoles(), error: () => this.error = 'Delete failed.' });
  }
}
