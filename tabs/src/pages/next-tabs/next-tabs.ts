import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams,Tabs } from 'ionic-angular';


import { Page1Page } from '../page1/page1';
import { Page2Page } from '../page2/page2';
import { Page3Page } from '../page3/page3';

/*
  Generated class for the NextTabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'next-tabs.html'
})
export class NextTabsPage {


@ViewChild('nextTabs') tabRef: Tabs;

  tab1Root: any = Page1Page;
  tab2Root: any = Page2Page;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}  

  ionViewDidLeave(){
    this.tabRef.select(1);
  }
}


