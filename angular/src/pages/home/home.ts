import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AppDataProvider} from '../../providers/app-data/app-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather:string="sunny"; 
  appName:string;

  constructor(public navCtrl: NavController, appDataProvider:AppDataProvider) {
      this.appName=appDataProvider.getAppName();
  }
  
}
