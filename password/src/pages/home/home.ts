import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PasswordPage} from '../password/password';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  password:string="";

  constructor(public navCtrl: NavController,private ngZone:NgZone) {

  }

  callbackFunction = (_params) => {
     return new Promise((resolve, reject) => {
        console.log("callbackFunction:"+_params);
        for(var i=0;i<_params.length;i++){
          this.password+=_params[i].toString();
        }
        resolve();
     });
  }

  getPassword(){
      this.navCtrl.push(PasswordPage,{callback:this.callbackFunction});
  }
}
