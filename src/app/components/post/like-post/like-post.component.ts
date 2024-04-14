import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LikePostService } from 'src/app/service/post/like-post.service';
import { PostService } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-like-post',
  templateUrl: './like-post.component.html',
  styleUrls: ['./like-post.component.scss'],
})
export class LikePostComponent {
  post: any;
  userId: string = '';
  postId: string = '';
  likeCount: number = 0;
  fireCount: number = 0;
  thumbUpCount: number = 0;
  thumbDownCount: number = 0;
  isDisabled: boolean = true;

  constructor(
    private likePostService: LikePostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.fetchUserAndPostId();
    this.isDisabled = this.authService.isLoggedIn;
  }

  fetchUserAndPostId() {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
      this.userId = this.authService.userId;
      this.loadPostDetails(this.postId);
    });
  }

  loadPostDetails(postId: string) {
    this.postService.getDetailPost(postId).subscribe((data) => {
      console.log(data);
      this.post = data;
      this.likeCount = this.post.like.length;
      this.thumbUpCount = this.post.thumbUp.length;
      this.thumbDownCount = this.post.thumbDown.length;
      this.fireCount = this.post.fire.length;

      this.isDisabled = !this.authService.isLoggedIn;
    });
  }

  likePost() {
    this.likePostService.likePost(this.postId, this.userId).subscribe((res) => {
      this.likeCount = res.likeCount;
      this.loadPostDetails(this.postId);
    });
  }

  thumbUpPost() {
    this.likePostService
      .thumbUpPost(this.postId, this.userId)
      .subscribe((res) => {
        this.thumbUpCount = res.thumbUpCount;
        this.loadPostDetails(this.postId);
      });
  }

  thumbDownPost() {
    this.likePostService
      .thumbDownPost(this.postId, this.userId)
      .subscribe((res) => {
        this.thumbDownCount = res.thumbDownCount;
        this.loadPostDetails(this.postId);
      });
  }

  firePost() {
    this.likePostService.firePost(this.postId, this.userId).subscribe((res) => {
      this.fireCount = res.fireCount;
      this.loadPostDetails(this.postId);
    });
  }
}
