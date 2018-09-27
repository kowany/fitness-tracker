import { TrainingService } from './../training/training.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor( 
      private router: Router,
      private afAuth: AngularFireAuth,
      private trainingService: TrainingService
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( user => {
      if ( user ) {
        this.isAuthenticated = true;
        this.authChange.next( true );
        this.router.navigate( ['/training'] );
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next( false );
        this.router.navigate( ['/login'] );
        this.isAuthenticated = false;
      }
    })
  }
  registerUser ( authData: AuthData ) {
    this.afAuth.auth
    .createUserWithEmailAndPassword( authData.email, authData.password )
    .then( result => {
    })
    .catch ( err => {
      console.log( err );
    });
  }

  login( authData: AuthData ) {

    this.afAuth.auth
    .signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then( result => {
      console.log( result );
    })
    .catch ( err => {
      console.log( err );
    });
  }

  logout() {
    this.afAuth.auth. signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
  private authSuccessfully() {
  }

}
