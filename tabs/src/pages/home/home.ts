import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import { NextTabs } from '../next-tabs/next-tabs';
import { NextPage } from '../next-page/next-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private app: App) {
    console.log("home-constructor");
  }

  ionViewDidLoad(){
    console.log("home-ionViewDidLoad");
  }

  ionViewWillEnter(){
    console.log("home-ionViewWillEnter");
  }

  ionViewDidEnter(){
    console.log("home-ionViewDidEnter");
  }

  ionViewWillLeave(){
    console.log("home-ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("home-ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("home-ionViewWillUnload");
  }

  ionViewCanEnter():boolean{
    console.log("home-ionViewCanEnter");
    return true;
  }

  ionViewCanLeave():boolean{
    console.log("home-ionViewCanLeave");
    return true;
  }

  moveToNextTabs(){
    this.app.getRootNav().push(NextTabs);
  }

  moveToNextPage(){
   // this.navCtrl.push(NextPage,,{title:"setRoot",number:1}); 
   this.app.getRootNav().push(NextPage),{title:"setRoot",number:1}; 
  }

  setRootToNextPage(){
    this.app.getRootNav().setRoot(NextPage,{title:"setRoot",number:1}); 
  }

  swipe(event){
    console.log("event.direction:"+event.direction);
    if(event.direction==4){   
      console.log("[home]direction-left");
    }else if(event.direction==2){
      console.log("[home]direction-right");
      this.navCtrl.parent.select(1);
    }     
  }
}
