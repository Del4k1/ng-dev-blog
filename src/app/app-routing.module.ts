import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { DetailPostComponent } from './components/post/detail-post/detail-post.component';
import { ShowProfileComponent } from './components/profile/show-profile/show-profile.component';
import { SavePostComponent } from './components/post/save-post/save-post.component';
import { UserPostComponent } from './components/post/user-post/user-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'create-post',
    component: CreatePostComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'create-post/:postId',
    component: CreatePostComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'save-post',
    component: SavePostComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'user-post',
    component: UserPostComponent,
  },
  {
    path: 'post/:id',
    component: DetailPostComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'profile',
    component: ShowProfileComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
