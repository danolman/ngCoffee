import { ProductI } from './../../../models/product.interface';
import { AddProductComponent } from './add-product/add-product.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';


declare var $:any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public products = [];
  public consumers = [];
  constructor(private productScv: ProductService, private db: AngularFirestore) { }

  ngOnInit() {

    this.productScv.getAvailableProducts().subscribe( products => {
      this.products = products;
      console.log('Products', this.products );
    });
    this.productScv.getAllConsumers().subscribe( consumers => {
      console.log('Consumers', consumers );
    });   
  }

  deleteProduct(item:ProductI){
    this.productScv.deleteProduct(item);
  }

}
