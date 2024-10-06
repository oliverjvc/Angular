import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service'; // Adjust the path as needed
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule if you're using buttons

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'], 
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule], // Import the required modules
})
export class PostsComponent implements OnInit {
  posts: any[] = []; // Change to Post[] if you have a model
  expandedPostId: number | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data; // Store the fetched posts
        console.log('Fetched Posts: ', this.posts); // Debug output
      },
      (error) => {
        console.error('Error fetching posts:', error); // Log any errors
      }
    );
  
  }

  togglePost(postId: number): void {
    this.expandedPostId = this.expandedPostId === postId ? null : postId;
  }

  showFullText(text: string): void {
    alert(text); // Replace with your desired way of displaying the full text
  }
  
}
