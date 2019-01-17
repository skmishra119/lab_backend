import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private helperService: HelperService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Clone request and append content type
    request = request.clone({
      headers: request.headers
        .append('Content-Type', 'application/json')
    });
    // Append user authorozation token if found in session storage otherwise keep as it is.
    if (!this.helperService.isUndefinedOrNull(this.auth.userClaim.token)) {
      request = request.clone({
        headers: request.headers
          .append('Authorization', `${this.auth.userClaim.token}`)
      });
    }
    // Forword request for further processing
    return next.handle(request);
  }
}
