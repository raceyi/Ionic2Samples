import { Component } from '@angular/core';
import { Platform,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Setting } from '../pages/setting/setting';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(private app:App,private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openSettingPage(){
    console.log("openSettingPage");
    this.app.getRootNav().push(Setting);
  }

  exit(){
    console.log("exit");
    this.platform.exitApp();
  }
}
