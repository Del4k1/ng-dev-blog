import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CommentService } from 'src/app/service/comment/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  comments: any[];
  postId: string = '';
  userId: string = '';
  isReply: { [key: string]: boolean } = {};
  isDisabled: boolean = true;
  avatar: string = './assets/images/user/user.png';
  userInfo: any;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.fetchPostId();
  }

  ngOnInit() {
    this.loadComments();
  }

  fetchPostId() {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
      this.userId = this.authService.userId;
    });
  }

  loadComments() {
    this.commentService.getCommentsForPost(this.postId).subscribe((res) => {
      this.comments = res.comments;

      this.comments.forEach((comment) => {
        this.authService.getUserById(comment.userId).subscribe((userData) => {
          if (userData) {
            comment.username = userData.username;
            comment.avatar = userData.avatar
              ? `http://localhost:3000/uploads/user/${userData.avatar}`
              : this.avatar;
          }
        });

        comment.reply.forEach((reply: any) => {
          this.authService.getUserById(reply.userId).subscribe((userData) => {
            if (userData) {
              reply.username = userData.username;
              reply.avatar = userData.avatar
                ? `http://localhost:3000/uploads/user/${userData.avatar}`
                : this.avatar;
            }
          });
        });
      });

      this.isDisabled = !this.authService.isLoggedIn;
    });
  }

  addReply(content: string, parentCommentId: string) {
    if (content.trim() !== '') {
      this.commentService
        .addReplyToComment(parentCommentId, {
          postId: this.postId,
          userId: this.userId,
          content,
        })
        .subscribe(() => {
          this.loadComments();
          this.isReply[parentCommentId] = false;
        });
    }
  }

  toggleReply(commentId: string) {
    this.isReply[commentId] = !this.isReply[commentId];
  }

  toggleLike(commentId: string) {
    this.commentService.toggleLike(commentId, this.userId).subscribe(() => {
      this.loadComments();
    });
  }

  isUserLiked(comment: any): boolean {
    return comment.likes.some((like: any) => like.userId === this.userId);
  }
}
