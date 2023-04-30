import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private myRoute: Router,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService) {}
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedInn()) {
      return true;
    }else {
      this.myRoute.navigate(['login']);
      return false;
    }
  }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (environment.defaultauth === 'firebase') {
//         const currentUser = this.authenticationService.currentUser();
//         if (currentUser) {
//             // logged in so return true
//             return true;
//         }
//     } else {
//         const currentUser = this.authFackservice.currentUserValue;
//         if (currentUser) {
//             // logged in so return true
//             return true;
//         }
//     }
//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
//     return false;
// }
}

