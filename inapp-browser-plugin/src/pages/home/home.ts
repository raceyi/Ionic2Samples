import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { InAppBrowser,InAppBrowserEvent } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  browserRef;
  certUrl="XXXX";
  successUrl="XXXX";
  failureUrl="xxxx";

  constructor(public navCtrl: NavController,private platform:Platform
            ,private iab: InAppBrowser) {

  }

  auth(){

      if(this.platform.is("android")){
            this.browserRef=this.iab.create(this.certUrl,"_blank" ,'toolbar=no');
      }else{ // ios
            console.log("ios");
            this.browserRef=this.iab.create(this.certUrl,"_blank" ,'location=no,closebuttoncaption=종료');
      }

      this.browserRef.on("exit").subscribe((event)=>{
                  console.log("InAppBrowserEvent(exit):"+JSON.stringify(event)); 
                  this.browserRef.close();
      });

      this.browserRef.on("loadstart").subscribe((event:InAppBrowserEvent)=>{
          console.log("InAppBrowserEvent(loadstart):"+String(event.url));
          if(event.url.startsWith(this.successUrl)){ // Please add success and failure into server 
                console.log("cert success");
                this.browserRef.close();
          }else if(event.url.startsWith(this.failureUrl)){
                console.log("cert failure");
                this.browserRef.close();
          }
      });
  }
}
