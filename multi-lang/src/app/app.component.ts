import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform,
              private translateService: TranslateService, 
              statusBar: StatusBar, splashScreen: SplashScreen) {

    let browserLanguage = translateService.getBrowserLang();
    let defaultlanguage = browserLanguage.substring(0, 2).toLowerCase();
    console.log("defaultlanguage:"+defaultlanguage);
    this.translateService.use(defaultlanguage);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

