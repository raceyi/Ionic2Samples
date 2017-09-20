import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Http,Headers} from '@angular/http';
import {ServerProvider} from '../../providers/server/server';
import {HomePage} from '../home/home';

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
            private http:Http,private alertController:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

login(){
    console.log("username:"+this.username);
    console.log("password:"+this.password);  
    let body={username:this.username,password:this.password};
    let url="/login";
    this.serverProvider.post(url,body).then((res:any)=>{
         if(res.result='success'){
             this.navCtrl.setRoot(HomePage);
         }else{
             let alert =this.alertController.create({
                        title:'로그인에 실패했습니다.',
                        buttons:['OK']
                    });  
         }
    },(err)=>{
          console.log('post-err:'+JSON.stringify(err));
          let alert =this.alertController.create({
              title:'서버와 통신에 문제가 있습니다.',
              buttons:['OK']
          });  

    });
}
 
}
