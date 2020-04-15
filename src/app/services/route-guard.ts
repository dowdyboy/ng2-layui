import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";


@Injectable({
  providedIn:'root'
})
export class UserAuthGuard implements CanActivate,CanActivateChild{

  constructor(
    private $auth:AuthenticationService,
    private router:Router
  ){}

  private checkRoute(){
    if(this.$auth.getToken()) return true
    else{
      this.router.navigateByUrl('/login')
      return false
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRoute()
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRoute()
  }
  
}

@Injectable({
  providedIn:'root'
})
export class UserNotAuthGuard implements CanActivate,CanActivateChild{

  constructor(
    private $auth:AuthenticationService,
    private router:Router
  ){}

  private checkRoute(){
    if(this.$auth.getToken()) {
      this.router.navigateByUrl('/main')
      return false
    }
    else return true
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRoute()
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRoute()
  }

}
