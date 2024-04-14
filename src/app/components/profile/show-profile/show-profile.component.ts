import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PostService } from 'src/app/service/post/post.service';
import { ImgProfileComponent } from '../img-profile/img-profile.component';
import { SavePostService } from 'src/app/service/post/save-post.service';

import { forkJoin, mergeMap, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss'],
})
export class ShowProfileComponent implements OnInit {
  userData: any;
  userPosts: any;
  savePost: string[];
  avatar: any = this.sanitizer.bypassSecurityTrustResourceUrl(
    './assets/images/user/user.png'
  );

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private savePostService: SavePostService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const userId = this.authService.userId;

    this.authService
      .getUserById(userId)
      .pipe(
        mergeMap((userData) => {
          this.userData = userData;

          if (this.userData?.avatar) {
            this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(
              `http://localhost:3000/uploads/user/${this.userData.avatar}`
            );
          }

          return forkJoin([
            this.savePostService.getSavedPostsByUserId(userId),
            this.postService.aggregatePostsWithUserInfo(userId),
          ]);
        })
      )
      .subscribe((res) => {
        this.savePost = res[0];
        this.userPosts = res[1];
        console.log(res);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImgProfileComponent, {
      width: '500px',
      data: { userId: this.authService.userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
