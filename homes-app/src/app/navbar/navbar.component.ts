import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../guards/auth.service';
import { Router } from '@angular/router';
import { ChildDateComponent } from '../child-date.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ChildDateComponent],
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
          <app-child-date [currentDate]="currentDate"></app-child-date> <!-- Passing currentDate to child -->
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  currentDate: string = new Date().toLocaleDateString(); // Provide current date to child component
  constructor(public authService: AuthService, private router: Router) { }

  get username(): string | null {
    return this.authService.getUser();
  }

  logout() {
    this.authService.logout(); // Call the logout method
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
