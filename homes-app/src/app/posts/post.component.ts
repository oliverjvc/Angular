import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="posts.length > 0; else noPosts">
      <div *ngFor="let post of posts">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
    </div>
    <ng-template #noPosts>
      <p>No posts available.</p>
    </ng-template>
  `,
  providers: [PostService] 
})
export class PostsComponent implements OnInit {
  posts: any[] = []; // Ensure posts is declared as an array

  constructor(private postService: PostService) {} // Inject the PostService

  ngOnInit(): void {
    this.fetchPosts(); // Fetch posts on component initialization
  }

  // Method to fetch posts from the API
  fetchPosts(): void {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data; // Assign fetched posts to the component's posts
        console.log("Fetched Posts: ", this.posts);
      },
      (error) => {
        console.error('Error fetching posts:', error); // Handle error
      }
    );
  }

  learnMore(post: any): void {
    alert(`Learn more about: ${post.title}\n\n${post.content}`);
  }

}
