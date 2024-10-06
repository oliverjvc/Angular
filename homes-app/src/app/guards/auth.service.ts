import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: string | null = null;
  private token: string | null = null; // Add token property

  setUser(username: string, token: string) {
    this.loggedInUser = username;
    this.token = token; // Store the token
    localStorage.setItem('username', username);
    localStorage.setItem('token', token); // Store token in local storage
  }

  getUser(): string | null {
    return this.loggedInUser || localStorage.getItem('username');
  }

  getToken(): string | null { // Add this method
    return this.token || localStorage.getItem('token');
  }

  logout() {
    this.loggedInUser = null;
    this.token = null; // Clear the token
    localStorage.removeItem('username');
    localStorage.removeItem('token'); // Clear token from local storage
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
