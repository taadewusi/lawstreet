import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/user.model';
import { environment } from '../../../environments/environment';

export interface RoleCreateRequest {
  name: string;
  description: string;
  permissions: string[];
}

@Injectable({ providedIn: 'root' })
export class RoleService {
  private apiUrl = `${environment.apiUrl}/roles`;
  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Role[]> { return this.http.get<Role[]>(this.apiUrl); }
  getRoleById(id: string): Observable<Role> { return this.http.get<Role>(`${this.apiUrl}/${id}`); }
  createRole(role: RoleCreateRequest): Observable<Role> { return this.http.post<Role>(this.apiUrl, role); }
  updateRole(id: string, role: Partial<RoleCreateRequest>): Observable<Role> { return this.http.put<Role>(`${this.apiUrl}/${id}`, role); }
  deleteRole(id: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  getAvailablePermissions(): Observable<string[]> { return this.http.get<string[]>(`${this.apiUrl}/permissions`); }
}
