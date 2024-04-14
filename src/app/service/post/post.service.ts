import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/utils/interface/IPost';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  API: string = environment.API + 'post';

  constructor(private http: HttpClient) {}

  getAllPost(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.API);
  }

  getDetailPost(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.API}/detail/${postId}`);
  }

  aggregatePostsWithUserInfo(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/${userId}`);
  }

  createPost(userId: string, post: any): Observable<IPost> {
    return this.http.post<IPost>(this.API, { userId, ...post });
  }

  updatePost(postId: string, updateData: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.API}/${postId}/update`, updateData);
  }

  restoreDeletedPost(postId: string): Observable<IPost> {
    return this.http.put<IPost>(`${this.API}/${postId}/active`, {});
  }

  uploadFiles(formData: FormData, headers: HttpHeaders): Observable<FormData> {
    return this.http.post<any>(`${this.API}/upload`, formData, { headers });
  }
}
