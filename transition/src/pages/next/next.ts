import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Menu} from '../menu/menu';
import {Order} from '../order/order';
import {Cart} from '../cart/cart';

/**
 * Generated class for the Next tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-next',
  templateUrl: 'next.html'
})
@IonicPage()
export class Next {

  tab1Root: any = Menu;
  tab2Root: any = Order;
  tab3Root: any = Cart;

  constructor(public navCtrl: NavController) {}

}
