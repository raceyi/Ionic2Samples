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

  nextPage(){
    console.log("move into next Page");
    this.navCtrl.push(NextPage,{},{animate:true,animation: 'slide-up-down', direction: 'forward' });
  }

}
