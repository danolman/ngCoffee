import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { MessageI } from '../models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {

  private contactCollection: AngularFirestoreCollection<MessageI>;

  constructor(private afs: AngularFirestore) { 
    this.contactCollection = afs.collection<MessageI>('contacts');
  }

  addRegister(newContact: MessageI):void{
    this.contactCollection.add(newContact);
  }
}
