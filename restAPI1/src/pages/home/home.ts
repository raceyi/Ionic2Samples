import { Component } from '@angular/core';
import { NavController ,AlertController,Platform} from 'ionic-angular';
import { Http,Headers} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
serverInfo:string;
  constructor(
              private http:Http,private alertController:AlertController,
              public navCtrl: NavController,private platform:Platform) {

  }

  ionViewDidLoad(){
    let url;
    if(this.platform.is('cordova'))
        url="http://www.takit.biz:8080/getInfo?Info=server"; //android,ios
    else
        url="http://localhost:8100/getInfo?Info=server";      //ionic server
    this.get(url).then((response:any)=>{
        this.serverInfo="버전:"+response.version+ "이름:"+response.name;
    },err=>{
        this.serverInfo="서버정보를 알수 없습니다";
        console.log(JSON.stringify(err));
    });
  }

  get(url){
    console.log("url:"+url);
    return new Promise((resolve,reject)=>{
        //curl www.takit.biz:8080/getInfo?Info=server
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(url,headers).subscribe((res:any)=>{
            resolve(res.json());
        },(err)=>{
            reject(err);
        });
    });
  }

}