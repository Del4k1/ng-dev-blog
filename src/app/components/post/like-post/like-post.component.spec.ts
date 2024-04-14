import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikePostComponent } from './like-post.component';

describe('LikePostComponent', () => {
  let component: LikePostComponent;
  let fixture: ComponentFixture<LikePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikePostComponent]
    });
    fixture = TestBed.createComponent(LikePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
