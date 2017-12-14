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
            this.pushObject.setApplicationIconBadgeNumber(0).then(()=>{
              //It is the same as this.pushObject.clearAllNotifications();

              },err=>{

              });            
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

          console.log("android ...");

          const options: PushOptions = {
            android: {
                senderID: 'XXXXXXXX' 
            },
            ios: {
                fcmSandbox: 'true', // 'true': development, 'false':production
                alert: 'true',
                badge: 'true',
                sound: 'true'
            }
          };

          this.pushObject = this.push.init(options);

          this.pushObject.on('notification').subscribe((notification: any) =>{
              console.log('Received a notification', JSON.stringify(notification))
              this.pushObject.getApplicationIconBadgeNumber().then(number=>{
                console.log("badge count:"+number);
              });
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
