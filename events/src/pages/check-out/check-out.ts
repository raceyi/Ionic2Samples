import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the CheckOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-out',
  templateUrl: 'check-out.html',
})
export class CheckOutPage {
  userList=[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events: Events) {

    console.log('constructor CheckOutPage');            
    events.subscribe('user:check-in', (user, time) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log('Welcome', user, 'at', time);
    this.userList.push({user:user,checkin:time});
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOutPage');
  }

  userSelected(user){
    console.log("userSelected");
    function equal(element){
          return (element.user==user.user && element.checkin==user.checkin);
    }
    let index=this.userList.findIndex(equal);
    console.log("index:"+index);
    console.log("userList:"+JSON.stringify(this.userList));
    this.userList.splice(index,1);
    console.log("...userList:"+JSON.stringify(this.userList));
    this.events.publish('user:check-out', user.user, user.checkin); 
  }


}
