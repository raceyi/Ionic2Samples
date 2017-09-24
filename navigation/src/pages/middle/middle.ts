import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MiddlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-middle',
  templateUrl: 'middle.html',
})
export class MiddlePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('[MiddlePage]ionViewDidLoad ');
  }

  ionViewWillEnter(){
    console.log("[MiddlePage] ionViewWillEnter");
  }

  ionViewDidEnter(){
    console.log("[MiddlePage] ionViewDidEnter");
  }

  ionViewWillLeave(){
    console.log("[MiddlePage] ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("[MiddlePage] ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("[MiddlePage] ionViewWillUnload");
  }

  ionViewCanEnter(){
    console.log("[MiddlePage] ionViewCanEnter");
  }

  ionViewCanLeave(){
    console.log("[MiddlePage] ionViewCanLeave");
  }
}
