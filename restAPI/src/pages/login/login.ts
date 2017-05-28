import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Events } from 'ionic-angular';
import { Http,Headers} from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import {ServerProvider} from '../../providers/server-provider';
import {StorageProvider} from '../../providers/storage-provider';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {

  username:string;
  password:string;

  usernamePlaceHolder:string="아이디를 입력해주세요";
  passwordPlaceHolder:string="비밀번호를 입력해주세요";

  constructor(private serverProvider:ServerProvider,
              private storageProvider:StorageProvider,
              private platform: Platform,
              public events: Events,
               private http:Http,private alertController:AlertController,
               public navCtrl: NavController, public navParams: NavParams) {       
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.events.subscribe('out-of-date',()=>{
        console.log("out-of-date comes in login Page");
        let alert = this.alertController.create({
                                title: '앱을 업데이트 해주시기 바랍니다.',
                                buttons: ['OK']
                            });
        alert.present();
    })
  }

  login(){
    console.log("username:"+this.username);
    console.log("password:"+this.password);  
    this.serverProvider.login(this.username,this.password).then((res:any)=>{               
                if(res.result=="success"){
                    this.navCtrl.setRoot(TabsPage);
                }else{
                    let alert = this.alertController.create({
                                title: '로그인에 실패했습니다.',
                                buttons: ['OK']
                            });
                    alert.present();
                }  
            },(err)=>{
                console.log("post-err:"+JSON.stringify(err));
                let alert = this.alertController.create({
                                title: '로그인에 실패했습니다.',
                                buttons: ['OK']
                            });
                    alert.present();
            });;
  }
/*
  //curl --data-urlencode "username=Ionic2" --data-urlencode "password=123456" www.takit.biz:8080/login
login(){
    console.log("username:"+this.username);
    console.log("password:"+this.password);  

    let body={username:this.username,password:this.password};
    let url="http://localhost:8100/login";

    this.serverProvider.post(url,body).then((res:any)=>{               
                if(res.result=="success"){
                    // save id and password
                    this.storageProvider.saveLoginInfo(this.username,this.password);
                    this.navCtrl.setRoot(TabsPage);
                }else{
                    let alert = this.alertController.create({
                                title: '로그인에 실패했습니다.',
                                buttons: ['OK']
                            });
                    alert.present();
                }  
            },(err)=>{
                console.log("post-err:"+JSON.stringify(err));
                let alert = this.alertController.create({
                                title: '로그인에 실패했습니다.',
                                buttons: ['OK']
                            });
                    alert.present();
            });
}
*/

/*
  login(){
    console.log("username:"+this.username);
    console.log("password:"+this.password);  

    let body=JSON.stringify({username:this.username,password:this.password});
    //let url="http://www.takit.biz:8080/login";
    let url="http://localhost:8100/login";

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(url,body, {headers:headers}).subscribe((res:any)=>{               
                console.log("res:"+JSON.stringify(res.json()));
                let response=res.json();            
                if(response.result=="success"){
                    this.navCtrl.setRoot(TabsPage);
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
*/  
}
