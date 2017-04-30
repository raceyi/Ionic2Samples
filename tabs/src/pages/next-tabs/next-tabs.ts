import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';

import { NextAbout } from '../next-about/next-about';
import { NextContact } from '../next-contact/next-contact';
import { NextHome } from '../next-home/next-home';
import { NextExit } from '../next-exit/next-exit';
import {StorageProvider} from '../../providers/storage-provider';
/**
 * Generated class for the NextTabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-next-tabs',
  templateUrl: 'next-tabs.html',
})
export class NextTabs {
  tab0Root = NextExit;
  tab1Root = NextHome;
  tab2Root = NextAbout;
  tab3Root = NextContact;

  constructor(public navCtrl: NavController, public navParams: NavParams
              ,private app:App,private storageProvider:StorageProvider) {
      console.log('NextTabs constructor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextTabs');
  }

  nextExit(){
     console.log("NextExit tab selected"); 
     this.app.getRootNav().pop();
  }

  ionViewWillEnter(){
    console.log("nextTabs-ionViewWillEnter");
  }

  ionViewDidEnter(){
    console.log("nextTabs-ionViewDidEnter");
  }

  ionViewWillLeave(){
    console.log("nextTabs-ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("nextTabs-ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("nextTabs-ionViewWillUnload");
    this.storageProvider.getTabsRef().select(1);
  }

  ionViewCanEnter():boolean{
    console.log("nextTabs-ionViewCanEnter");
    return true;
  }

  ionViewCanLeave():boolean{
    console.log("nextTabs-ionViewCanLeave");
    return true;
  }

}
