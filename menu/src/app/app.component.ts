import { Component } from '@angular/core';
import { Platform ,App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingPage } from '../pages/setting/setting';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  currentPage='HomePage';

  constructor(private platform: Platform, private app:App,
        statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  checkPageHidden(page){
    if(this.currentPage==page){
        return true;
    }
    return false;
  }

  openSettingPage(){
    console.log("openSettingPage");
    this.app.getRootNavs()[0].setRoot(SettingPage);
    setTimeout(() => {  // workaround 
      this.currentPage='SettingPage';   
    }, 500); //  0.5 seconds      
  }

  openHomePage(){
    console.log("openHomePage");
    this.currentPage='HomePage';
    this.app.getRootNavs()[0].setRoot(HomePage);
    setTimeout(() => {  // workaround 
      this.currentPage='HomePage';   
    }, 500); //  0.5 seconds         
  }

  exit(){
    console.log("exit");
    this.platform.exitApp();
  }

}

