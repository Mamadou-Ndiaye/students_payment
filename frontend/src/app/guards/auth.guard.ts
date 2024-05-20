import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthGuard {

  constructor(private  authService: AuthenticationService, private router: Router) {
  }

  canActivate(route:  ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isAuthenticated)
          return true;
        else{
           this.router.navigateByUrl("/login");
           return false;
        }
  }

}
