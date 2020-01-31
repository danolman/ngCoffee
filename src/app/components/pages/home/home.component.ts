import { AuthService } from './../../../services/auth.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductsListComponent } from './products-list/products-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private productScv: ProductService, private auth: AuthService) { }

  public products = [];
  public history = [];
  public consumer = [];
  public product = '';
  public user:any = [];
  d = new Date();
  date:string = this.d.getDate() + '/' + (this.d.getMonth() + 1) + '/' + this.d.getFullYear();

  ngOnInit() {
    this.auth.isAuth().subscribe(user => {
      this.user = user;
      this.checkConsumer(user.uid);
      this.checkHistory(user.uid);
    });
    this.productScv.getAvailableProducts().subscribe( products => {
      console.log('Products', products );
      this.products = products;
    });
  }

  checkConsumer(user:string){
   this.productScv.getConsumer(user).subscribe(consumer => {
     console.log('usuario: ', );
     if(consumer.length > 0){
       this.consumer = consumer;
       console.log(this.consumer);
       this.checkHistory(user);
     }else{
       console.log('USUARIO NO EXISTE O SE ENCUENTRA BLOQUEADO');
     }
   });
  }

  checkHistory(user:string){
    this.productScv.getHistory(user).subscribe(history =>{
      console.log(history);
      this.history = history;
    });
    
  }

}
