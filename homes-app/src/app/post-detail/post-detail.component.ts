import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Import ReactiveFormsModule for the comment form
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: any;
  comments: Array<{ username: string, text: string }> = [];  // To store the comments
  commentForm: FormGroup;  // Form for adding new comments

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    // Initialize the comment form
    this.commentForm = new FormGroup({
      text: new FormControl('')
    });
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      // Fetch post details
      this.postService.getPostById(postId).subscribe((data) => {
        this.post = data;
        this.comments = data.comments;  // Assuming comments are part of post data
        console.log('Post Data:', data);
      });
    } else {
      console.error('Post ID is null');
    }
  }

  // Method to submit a new comment
  submitComment() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      const newComment = this.commentForm.value.text;

      // Post the new comment
      this.postService.postComment(postId, newComment).subscribe(() => {
        this.commentForm.reset();  // Clear the form after submission
        this.loadComments(postId); // Reload comments to reflect the new comment
      });
    }
  }

  // Method to load comments from the service
  loadComments(postId: string) {
    this.postService.getComments(postId).subscribe((data) => {
      this.comments = data;
    });
  }
}
