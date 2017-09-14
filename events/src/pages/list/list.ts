import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
   userList=[];

  constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        public events: Events) {
        console.log('constructor ListPage');               
        events.subscribe('user:check-in', (user, time) => {
          // user and time are the same arguments passed in `events.publish(user, time)`
          console.log('Welcome', user, 'at', time);
          this.userList.push({user:user,checkin:time});
        });
        events.subscribe('user:check-out', (user, time) => {
          // user and time are the same arguments passed in `events.publish(user, time)`
          let item={user:user,checkin:time};
          function equal(element){
              return (element.user==item.user && element.checkin==item.checkin);
          }
          let index=this.userList.findIndex(equal);
          this.userList.splice(index,1);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
