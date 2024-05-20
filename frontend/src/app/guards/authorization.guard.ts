import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({ providedIn: 'root'})
export class AuthorizationGuard {

  constructor(private  authService: AuthenticationService, private router: Router) {
  }

  canActivate(route:  ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isAuthenticated) {
      let requiredRoles= route.data['roles'] ;
      let userRoles =this.authService.roles;
       for(let role of userRoles){
         if(requiredRoles.includes(role))  {
           return true;
         }
       }
       return false;
    }
    else{
      this.router.navigateByUrl("/login");
      return false;
    }
  }

}
