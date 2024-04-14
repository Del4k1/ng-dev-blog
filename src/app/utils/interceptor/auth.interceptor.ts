import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq;
    if (this.authService.isLoggedIn) {
      authReq = req.clone({
        headers: req.headers.append(
          'authorization',
          'Bearer ' + this.authService.access_token
        ),
      });
    } else {
      authReq = req;
    }

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) console.log('Server response');
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) this.router.navigate(['']);
          }
        }
      )
    );
  }
}
