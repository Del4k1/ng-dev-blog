import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISavePost } from 'src/app/utils/interface/IPost';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SavePostService {
  API: string = environment.API + 'save-post';

  constructor(private http: HttpClient) {}

  savePost(userId: string, postId: string): Observable<ISavePost> {
    const savePostData = { userId, postId };
    return this.http.post<ISavePost>(`${this.API}`, savePostData);
  }

  getSavedPostsByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/${userId}`);
  }

  deletePostByPostId(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${postId}`);
  }
}
