import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { NextPage} from '../next/next';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App) {
  }

  moveNextPage(){
     this.app.getRootNavs()[0].push(NextPage); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

}
