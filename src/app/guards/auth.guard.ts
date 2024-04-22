import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree=> {

  return localStorage.getItem('accessToken')
    ? true
    : inject(Router).createUrlTree(['/login']);
};
