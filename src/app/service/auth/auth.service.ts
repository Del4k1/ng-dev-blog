import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, tap, map, mergeMap, of } from 'rxjs';
import { IAuth } from 'src/app/utils/interface/IAuth';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId: string = '';
  userData: any = '';
  access_token: string = '';
  isLoggedIn: boolean = false;
  API: string = environment.API;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.checkToken();
  }

  private checkToken() {
    this.access_token = sessionStorage.getItem('access_token') || '';

    if (this.access_token) {
      this.validateToken();
    }
  }

  private validateToken() {
    const isExpired = this.jwtHelper.isTokenExpired(this.access_token);

    if (!isExpired) {
      const decodedToken = this.jwtHelper.decodeToken(this.access_token);
      this.userId = decodedToken.id;
      this.isLoggedIn = true;
    } else {
      this.clearToken();
    }
  }

  public clearToken() {
    this.access_token = '';
    this.isLoggedIn = false;
    sessionStorage.removeItem('access_token');
  }

  private handleAuthentication(res: IAuth): void {
    if (res) {
      this.userId = res.id;
      this.isLoggedIn = true;
      sessionStorage.setItem('access_token', res.token);
      this.access_token = res.token;
    } else {
      this.clearToken();
      throw new Error('You have not right!');
    }
  }

  register(data: any): Observable<IAuth> {
    return this.http.post<IAuth>(`${this.API}user`, data).pipe(
      map((res) => {
        this.handleAuthentication(res);
        return res;
      }),
      catchError(() => of(null))
    );
  }

  login(data: any): Observable<any> {
    return this.http.post<IAuth>(`${this.API}auth/login`, data).pipe(
      mergeMap((res) => {
        this.handleAuthentication(res);
        return this.getUserById(this.userId);
      }),
      tap((res) => (this.userData = res)),
      catchError(() => of(null))
    );
  }

  getUserById(userId: string): Observable<any> {
    if (this.userData) {
      return of(null);
    }

    return this.http.get(`${this.API}auth/${userId}`);
  }

  uploadUserImage(userId: string, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.API}user/${userId}/upload`, formData);
  }
}
