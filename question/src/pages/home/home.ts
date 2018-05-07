import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { InAppBrowser,InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  browserRef;
  url="https://m.naver.com/";

  constructor(public navCtrl: NavController,private platform:Platform,
              private splashScreen:SplashScreen,
              private iab: InAppBrowser) {
    this.platform.ready().then(()=>{
          console.log("platform ready comes");
          if(this.platform.is("android")){
            this.browserRef=this.iab.create(this.url,"_blank" ,'toolbar=no');
          }else{ // ios
            console.log("ios");
            this.browserRef=this.iab.create(this.url,"_blank" ,'location=no,closebuttoncaption=종료');
          }

          this.browserRef.on("loadstart").subscribe((event:InAppBrowserEvent)=>{
            
          });

        this.browserRef.on("loadstop").subscribe((event:InAppBrowserEvent)=>{
            this.splashScreen.hide();
        });
    })    
  }

}
