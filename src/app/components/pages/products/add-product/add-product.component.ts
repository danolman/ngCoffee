import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
//Subir foto
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


declare var $:any;
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  productForm: FormGroup;
  canAdd:boolean = false;
  thumb:string;

  constructor(private formBuilder: FormBuilder, private storage: AngularFireStorage, public service: ProductService) { }



  ngOnInit() {
    $('.modal').modal();
    $('select').formSelect();

    this.productForm = this.formBuilder.group({
      category: ['Nesspresso'],
      name: ['', Validators.required],
      price: ['', [Validators.required]],
      available: [true]
    });
    
  }

  uploadFile(event) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/products_${id}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.thumb = urlImage;
            this.canAdd = true;
            $('select').formSelect();
          });
        } )
     )
    .subscribe();
  }

  onAddProd(){
    console.log(this.productForm.value);
    this.service.addProduct(this.productForm.value, this.thumb);
  }

  onUpdate(){}

  closeModal(){
    console.log('Cerrar');
    $('.modal').modal('close');
  }

}
