import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NgStyle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-ng-style',
  templateUrl: 'ng-style.html',
})
export class NgStyle {
  bold:boolean=false;
  italic:boolean=false;
  large:boolean=false;

  currentStyles = {
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-size':  '12px'
  };

  fontSize:string='x-large';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NgStyle');
  }

  setCurrentStyles() {
    // CSS styles: set per current state of component properties
    this.currentStyles = {
      'font-style':  this.italic ? 'italic' : 'normal',
      'font-weight': this.bold ? 'bold'   : 'normal',
      'font-size':   this.large ? '24px'   : '12px'
    };
    console.log(JSON.stringify(this.currentStyles));
  }

  change(){
    console.log("fontSize:"+this.fontSize);  
  }
}
