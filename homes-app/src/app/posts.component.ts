import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service'; // Adjust the path as needed
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecommendationService } from './posts/recommendation.service'; // Adjust the path as necessary
import { RecommendationDTO } from './posts/recommendation.dto'; // Adjust the path as necessar



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, HttpClientModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  expandedPostId: number | null = null; // Declare expandedPostId property
  currentUser = { id: 1 }; // Initialize currentUser with a default id
  newPost = { recommendationText: '', userId: 0 }; // New post object with userId initialized to 0

  constructor(private postService: PostService, private http: HttpClient, private recommendationService: RecommendationService) {} // Inject HttpClient and RecommendationService

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data; 
        console.log('Fetched Posts: ', this.posts);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  fetchPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  togglePost(postId: number): void {
    this.expandedPostId = this.expandedPostId === postId ? null : postId;
  }

  showFullText(text: string): void {
    alert(text); 
  }

  getPostTitle(text: string): string {
    const splitText = text.split('\r\n\r\n');
    return splitText[0]; 
  }

  createPost() {
    if (this.newPost.recommendationText.trim()) {
      this.postService.createPost(this.newPost).subscribe(
        (response) => {
          this.fetchPosts(); 
          this.newPost.recommendationText = ''; 
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.newPost.recommendationText && this.newPost.userId) {
        this.recommendationService.createRecommendation(this.newPost).subscribe(
            (response) => {
                console.log('Recommendation created successfully!', response);
                // Optionally reset the form
                this.newPost = { recommendationText: '', userId: this.currentUser.id };
            },
            (error) => {
                console.error('Error creating recommendation:', error);
            }
        );
    } else {
        console.error('Form is invalid or incomplete!');
    }
}
}
