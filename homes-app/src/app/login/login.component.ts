import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service'; // Import your AuthService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onSubmit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Change to application/json
    const body = {
      username: this.loginData.username,
      password: this.loginData.password,
    };
  
    this.http.post('http://localhost:8080/KnjigaCveca/api/login', body, { headers, observe: 'response' }).subscribe(
      (response: any) => {
        console.log('Response:', response.body); // Log response
        if (response.status === 200) {
          const token = response.body.token; 
          this.authService.setUser(this.loginData.username, token);
          this.router.navigate(['/posts']);
        }
      },
      (error) => {
        console.error('Login error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password'; 
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }
}
