import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './utils/interceptor/auth.interceptor';
import { NavComponent } from './components/nav/nav.component';
import { JwtModule } from '@auth0/angular-jwt';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { ShowPostComponent } from './components/post/show-post/show-post.component';
import { SafeHtmlPipe } from './utils/pipe/post.pipe';
import { SearchPostComponent } from './components/post/search-post/search-post.component';
import { DetailPostComponent } from './components/post/detail-post/detail-post.component';
import { ShowProfileComponent } from './components/profile/show-profile/show-profile.component';
import { SavePostComponent } from './components/post/save-post/save-post.component';
import { UserPostComponent } from './components/post/user-post/user-post.component';
import { CommentInputComponent } from './components/comments/comment-input/comment-input.component';
import { CommentListComponent } from './components/comments/comment-list/comment-list.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { ImgProfileComponent } from './components/profile/img-profile/img-profile.component';
import { LikePostComponent } from './components/post/like-post/like-post.component';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreatePostComponent,
    EditPostComponent,
    NavComponent,
    ShowPostComponent,
    SafeHtmlPipe,
    SearchPostComponent,
    DetailPostComponent,
    ShowProfileComponent,
    SavePostComponent,
    UserPostComponent,
    CommentInputComponent,
    CommentListComponent,
    CommentComponent,
    ImgProfileComponent,
    LikePostComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('access_token') || '';
        },
      },
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    // Angular Material
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
