import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/login';  // Backend login endpoint

  constructor(private http: HttpClient) {}

  login(loginData: { username: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, loginData, { observe: 'response' });
  }

  logout() {
    // Handle logout logic here
  }
}
