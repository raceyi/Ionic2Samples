import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { LoginProvider } from '../providers/login/login';
import { LoginPage } from '../pages/login/login';
import {ShopPage} from "../pages/shop/shop";
import {SignupPage} from "../pages/signup/signup";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private loginProvider:LoginProvider,              
              private storageProvider:StorageProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log("platform ready comes");
      this.storageProvider.readId().then((res:any)=>{
          //res.type
          this.loginProvider.loginSocialLogin(res.type).then((obj:any)=>{
            console.log("obj:"+JSON.stringify(obj));
            if(obj.id==res.id){ 
              this.rootPage=ShopPage;
            }else{
              this.rootPage=LoginPage;
            }
          });
      },err=>{
          console.log("err:"+JSON.stringify(err));
          this.rootPage=LoginPage;
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

