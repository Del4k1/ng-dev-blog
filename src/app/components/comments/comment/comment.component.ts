import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  isInputComment: boolean = false;

  constructor(private authService: AuthService) {
    this.isInputComment = this.authService.isLoggedIn;
  }
}
