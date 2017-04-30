import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {
      console.log("contact-constructor");
  }

  ionViewDidLoad(){
    console.log("contact-ionViewDidLoad");
  }

  ionViewWillEnter(){
    console.log("contact-ionViewWillEnter");
  }

  ionViewDidEnter(){
    console.log("contact-ionViewDidEnter");
  }

  ionViewWillLeave(){
    console.log("contact-ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("contact-ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("contact-ionViewWillUnload");
  }

  ionViewCanEnter():boolean{
    console.log("contact-ionViewCanEnter");
    return true;
  }

  ionViewCanLeave():boolean{
    console.log("contact-ionViewCanLeave");
    return true;
  }

   swipe(event){
    console.log("event.direction:"+event.direction);
    if(event.direction==4){   
      console.log("[contact]direction-left");
      this.navCtrl.parent.select(1);
    }else if(event.direction==2){
      console.log("[contact]direction-right");
    }     
  }
}
