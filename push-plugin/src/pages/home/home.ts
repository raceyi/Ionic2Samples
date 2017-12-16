import { Component ,NgZone} from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {Clipboard} from '@ionic-native/clipboard';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushObject: PushObject;
  registrationId;

  constructor(public navCtrl: NavController,private push: Push,
        private platform:Platform,private ngZone:NgZone,
        private backgroundMode:BackgroundMode,
        private clipboard:Clipboard) {
     platform.ready().then(() => {

        this.backgroundMode.enable(); 

        this.backgroundMode.on("activate").subscribe(()=>{
            console.log("background mode has been activated");
        });

        this.backgroundMode.on("deactivate").subscribe(()=> {
            console.log("background mode has been deactivated");
        });
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
                senderID: 'xxxxxxxxxxxx', //App's senderID. Please check your firebase configuration
                sound: 'true',
                clearBadge: true
            },
            ios: {
                fcmSandbox: 'true', // 'true': development, 'false':production
                alert: 'true',
                badge: 'true',
                sound: 'true',
                clearBadge: true
            }
          };

          this.pushObject = this.push.init(options);

          this.pushObject.on('notification').subscribe((notification: any) =>{
              console.log('Received a notification'+ JSON.stringify(notification));
          });

          this.pushObject.on('registration').subscribe((registration: any) =>{
              console.log('Device registered', JSON.stringify(registration));
              console.log("registrationId:"+registration.registrationId);
              this.ngZone.run(()=>{
                  this.registrationId=registration.registrationId;
              });
              this.clipboard.copy(this.registrationId);
          });

          this.pushObject.on('error').subscribe(error => {
              console.error('Error with Push plugin', JSON.stringify(error))}
          );

    });
  }

}
