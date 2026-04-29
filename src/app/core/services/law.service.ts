import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Law, LawCreateRequest } from '../models/law.model';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

export interface LawSearchParams {
  search?: string;
  category?: string;
  jurisdiction?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class LawService {
  private apiUrl = `${environment.apiUrl}law`;

  constructor(private http: HttpClient) { }

  searchLaws(params: LawSearchParams): Observable<PaginatedResponse<Law>> {

    if (params.page == null || params.page == 0) {
      params.page = 1;
    }

    if (params.pageSize == null || params.pageSize == 0) {
      params.page = 10;
    }
    console.log("api url");
    console.log(this.apiUrl);
    const httpParams = Object.entries(params)
      .filter(([_, v]) => v != null && v !== '')
      .reduce((acc, [k, v]) => acc.set(k, String(v)), new HttpParams());

    return this.http.get<PaginatedResponse<Law>>(
      `${this.apiUrl}`,
      { params: httpParams }
    );
  }

  getLawById(uid: string): Observable<ApiResponse<Law>> {
    console.log("api url for get law by id");
    console.log(`${this.apiUrl}/${uid}`);
    return this.http.get<ApiResponse<Law>>(`${this.apiUrl}/${uid}`);
  }

  getAllLaws(page = 0, pageSize = 10): Observable<PaginatedResponse<Law>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<PaginatedResponse<Law>>(this.apiUrl, { params });
  }

  createLaw(law: LawCreateRequest): Observable<Law> {
    return this.http.post<Law>(this.apiUrl, law);
  }

  updateLaw(id: string, law: Partial<LawCreateRequest>): Observable<Law> {
    return this.http.put<Law>(`${this.apiUrl}/${id}`, law);
  }

  deleteLaw(uid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uid}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getJurisdictions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/jurisdictions`);
  }
}
