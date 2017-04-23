import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyData } from '../../providers/my-data';
/**
/**
 * Generated class for the Structural page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-structural',
  templateUrl: 'structural.html',
})
export class Structural {
  weather:string; 
  months=["Jan","Feb","Mar","April","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  appName:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private myData:MyData) {
    this.appName=myData.getAppName();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Structural');
  }

}
