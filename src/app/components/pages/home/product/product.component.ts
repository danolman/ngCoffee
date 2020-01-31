import { ProductI } from './../../../../models/product.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private productSrv: ProductService, private route: ActivatedRoute) { }
  public product: ProductI = {};
 
  ngOnInit() {
    //const idProduct = this.route.snapshot.params['id'];
    
  }

  getOneProduct(){
    const idProduct:string = 'nbtcXp5QR8ntWLYXNNUe';
    console.log(idProduct);
    this.productSrv.getOneProduct(idProduct).subscribe( product => {
      console.log('Detalle producto:', product);
    });
  }

}
