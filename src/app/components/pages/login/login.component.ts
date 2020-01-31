import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
//import {auth} from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm =  new FormGroup({
    email : new FormControl('test001.barrientos@gmail.com'),
    password : new FormControl('123456')
  })


  constructor(private afsAuth: AngularFireAuth, private route: Router, private authService: AuthService) {}
  
  public usrId: string;
  private user: any;
  ngOnInit() {
    //this.user = this.authService.userData.subscribe(user => {console.log(user)} );
  }

  onLogin():void{
    this.authService.loginEmailPAssword(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
    .then(res => {
      console.log(res);
      this.user = res;
    })
    .catch(err => {
      console.log('Error: ', err);
    });
  }

  forgotPassword():void{
    this.authService.passwordRecovery('townsendaniel@gmail.com')
    .then(res => { console.log(res); })
    .catch(err => {
      console.log('Error: ', err);
    });
  }

  isConsumer(){
    
  }

  onLoginOk(){
    this.route.navigate(['/home']);
  }

 onSignOut(){
   this.afsAuth.auth.signOut();
 }

}
