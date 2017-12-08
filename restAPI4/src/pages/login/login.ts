import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Http,Headers} from '@angular/http';
import {ServerProvider} from '../../providers/server/server';
import {HomePage} from '../home/home';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
username:string;
  password:string;

  usernamePlaceHolder:string="아이디를 입력해주세요";
  passwordPlaceHolder:string="비밀번호를 입력해주세요";

  constructor(private serverProvider:ServerProvider,
            public navCtrl: NavController, public navParams: NavParams,
            public events: Events,
            private alertController:AlertController) {
              
    events.subscribe('out-of-date', () => {
        let alert =this.alertController.create({
                        title:'앱을 업데이트 해주시기 바랍니다.',
                        buttons:['OK']
                    });  
             alert.present();     
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

login(){
    console.log("username:"+this.username);
    console.log("password:"+this.password);  
    this.serverProvider.login(this.username,this.password).then((res:any)=>{   
         if(res.result='success'){
             this.navCtrl.setRoot(HomePage);
         }else{
             let alert =this.alertController.create({
                        title:'로그인에 실패했습니다.',
                        buttons:['OK']
                    });  
             alert.present();       
         }
    },(err)=>{
          console.log('post-err:'+JSON.stringify(err));
          let alert =this.alertController.create({
              title:err,
              buttons:['OK']
          });  
          alert.present();

    });
  } 
 
}
