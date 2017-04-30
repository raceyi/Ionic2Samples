import { Injectable } from '@angular/core';

import {Tabs} from 'ionic-angular';
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageProvider {
  tabsRef:Tabs;

  constructor() {
    console.log('Hello StorageProvider Provider');
  }

  getTabsRef(){
    return this.tabsRef;
  }

  setTabsRef(tabsRef:Tabs){
     this.tabsRef=tabsRef;
  }
  
}
