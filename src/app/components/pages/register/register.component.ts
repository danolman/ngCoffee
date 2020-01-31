import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

//import {RegisterFormService} from '../../../services/register-form.service';

//Subir foto
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public email: string;
  public password: string;

  createFormGroup(){
    return new FormGroup({
      name : new FormControl('alan'),
      lastName : new FormControl('barrientos'),
      email : new FormControl('ab.barrientos@gmail.com'),
      password : new FormControl('123456'),
      photo : new FormControl('')
    })
  }

  registerForm: FormGroup;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private router: Router, private authService: AuthService,  private storage: AngularFireStorage) {
    this.registerForm = this.createFormGroup();
   }

  @ViewChild('imageUser', {static: false}) inputImageUser: ElementRef;

  ngOnInit(){}

  onUpload(e){
    //console.log(e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/pofile_${id}`;
    const ref =  this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize( () => this.urlImage = ref.getDownloadURL() ) ).subscribe();
  }

  onAddUser(){
    this.authService.registerUser(this.registerForm.controls.email.value, this.registerForm.controls.password.value)
    .then((res) => { 
      this.authService.isAuth().subscribe( user => {
        if(user){
          console.log('USER ACTUAL: ', user);
          user.updateProfile({
            displayName: this.registerForm.controls.name.value+ ' '+this.registerForm.controls.lastName.value,
            photoURL: this.inputImageUser.nativeElement.value,
            phoneNumber: 'consumer'
          })
          .then( () => {console.log('User UPDATED', user);} )
          .catch( err => console.log(err => err.message));
        }
      }) 
      this.router.navigate(['/home']);
    })
    .catch(err => console.log(err.message));
  }

  onReset(){
    this.registerForm.reset();
  }  
}