import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AppDataProvider} from '../../providers/app-data/app-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  months=[];

  constructor(public navCtrl: NavController,protected appDataProvider:AppDataProvider) {
    this.months=["Jan","Feb","Mar","April","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  }

}
