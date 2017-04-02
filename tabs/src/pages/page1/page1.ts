import { Component } from '@angular/core';
import { App,NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Page3Page } from '../page3/page3';
/*
  Generated class for the Page1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1Page {

  constructor(private app: App,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page1Page');
  }

  moveTabs(){
    this.app.getRootNav().push(TabsPage);  
  }

  moveTab(){
    this.navCtrl.push(Page3Page);  // back button shown. 
    //this.navCtrl.setRoot(Page3Page);
  }
  
  selectTab(){
      this.navCtrl.parent.select(1);
  }
}
