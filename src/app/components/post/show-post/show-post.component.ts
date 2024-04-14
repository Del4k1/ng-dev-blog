import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PostService } from 'src/app/service/post/post.service';
import { SavePostService } from 'src/app/service/post/save-post.service';
import { IPost } from 'src/app/utils/interface/IPost';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss'],
})
export class ShowPostComponent implements OnInit {
  userData: any;
  posts: IPost[] = [];
  isDisabled: boolean = true;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private savePostService: SavePostService
  ) {
    this.loadAllPosts();
  }

  ngOnInit(): void {
    const userId = this.authService.userId;

    if (userId) {
      this.postService.aggregatePostsWithUserInfo(userId).subscribe((res) => {
        this.userData = res;
      });
    }
  }

  loadAllPosts() {
    this.postService.getAllPost().subscribe((res) => {
      this.posts = res;
      this.isDisabled = !this.authService.isLoggedIn;
    });
  }

  savePostToUser(post: IPost) {
    const userId = this.authService.userId;

    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const postId = post._id;

    this.savePostService.savePost(userId, postId).subscribe((res) => {
      console.log('Пост успешно сохранен:', res);
    });
  }
}
