import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  API: string = environment.API + 'comment';

  constructor(private http: HttpClient) {}

  addComment(postId: string, commentData: any): Observable<any> {
    return this.http.post(`${this.API}/${postId}`, commentData);
  }

  addReplyToComment(commentId: string, replyData: any): Observable<any> {
    return this.http.post(`${this.API}/${commentId}/reply`, replyData);
  }

  getCommentsForPost(postId: string): Observable<any> {
    return this.http.get<any>(`${this.API}/${postId}`);
  }

  toggleLike(commentId: string, userId: string): Observable<any> {
    return this.http.post(`${this.API}/${commentId}/like/${userId}`, {});
  }
}
