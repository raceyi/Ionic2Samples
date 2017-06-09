import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import {ServerProvider} from '../../providers/server-provider';

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

  constructor(private serverProvider:ServerProvider,
              private http:Http, private alertController:AlertController, 
              public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(){
    console.log("username:"+this.username);
    console.log("password:"+this.password);  
    this.serverProvider.login(this.username,this.password).then((res:any)=>{   
         if(res.result=='success'){
             this.navCtrl.setRoot(TabsPage);
         }else{
             let alert =this.alertController.create({
                        title:'로그인에 실패했습니다.',
                        buttons:['OK']
                    });  
         }
    },(err)=>{
          console.log('post-err:'+JSON.stringify(err));
          let alert =this.alertController.create({
              title:err,
              buttons:['OK']
          });  

    });
  } 

}

