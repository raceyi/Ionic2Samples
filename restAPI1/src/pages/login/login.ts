import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import { TabsPage } from '../tabs/tabs';

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

  constructor(private http:Http, private alertController:AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(){
    console.log("username:"+this.username);
    console.log("password:"+this.password);  
    let body=JSON.stringify({username:this.username,password:this.password});
    let url="/login";

    let headers=new Headers();
    headers.append('Content-Type','application/json');

    this.http.post(url,body,{headers:headers}).subscribe((res:any)=>{
            console.log("res:"+JSON.stringify(res.json()));
            let response=res.json();
            if(response.result=='success'){
                    this.navCtrl.setRoot(TabsPage);
            }else{
                let alert = this.alertController.create({
                            title:'로그인에 실패했습니다',
                            buttons:['OK']
                          });
                alert.present();
            }
    },(err)=>{
          console.log('post-err:'+JSON.stringify(err));
    });    

  } 

}

