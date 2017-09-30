import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GridPage} from '../grid/grid';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  move(){
    this.navCtrl.push(GridPage);
  }
}
