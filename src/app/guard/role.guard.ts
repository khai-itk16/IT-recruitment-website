import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DecodeJwtService } from '../services/decode-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private decodeJwtService: DecodeJwtService, 
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const decodeToken = this.decodeJwtService.getDecodedAccessToken()
      const expectedRole = route.data.expectedRole;
      if (
        !this.authService.loggedIn() || 
        decodeToken.roles !== expectedRole
      ) {
        this.router.navigate(['/home']);
        this.toastrService.error("Bạn không được cấp quyền truy cập vào đường dẫn đó", "ERROR", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
        return false;
      }
      return true;
  }
  
}
