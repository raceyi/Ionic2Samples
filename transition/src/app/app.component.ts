import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Config } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import {SlideUpTransition} from '../classes/slide-up-transition';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(public config: Config,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.config.setTransition('slide-up', SlideUpTransition);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
