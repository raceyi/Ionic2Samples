import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShopPage} from "../shop/shop";

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  passwordInput=[' ',' ',' ',' ',' ',' '];
  password=[' ',' ',' ',' ',' ',' '];
  cursor:number=0;

  confirmInProgress=false;

  title:string="비밀번호입력";
  callback;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.callback = this.navParams.get("callback");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

buttonPressed(val:number){
        console.log("cursor:"+this.cursor+" val:"+val);
        if(val==-1 ){
            console.log("val is -1");
            this.cursor = (this.cursor>=1) ? (this.cursor-1 ): this.cursor;
            this.password[this.cursor]=' ';
            this.passwordInput[this.cursor]=' ';
        }else if(val==-10){
            console.log("val is -10");
            for(var i=0;i<6;i++){
                this.password[i]=' ';
                this.passwordInput[i]=' ';
            }
            this.cursor = 0;
        }else if(this.cursor<6){
            if(this.cursor!=0){
              this.password[this.cursor-1]='*';
            }
            if(this.cursor==5){
                this.passwordInput[this.cursor]=val.toString();
                this.password[this.cursor++]='*';
            }else{
                this.passwordInput[this.cursor]=val.toString(); 
                this.password[this.cursor++]=val.toString();
            }
            console.log("this.password:"+this.passwordInput);
        }
  }

  cancel(){
    console.log("cancel");
    this.navCtrl.pop();
  }

  back(){
    this.navCtrl.pop();
  }

  confirm(){
    let password="";
        password=password.concat(this.passwordInput[0],this.passwordInput[1],this.passwordInput[2],
                    this.passwordInput[3],this.passwordInput[4],this.passwordInput[5]);
      this.callback(password).then(()=>{
            this.navCtrl.pop();
      },err=>{
            this.navCtrl.pop();          
      });     
  }

}
