import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isLoggedIn) {
      console.log(this.auth.isLoggedIn);
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
