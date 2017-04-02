import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { NextTabsPage } from '../next-tabs/next-tabs';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username:string;
  password:string;

  usernamePlaceHolder:string="아이디를 입력해주세요";
  passwordPlaceHolder:string="비밀번호를 입력해주세요";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(){
    //this.navCtrl.setRoot(TabsPage);
    this.navCtrl.setRoot(NextTabsPage);
  } 

}

