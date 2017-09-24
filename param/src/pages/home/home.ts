import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NextPage } from '../next/next';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  input;

  moveToNextPage(){
    console.log("number:"+this.input);
    this.navCtrl.push(NextPage,{number:this.input});  
  }

  constructor(public navCtrl: NavController) {

  }

}
