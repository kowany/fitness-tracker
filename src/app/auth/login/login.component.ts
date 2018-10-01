import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

import { UIService } from './../../shared/ui.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin: FormGroup;
  isLoading = false;
  private loadingSubscription: Subscription = new Subscription();
  constructor( private authService: AuthService, private uiService: UIService ) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe( isLoading => {
      this.isLoading = isLoading;
    } );
    this.formLogin = new FormGroup({
      'email': new FormControl( '', {
        validators: [ Validators.required, Validators.email ]
      } ),
      'password': new FormControl( '', { validators: [Validators.required]} )
    });
  }

  onSubmit( ) {

    this.authService.login({
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    });
  }

  ngOnDestroy() {

    if ( this.loadingSubscription ) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
