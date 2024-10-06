// src/app/recommendation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecommendationDTO } from './recommendation.dto'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private apiUrl = 'http://localhost:8080/KnjigaCveca/api/recommendations'; // Adjust based on your backend API

  constructor(private http: HttpClient) {}

  createRecommendation(recommendation: RecommendationDTO): Observable<RecommendationDTO> {
    return this.http.post<RecommendationDTO>(this.apiUrl, recommendation);
  }

  // Add more methods as needed for your service
}
