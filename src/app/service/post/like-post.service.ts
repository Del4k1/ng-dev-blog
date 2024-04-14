import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LikePostService {
  API: string = environment.API + 'post';

  constructor(private http: HttpClient) {}

  likePost(postId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.API}/like`, {
      userId,
      type: 'like',
      postId,
    });
  }

  thumbUpPost(postId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.API}/like`, {
      userId,
      type: 'thumbUp',
      postId,
    });
  }

  thumbDownPost(postId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.API}/like`, {
      userId,
      type: 'thumbDown',
      postId,
    });
  }

  firePost(postId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.API}/like`, {
      userId,
      type: 'fire',
      postId,
    });
  }
}
