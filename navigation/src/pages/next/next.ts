import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MiddlePage} from '../middle/middle';

@IonicPage()
@Component({
  selector: 'page-next',
  templateUrl: 'next.html',
})
export class NextPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addMiddlePage(){
    this.navCtrl.insert(1,MiddlePage);
  }

  moveToHomePage(){
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('[NextPage]ionViewDidLoad ');
  }

  ionViewWillEnter(){
    console.log("[NextPage] ionViewWillEnter");
  }

  ionViewDidEnter(){
    console.log("[NextPage] ionViewDidEnter");
  }

  ionViewWillLeave(){
    console.log("[NextPage] ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("[NextPage] ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("[NextPage] ionViewWillUnload");
  }

  ionViewCanEnter(){
    console.log("[NextPage] ionViewCanEnter");
  }

  ionViewCanLeave(){
    console.log("[NextPage] ionViewCanLeave");
  }
}
