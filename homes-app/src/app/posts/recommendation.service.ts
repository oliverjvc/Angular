import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private apiUrl = 'http://localhost:8080/KnjigaCveca/api/recommendations'; // Adjust the endpoint

  constructor(private http: HttpClient) {}

  createRecommendation(recommendation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, recommendation);
  }
}
