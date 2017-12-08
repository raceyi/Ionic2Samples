import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
//import { Http,Headers} from '@angular/http';  depreciated
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
            private http:HttpClient,private alertController:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

login(){
    console.log("username:"+this.username);
    console.log("password:"+this.password);  
    let body={username:this.username,password:this.password};
    //let url="http://www.takit.biz:8080/login"; // for android,ios  
    let url="http://localhost:8100/login"; // for ionic server
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post(url,body, {headers:headers}).subscribe((res:any)=>{               
                console.log("res:"+JSON.stringify(res));
                let response=res;            
                if(response.result=="success"){
                    this.navCtrl.setRoot(HomePage);
                }else{
                    let alert = this.alertController.create({
                                title: '로그인에 실패했습니다.',
                                buttons: ['OK']
                            });
                    alert.present();
                }  
            },(err)=>{
                console.log("post-err:"+JSON.stringify(err));
            });
  }
}
