import { Injectable } from '@angular/core';

import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public userData:Observable<firebase.User>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private afsAuth: AngularFireAuth, private storage: AngularFireStorage) { 
    this.userData = afsAuth.authState;
    console.log('USER: ', this.afsAuth.auth.currentUser); 
  }

  registerUser(email: string, password:string){
    return new Promise((resolve, reject) =>{
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
          .then( userData => resolve(userData),
          err => reject(err))
    });
  }

  loginEmailPAssword(email:string, password:string){    
    return new Promise((resolve, reject) => {
        this.afsAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData)),
        err => reject(err);
    }); 
  }

  passwordRecovery(email:string){
    console.log(email);
    return new Promise((resolve, reject) => {
        this.afsAuth.auth.sendPasswordResetEmail(email)
        .then(res => resolve('Correo enviado')),
        err => reject(err);
    }); 
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'uploads/images/users/';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }


  loginGoogle(){}
  loginFacebook(){}
  logoutUser(){}

  isAuth() {
    return this.afsAuth.authState.pipe(map( auth => auth));
  }

}
