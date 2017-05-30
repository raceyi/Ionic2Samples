import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Cart } from './cart';

@NgModule({
  declarations: [
    Cart,
  ],
  imports: [
    IonicPageModule.forChild(Cart),
  ],
  exports: [
    Cart
  ]
})
export class CartModule {}
