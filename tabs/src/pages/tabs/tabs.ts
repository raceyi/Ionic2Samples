import { Component,ViewChild } from '@angular/core';
import {Tabs} from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import {StorageProvider} from '../../providers/storage-provider';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  @ViewChild('tabs') tabsRef:Tabs;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private storageProvider:StorageProvider) {
    console.log("tabs-constructor");
   // console.log("tabs-constructor: "+ this.tabsRef.selectedIndex);
  }

  ionViewDidLoad(){
    this.storageProvider.setTabsRef(this.tabsRef);
    console.log("tabs-ionViewDidLoad: "+ this.tabsRef.selectedIndex);
  }

  ionViewWillEnter(){
    console.log("tabs-ionViewWillEnter");
  }

  ionViewDidEnter(){
    console.log("tabs-ionViewDidEnter");
  }

  ionViewWillLeave(){
    console.log("tabs-ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("tabs-ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("tabs-ionViewWillUnload");
  }

  ionViewCanEnter():boolean{
    console.log("tabs-ionViewCanEnter");
    return true;
  }

  ionViewCanLeave():boolean{
    console.log("tabs-ionViewCanLeave");
    return true;
  }
}
