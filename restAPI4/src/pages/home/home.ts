import { Component } from '@angular/core';
import { NavController ,AlertController} from 'ionic-angular';
import {ServerProvider} from '../../providers/server/server';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  serverInfo:String;

  constructor(private serverProvider:ServerProvider,
      public navCtrl: NavController,
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

  ionViewDidLoad(){
    console.log("HomePage ionViewDidLoad");
    this.serverProvider.get('/getInfo?Info=server').then((response:any)=>{
        console.log("get:"+JSON.stringify(response));
        this.serverInfo='버전:' +response.version+'이름:'+response.name;
    },(err)=>{
        this.serverInfo='서버정보를 알수 없습니다';
    });
  }
}
