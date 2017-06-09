import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ServerProvider} from '../../providers/server-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  serverInfo:String;
  constructor(private serverProvider:ServerProvider,public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.serverProvider.get('/getInfo?Info=server').then((response:any)=>{
        this.serverInfo='버전:' +response.version+'이름:'+response.name;
    },(err)=>{
        this.serverInfo='서버정보를 알수 없습니다';
    });
  }

}
