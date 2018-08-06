import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class GuardService implements CanActivate {
  
  // you would usually put this in it's own service and not access it directly!
  // this is just for the sake of the demo.
  isLoggedIn: boolean = false;

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn) {
      return true;
    } else {
      alert('Please log in')
      this.router.navigate(['/loginpage']);
      return false;
    }
  }

}