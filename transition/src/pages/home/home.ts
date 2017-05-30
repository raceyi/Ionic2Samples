import { Component } from '@angular/core';
import { NavController ,App} from 'ionic-angular';
import {Next} from '../next/next';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private app:App,public navCtrl: NavController) {

  }

  move(){
      this.app.getRootNav().push(Next,{},{animate:true,animation: 'slide-up', direction: 'forward' });
      //this.app.getRootNav().push(Next,{},{});
  }

}
