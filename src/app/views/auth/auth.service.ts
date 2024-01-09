import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.API_URL;
  public user: Observable<any>;
  private userSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('user'));
    this.user = this.userSubject.asObservable();
  }

  login(credentials: any): any {
    this.http
      .post<any>(`${this.baseUrl}/v1/auth/login`, credentials)
      .subscribe({
        next: (data) => {
          localStorage.clear();
          localStorage.setItem('user', data.id);
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('role', data.role);
          this.userSubject.next(data);

          if (this.isConstructorUser) {
            this.router.navigate(['/constructor/projects']);
          } else {
            this.router.navigate(['/provider/active']);
          }
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/v1/user`, user);
  }

  get userValue(): any {
    return this.userSubject.value;
  }

  get isConstructorUser(): boolean {
    return localStorage.getItem('role') === 'constructor';
  }
}
