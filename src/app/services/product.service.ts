import { HistoryI } from './../models/history.interface';
import { Observable, from } from 'rxjs';
import { ProductI } from './../models/product.interface';
import { ConsumerI } from '../models/consumer.interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { AngularFireStorage } from '@angular/fire/storage';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private itemDoc: AngularFirestoreDocument<ProductI>;
  item: Observable<ProductI>;

  constructor(private afs: AngularFirestore) { 
    this.productCollection = afs.collection<ProductI>('product',ref => ref.where('available', '==', true));
    
    this.productCollectionAll = afs.collection<ProductI>('product');
    this.consumidorCollectionAll = afs.collection<ConsumerI>('consumidor');
    this.product = this.productCollection.valueChanges();
  
  }

  private productCollectionAll: AngularFirestoreCollection<ProductI>;
  private productCollection: AngularFirestoreCollection<ProductI>;
  private consumidorCollectionAll: AngularFirestoreCollection<ConsumerI>;
  private consumerCollection: AngularFirestoreCollection<ConsumerI>;
  private product: Observable<ProductI[]>;
  private productDoc: AngularFirestoreDocument<ProductI>;
  private prod: Observable<ProductI>;
  private consumer: Observable<ConsumerI>

  getAllConsumers(){
    return this.product = this.consumidorCollectionAll.snapshotChanges()
    .pipe( map( changes => {
        return changes.map( action =>{
          const data = action.payload.doc.data() as ConsumerI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getConsumer(userID:string){
    return this.afs.collection<ConsumerI>('consumer',ref => ref.where('uid', '==', 'AIzaSyBuWS-7bAU2Z4JPSXEQ4BkVABl8HG8S0V8').where('status', '==', 'active')).snapshotChanges()
    .pipe( map( changes => {
        return changes.map( action =>{
          const data = action.payload.doc.data() as ConsumerI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getHistory(userID:string){
    return this.afs.collection<HistoryI>('consumption',ref => ref.where('uid', '==', 'AIzaSyBuWS-7bAU2Z4JPSXEQ4BkVABl8HG8S0V8').where('uid', '==', 'AIzaSyBuWS-7bAU2Z4JPSXEQ4BkVABl8HG8S0V8')).snapshotChanges()
    .pipe( map( changes => {
        return changes.map( action =>{
          const data = action.payload.doc.data() as HistoryI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getAllProducts(){
    return this.product = this.productCollectionAll.snapshotChanges()
    .pipe( map( changes => {
        return changes.map( action =>{
          const data = action.payload.doc.data() as ProductI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getAvailableProducts(){
     return this.product = this.productCollection.snapshotChanges()
     .pipe( map( changes => {
         return changes.map( action =>{
           const data = action.payload.doc.data() as ProductI;
           data.id = action.payload.doc.id;
           return data;
         });
       })
     );
   }

  getOneProduct(idProd: string){
    this.productDoc = this.afs.doc<ProductI>(`product/${idProd}`);
    return this.prod = this.productDoc.snapshotChanges().pipe(map( action => {
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as ProductI;
        data.id = action.payload.id;
        return data;
      }
    }));
  }


//CRUD PRODUCT
  addProduct(formData:any, photo:string){
    let element:any = {
      name :formData.name,
      category :formData.category,
      price : formData.price,
      photoUrl :photo,
      available : formData.available
    }
    this.productCollectionAll.add(element);
  }
  updateProduct(){
    
  }

  deleteProduct(product: ProductI){
    console.log(product);
    this.itemDoc = this.afs.doc<ProductI>(`product/${product.id}`);
    this.itemDoc.delete();
  }

}
