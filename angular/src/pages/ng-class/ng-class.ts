import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyData } from '../../providers/my-data';
/**
 * Generated class for the NgClass page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-ng-class',
  templateUrl: 'ng-class.html',
})
export class NgClass {

  bold:boolean=false;
  italic:boolean=false;
  large:boolean=false;
  appName:string;

  currentClasses: {};

  constructor(public navCtrl: NavController, public navParams: NavParams,private myData:MyData) {
      this.appName=myData.getAppName();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NgClass');
  }

  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses =  {
      bold:   this.bold,
      italic: this.italic,
      large:  this.large
    };
  }

}
