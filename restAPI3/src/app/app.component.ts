import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StorageProvider } from '../providers/storage/storage';
import { ServerProvider } from '../providers/server/server';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
              private storageProvider:StorageProvider,
              private serverProvider:ServerProvider,
              statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.storageProvider.getLoginInfo().then((res:any)=>{
          console.log(res);
          this.serverProvider.login(res.username,res.password).then((res:any)=>{
              console.log(res);
              this.rootPage = HomePage;
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
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

