import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
    menu;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let menuString=this.navParams.get('menu');
    this.menu=JSON.parse(menuString);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  cancel(){
    this.navCtrl.pop();
  }
}
