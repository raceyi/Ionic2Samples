import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
    console.log("about-constructor");
  }

  ionViewDidLoad(){
    console.log("about-ionViewDidLoad");
  }

  ionViewWillEnter(){
    console.log("about-ionViewWillEnter");
  }

  ionViewDidEnter(){
    console.log("about-ionViewDidEnter");
  }

  ionViewWillLeave(){
    console.log("about-ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("about-ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("about-ionViewWillUnload");
  }

  ionViewCanEnter():boolean{
    console.log("about-ionViewCanEnter");
    return true;
  }

  ionViewCanLeave():boolean{
    console.log("about-ionViewCanLeave");
    return true;
  }

 swipe(event){
    console.log("event.direction:"+event.direction);
    if(event.direction==4){   
      console.log("[about]direction-left");
      this.navCtrl.parent.select(0);
    }else if(event.direction==2){
      console.log("[about]direction-right");
      this.navCtrl.parent.select(2);
    }     
  }
}
