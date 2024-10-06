import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/KnjigaCveca/api/recommendations';  // API URL

  constructor(private http: HttpClient) {}

  // Fetch all posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a specific post by ID
  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => ({
        id: response.recommendationId,
        title: 'Recommendation',
        content: response.recommendationText,
        timestamp: response.timestamp,
        comments: response.comments || []  // Assuming comments are part of the response
      }))
    );
  }

  // Fetch comments for a specific post
  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${postId}/comments`);
  }

  // Submit a new comment for the post
  postComment(postId: string, commentText: string): Observable<any> {
    const commentPayload = { text: commentText };
    return this.http.post(`${this.apiUrl}/${postId}/comments`, commentPayload);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }
}
