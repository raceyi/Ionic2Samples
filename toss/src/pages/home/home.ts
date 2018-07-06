import { Component } from '@angular/core';
import { NavController ,AlertController,LoadingController,Platform} from 'ionic-angular';
import { WebIntent } from '@ionic-native/web-intent';
import { HttpClient,HttpHeaders } from '@angular/common/http';

declare var window:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController
                ,private webIntent: WebIntent
                ,public http: HttpClient
                ,private platform:Platform
                ,public alertCtrl:AlertController
                ,public loadingCtrl: LoadingController) {

  }

  launchToss(){
                //https://toss.im/transfer-web/linkgen-api/link
                let body={  "apiKey": "XXXXXXXXXXX",  // 토스로 부터 발급받은 key사용
                            "bankName": "농협",   
                            "bankAccountNo": "3012424363621",
                            "amount":10000,
                            "message": "토스이체"
                    }
                let progressBarLoader = this.loadingCtrl.create({
                            content: "진행중입니다.",
                            duration: 3000*1000
                        });
                progressBarLoader.present();
                this.http.post("https://toss.im/transfer-web/linkgen-api/link",body, {headers: new HttpHeaders({timeout:'${30000}'})}).subscribe((res:any)=>{
                    console.log("res:"+JSON.stringify(res));  
                    progressBarLoader.dismiss();
                    if(res.resultType=="SUCCESS"){
                        let link=res.success.link;
                        console.log("link:"+link);
                        if(this.platform.is('ios')){
                            window.open(link);
                        }else{ // android
                            const options = {
                                            action: this.webIntent.ACTION_VIEW,
                                            url: link
                                        };
                            this.webIntent.startActivity(options);
                        }
                    }else{
                        let alert = this.alertCtrl.create({
                                title: '토스연동에 실패했습니다.',
                                buttons: ['OK']
                            });
                        alert.present();
                    }
                },err=>{
                    progressBarLoader.dismiss();
                    let alert = this.alertCtrl.create({
                                title: '토스연동에 실패했습니다.',
                                subTitle: JSON.stringify(err),
                                buttons: ['OK']
                            });
                    alert.present();
                })
  }
}
