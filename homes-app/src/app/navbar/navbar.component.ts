import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Flower book</a>
        
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item" *ngIf="!authService.isLoggedIn()">
              <a class="nav-link" routerLink="/login">Login</a>
            </li>
            <li class="nav-item d-flex align-items-center" *ngIf="authService.isLoggedIn()">
              <span class="nav-link">{{ username }}</span> <!-- Show username here -->
              <button class="nav-link btn btn-link" (click)="logout()">Logout</button> <!-- Logout button -->
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/posts">Posts</a>
            </li>
          </ul>
          <!-- Uncomment if you want a search bar -->
          <!-- 
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          -->
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) { }

  get username(): string | null {
    return this.authService.getUser();
  }

  logout() {
    this.authService.logout(); // Call the logout method
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
