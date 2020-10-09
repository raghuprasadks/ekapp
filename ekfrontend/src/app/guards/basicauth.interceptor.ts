import { Injectable } from '@angular/core';
import {loginService} from '../services/login.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class BasicauthInterceptor implements HttpInterceptor {

  constructor(private loginService:loginService) {}
  /**

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }  */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add header with basic auth credentials if user is logged in and request is to the api url
    const user = this.loginService.userValue;
    const isLoggedIn = user && user.authdata;

    //console.log('intercept ### '+isLoggedIn);
    //console.log('intercept ### :islogged in '+user.authdata)
    //const isApiUrl = request.url.startsWith(environment.apiUrl);
    const isApiUrl = request.url.startsWith("http://localhost:4000");
    if (isLoggedIn && isApiUrl) {
      console.log('setting authorization header ');
        request = request.clone({
            setHeaders: { 
                Authorization: `Basic ${user.authdata}`
            }
        });
    }

    return next.handle(request);
}
}
