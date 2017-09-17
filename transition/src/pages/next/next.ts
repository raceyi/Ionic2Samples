import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-next',
  templateUrl: 'next.html',
})
export class NextPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextPage');
  }

  homePage(){
    this.navCtrl.pop({animate:true,animation: 'slide-up-down', direction: 'back' });  
  }
}
