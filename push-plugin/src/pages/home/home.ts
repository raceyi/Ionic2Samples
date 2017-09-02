import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushObject: PushObject;

  constructor(public navCtrl: NavController,private push: Push,private platform:Platform) {
     platform.ready().then(() => {
        this.push.hasPermission()
          .then((res: any) => {
            if (res.isEnabled) {
              console.log('We have permission to send push notifications');
            } else {
              //Please give user notification 
              console.log('We do not have permission to send push notifications');
            }
          });

          const options: PushOptions = {
            android: {
                senderID: '707840956057'
            },
            ios: {
                gcmSandbox: 'true', //development mode
                //gcmSandbox: 'false',//production mode
                alert: 'true',
                badge: true,
                sound: 'true'
            }
          };

          this.pushObject = this.push.init(options);

          this.pushObject.on('notification').subscribe((notification: any) =>{
              console.log('Received a notification', JSON.stringify(notification))
          });

          this.pushObject.on('registration').subscribe((registration: any) =>{
              console.log('Device registered', JSON.stringify(registration));
          });

          this.pushObject.on('error').subscribe(error => {
              console.error('Error with Push plugin', JSON.stringify(error))}
          );

    });
  }

}
