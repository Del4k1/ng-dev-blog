import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PostService } from 'src/app/service/post/post.service';
import { IPost } from 'src/app/utils/interface/IPost';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent {
  userPosts: IPost[] = [];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {
    this.fetchUserPosts();
  }

  fetchUserPosts() {
    const userId = this.authService.userId;
    this.postService.aggregatePostsWithUserInfo(userId).subscribe((posts) => {
      this.userPosts = posts;
      console.log(posts);
    });
  }

  restoreDeletedPost(postId: string) {
    this.postService.restoreDeletedPost(postId).subscribe(() => {
      this.fetchUserPosts();
    });
  }

  editPost(postId: string) {
    this.router.navigate(['/create-post', postId]);
  }
}
