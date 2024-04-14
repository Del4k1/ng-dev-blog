import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent {
  post: any = {};

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.detailPost();
  }

  detailPost() {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      this.postService.getDetailPost(postId).subscribe((res) => {
        this.post = res;

        if (this.post && this.post.content) {
          this.post.content = this.post.content.replace(
            /src=\"([a-z0-9.-]+)\"/gm,
            'src="http://localhost:3000/uploads/post/$1"'
          );
        }
        console.log('res: ', res);
      });
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
