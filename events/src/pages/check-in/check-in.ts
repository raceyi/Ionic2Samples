import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the CheckInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-in',
  templateUrl: 'check-in.html',
})
export class CheckInPage {
  userName:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
  }

  checkIn(){
    let now:Date=new Date();
    this.events.publish('user:check-in', this.userName, now.getHours()+":"+now.getMinutes()+":"+now.getSeconds());
    this.userName="";
  }

  cancel(){
    this.userName="";
  }

}
