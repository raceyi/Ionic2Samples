import { Component } from '@angular/core';
import { NavController ,AlertController} from 'ionic-angular';
import { Http,Headers} from '@angular/http';
import {ServerProvider} from '../../providers/server-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  serverInfo:string;
  constructor(private serverProvider:ServerProvider,
              private http:Http,private alertController:AlertController,
              public navCtrl: NavController) {

  }

  ionViewDidLoad(){
      this.serverProvider.get("http://www.takit.biz:8080/getInfo?Info=server").then((response:any)=>{
            console.log("res:"+JSON.stringify(response));
            this.serverInfo="버전:"+response.version+ "이름:"+response.name;

      },(err)=>{
            this.serverInfo="서버정보를 알수 없습니다";
      })
  }
/*
  get(url){
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
  */
}
