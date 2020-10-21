import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService {
  
  constructor(private injector: Injector) { }
  intercept(req, next) {
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req;
    if(authService.loggedIn()) {
      tokenizedReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
        }
      )
    }
    return next.handle(tokenizedReq)
  }
}
