import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    // Check if the user is trying to access the login page
    if (next.routeConfig?.path === 'login') {
      if (token) {
        // If already logged in, redirect to posts
        this.router.navigate(['/posts']);
        return false; // Prevent access to the login page
      } else {
        return true; // Allow access to the login page
      }
    } else {
      // For all other routes
      if (token) {
        return true; // Token exists, allow access
      } else {
        // Token does not exist, redirect to login
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
}
