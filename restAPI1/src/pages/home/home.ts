import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  serverInfo:String;

  constructor(private http:Http, private alertController:AlertController,public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    let url="/getInfo?Info=server";
    this.get(url).then((response:any)=>{
        console.log("res:"+JSON.stringify(response));
        this.serverInfo='버전:'+response.version+' 이름:'+response.name;
    },(err)=>{
        this.serverInfo='서버정보를 알수 없습니다';
    });
  }
 
  get(url){
      return new Promise((resolve,reject)=>{
          this.http.get(url).subscribe((res:any)=>{
              resolve(res.json());
          },(err)=>{
              reject(err);
          });
      });
    }
}
