import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './guards/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/flower.svg" alt="logo" aria-hidden="true">
      </header>
      <app-navbar></app-navbar>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, NavbarComponent, CommonModule, HttpClientModule],  
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout(); // Handle logout
  }

  get username() {
    return this.authService.getUser(); // Get the username
  }
}
