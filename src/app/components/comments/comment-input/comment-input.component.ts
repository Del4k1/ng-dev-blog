import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CommentService } from 'src/app/service/comment/comment.service';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
})
export class CommentInputComponent {
  postId: string = '';
  userId: string = '';
  isDisabled: boolean = true;

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.userId = this.authService.userId;

    this.route.params.subscribe((params) => {
      this.postId = params['id'];
    });

    this.isDisabled = !this.authService.isLoggedIn;
  }

  addComment(content: string) {
    if (content.trim() !== '') {
      this.commentService
        .addComment(this.postId, {
          postId: this.postId,
          userId: this.userId,
          content,
        })
        .subscribe((res) => {
          console.log('Комментарий добавлен успешно', res);
        });
    }
  }
}
