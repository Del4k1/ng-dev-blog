import { TestBed } from '@angular/core/testing';

import { LikePostService } from './like-post.service';

describe('LikePostService', () => {
  let service: LikePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
