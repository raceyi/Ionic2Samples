import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import {ServerProvider} from '../providers/server-provider';
import {StorageProvider} from '../providers/storage-provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  constructor(platform: Platform, 
              private storageProvider:StorageProvider,
              private serverProvider:ServerProvider, 
              statusBar: StatusBar, splashScreen: SplashScreen) {
                
    platform.ready().then(() => {
      this.storageProvider.getLoginInfo().then((res:any)=>{
          console.log(res);
          this.serverProvider.login(res.username,res.password).then((res:any)=>{
              console.log(res);
              this.rootPage = TabsPage;
          },(err)=>{
              // no login info
              console.log("login failure");
              this.rootPage= LoginPage;
          });              

       },(err)=>{
          // no login info
          console.log("no login info found");
          this.rootPage = LoginPage;
       });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
