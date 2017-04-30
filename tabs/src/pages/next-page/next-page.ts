import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NextPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-next-page',
  templateUrl: 'next-page.html',
})
export class NextPage {

  title:string;
  number:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     console.log(navParams.get("title"));
     console.log(navParams.get("number"));
     this.title=navParams.get("title");
     this.number=parseInt(navParams.get("number"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextPage');
  }

}
