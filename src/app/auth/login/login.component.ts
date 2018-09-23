import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  
  constructor( private authService: AuthService ) { }

  ngOnInit() {
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

}
