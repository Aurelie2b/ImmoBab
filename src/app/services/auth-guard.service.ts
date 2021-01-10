import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (userSession) => {
            if (userSession) {
              resolve(true);
            } else {
            this.router.navigate(['home']);
            resolve(false);
            }
          }
        )
      }
    );
  }
}
