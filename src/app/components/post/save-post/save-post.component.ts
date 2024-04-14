import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SavePostService } from 'src/app/service/post/save-post.service';
import { ISavePost } from 'src/app/utils/interface/IPost';

@Component({
  selector: 'app-save-post',
  templateUrl: './save-post.component.html',
  styleUrls: ['./save-post.component.scss'],
})
export class SavePostComponent {
  savedPosts: any;

  constructor(
    private savePostService: SavePostService,
    private authService: AuthService
  ) {
    this.loadSavedPosts();
  }

  loadSavedPosts() {
    const userId = this.authService.userId;

    this.savePostService.getSavedPostsByUserId(userId).subscribe((res) => {
      this.savedPosts = res;
      console.log(res);
    });
  }

  deleteSavedPost(postId: string) {
    this.savePostService.deletePostByPostId(postId).subscribe(() => {});
  }
}
