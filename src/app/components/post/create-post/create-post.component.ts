import { Component, OnInit } from '@angular/core';
import * as Editor from '../../../../../ckeditor/build/ckeditor';
import { PostService } from 'src/app/service/post/post.service';
import { IPost } from 'src/app/utils/interface/IPost';
import { v4 as uuidv4 } from 'uuid';
import { mergeMap, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  private postId: string;
  public title: string = '';
  public content: string = '';
  public Editor: any = Editor;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params['postId'];
      if (this.postId) {
        this.loadPostData();
      }
    });
  }

  loadPostData() {
    this.postService.getDetailPost(this.postId).subscribe((post: IPost) => {
      this.title = post.title;
      this.content = post.content;

      if (this.content && this.content.length > 0) {
        this.content = this.content.replace(
          /src=\"([a-z0-9.-]+)\"/gm,
          'src="http://localhost:3000/uploads/post/$1"'
        );
      }
    });
  }

  /*
  createOfUpdatePost() {
    const userId = this.authService.userId;
    const post: IPost = {
      title: this.title,
      content: this.content,
    };

    if (this.postId) {
      this.postService.updatePost(this.postId, post).subscribe((res) => {
        console.log('Post updated:', res);
      });
    } else {
      this.postService.createPost(userId, post).subscribe((res) => {
        console.log('Post created:', res);
      });
    }
  } 
  */

  createPost() {
    const userId = this.authService.userId;
    const post: IPost = { title: this.title, content: this.content };
    const regex = /data:image\/\w{3,4};base64,([^"']*)/gi;
    const formData = new FormData();

    post.content = post.content.replace(regex, (match: string) => {
      const arr = match.split(';base64,');
      const fileName = `${uuidv4()}.${arr[0].substring(
        arr[0].lastIndexOf('/') + 1
      )}`;

      formData.append(
        'files',
        base64ToBlob(arr[1], arr[0].replace('data:', '')),
        fileName
      );

      return fileName;
    });

    const headers = new HttpHeaders();
    headers.set(
      'Content-Type',
      'multipart/form-data;boundary=' + Math.random().toString().substr(2)
    );

    this.postService
      .uploadFiles(formData, headers)
      .pipe(
        mergeMap(() => {
          if (this.postId) {
            return this.postService.updatePost(this.postId, post);
          } else {
            return this.postService.createPost(userId, post);
          }
        })
      )
      .subscribe((res) => {
        console.log('Post saved:', res);
      });
  }
  /*
  createPost() {
    const userId = this.authService.userId;
    const post: IPost = { title: this.title, content: this.content };
    const regex = /data:image\/\w{3,4};base64,([^"']*)/gi;
    const formData = new FormData();

    post.content = post.content.replace(regex, (match: string) => {
      const arr = match.split(';base64,');
      const fileName = `${uuidv4()}.${arr[0].substring(
        arr[0].lastIndexOf('/') + 1
      )}`;

      formData.append(
        'files',
        base64ToBlob(arr[1], arr[0].replace('data:', '')),
        fileName
      );

      return fileName;
    });

    let obs = of(null);

    const headers = new HttpHeaders();
    headers.set(
      'Content-Type',
      'multipart/form-data;boundary=' + Math.random().toString().substr(2)
    );

    obs
      .pipe(
        mergeMap(() => this.postService.uploadFiles(formData, headers)),
        mergeMap(() => this.postService.createPost(userId, post))
      )
      .subscribe((res) => {
        console.log(res);
        console.log(this.content);
      });
  }
  */
}

function base64ToBlob(base64String: string, contentType = '') {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], { type: contentType });
}
