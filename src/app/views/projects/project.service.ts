import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private headersApi: HttpHeaders;
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.headersApi = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    });
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/project`, {
      headers: this.headersApi,
    });
  }

  getProjectById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/project/${id}`, {
      headers: this.headersApi,
    });
  }

  getProjectsById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/project/constructor/history?id=${id}`, {
      headers: this.headersApi,
    });
  }

  getApplyProjects(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/v1/application/provider/history?id=${id}`,
      { headers: this.headersApi }
    );
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/v1/project`, project, {
      headers: this.headersApi,
    });
  }

  applyToProject(application: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/v1/application`, application, {
      headers: this.headersApi,
    });
  }

  uploadFile(file: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/v1/uploads`, file, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`
      },
    });
  }
}
