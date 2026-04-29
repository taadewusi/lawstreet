import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { PaginatedResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) {}

  getAllUsers(page = 0, pageSize = 10): Observable<PaginatedResponse<User>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<User>>(this.apiUrl, { params });
  }
  getUserById(id: string): Observable<User> { return this.http.get<User>(`${this.apiUrl}/${id}`); }
  updateUser(id: string, data: Partial<User>): Observable<User> { return this.http.put<User>(`${this.apiUrl}/${id}`, data); }
  assignRole(userId: string, roleId: string): Observable<User> { return this.http.post<User>(`${this.apiUrl}/${userId}/roles/${roleId}`, {}); }
  removeRole(userId: string, roleId: string): Observable<User> { return this.http.delete<User>(`${this.apiUrl}/${userId}/roles/${roleId}`); }
  deactivateUser(id: string): Observable<void> { return this.http.patch<void>(`${this.apiUrl}/${id}/deactivate`, {}); }
  activateUser(id: string): Observable<void> { return this.http.patch<void>(`${this.apiUrl}/${id}/activate`, {}); }
}
