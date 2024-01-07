import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${ this.baseUrl }/v1/project`);
  }

  getProjectById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${ this.baseUrl }/v1/project/${id}`);
  }

  getActiveProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${ this.baseUrl }/v1/project`);
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(`${ this.baseUrl }/v1/project`, project);
  }

  applyToProject(application: any): Observable<any> {
    return this.http.post<any>(`${ this.baseUrl }/v1/application`, application);
  }
}
