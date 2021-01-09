import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  loginUser(email: string, password: string){
    return new Promise (
      (resolve, reject) => (
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            resolve(data);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        )
      )
    );
  }

  logoutUser(){
    firebase.auth().signOut();
  }

}
