import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './products-list/products-list.component';





@NgModule({
  declarations: [
    HomeComponent, 
    UserProfileComponent, 
    ProductComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
