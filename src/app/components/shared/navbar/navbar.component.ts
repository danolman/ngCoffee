import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth, private route: Router) { }
  
  public appName: string  = 'ngCoffe';
  public isLogged: boolean = false;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe( auth => {
      if(auth){
        console.log('Is logued');
        this.isLogged = true;
      }else{
        console.log('Not user logued');
        this.isLogged = false;
      }
    });
  }

  onSignOut(){
    this.afsAuth.auth.signOut();
    this.isLogged = false;
    this.route.navigate(['/register']);
  }

}
