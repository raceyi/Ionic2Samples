import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NextPage} from '../next/next';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  moveToNextPageWithSetRoot(){
    this.navCtrl.setRoot(NextPage);
  }

  moveToNextPage(){	
      this.navCtrl.push(NextPage);
  }

  ionViewDidLoad(){
    console.log("[HomePage] ionViewDidLoad");
  }

  ionViewWillEnter(){
    console.log("[HomePage] ionViewWillEnter");
  }

  ionViewDidEnter(){
    console.log("[HomePage] ionViewDidEnter");
  }

  ionViewWillLeave(){
    console.log("[HomePage] ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("[HomePage] ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("[HomePage] ionViewWillUnload");
  }

  ionViewCanEnter(){
    console.log("[HomePage] ionViewCanEnter");
  }

  ionViewCanLeave(){
    console.log("[HomePage] ionViewCanLeave");
  }

}
