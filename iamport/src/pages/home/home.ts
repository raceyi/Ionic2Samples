import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform,AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { BackgroundMode } from '@ionic-native/background-mode';

declare var window:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  IMP;
  browserRef;
  done:boolean=false;

  constructor(private platform: Platform,public navCtrl: NavController,
            private backgroundMode:BackgroundMode,
            private httpClient: HTTP,// It doesn't work under iOS. why? Hope it fixed soon. 
            private iab: InAppBrowser,private alertController:AlertController) {
      console.log("HomePage constructor");
      /*
      platform.ready().then(() => {
        this.backgroundMode.enable(); 
      });
      */
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter");
  }

    getAccessToken(){
    return new Promise((resolve,reject)=>{ 
      console.log("getAccessToken");
      let body={imp_key:"XXXXXXX", imp_secret:"XXXXXXXXXXXXXXXXXX"};
      this.httpClient.post("https://api.iamport.kr/users/getToken",body,{}).then((res:any)=>{              
          console.log("res:"+JSON.stringify(res));
          let data=JSON.parse(res.data);
          resolve(data.response.access_token);
      },(err)=>{
          console.log("err:"+JSON.stringify(err));
      });
    });
  }

  paymentCreditCardAgain(){
    console.log("paymentCreditCardAgain");
    this.getAccessToken().then((access_token:any)=>{
        console.log("access_token...:"+access_token);
        let headers = new HttpHeaders({Authorization:access_token});
        let body={customer_uid:"your-customer-uid", 
                  merchant_uid:"merchant-"+new Date().getTime(), 
                  amount:3300,
                  name:"iamport검증",
                  vat:300
                  //buyer_name:" ",
                  //buyer_email:" ",
                  //buyer_tel:" ",
                  //buyer_addr:" ",
                  //buyer_postcode:" ",
                  //card_quota:0, //할부 개월수  ,
                  //custom_data:"" 
                };
        this.httpClient.post("https://api.iamport.kr/subscribe/payments/again",body,{Authorization:access_token}).then((res)=>{              
            console.log("res:"+JSON.stringify(res));
            if(res.status==200){
                let data=JSON.parse(res.data);
                if(data.code==0)
                    console.log("success "+data.code);
                else
                    console.log("failure "+data.code+" message:"+data.message);                    
            }else{
                console.log("failure");
            }
        },(err)=>{
            console.log("err:"+JSON.stringify(err));
        });
    },(err)=>{

    });
  }

  registerCard(){
    let param={
            pay_method : 'card', // 'card'만 지원됩니다.
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '최초인증결제',
            amount : 0, // 빌링키 발급과 동시에 1,004원 결제승인을 시도합니다.
            customer_uid : 'your-customer-uid', //customer_uid 파라메터가 있어야 빌링키 발급을 시도합니다.
            buyer_email : 'iamport@siot.do',
            buyer_name : '아임포트',
            buyer_tel : '02-1234-1234'
        }

    const redirectUrl = "http://xxx.xxx.xxxx/oauth";//It brings about load error. Please change it with your server address
    let localfile;
    if(this.platform.is('android')){
        console.log("android");
        localfile='file:///android_asset/www/assets/iamport.html';
    }else if(this.platform.is('ios')){
        console.log("ios");
        localfile='assets/iamport.html';
    }
    this.browserRef=this.iab.create(localfile,"_blank");
    this.browserRef.on("loadstart").subscribe(function (e) {
        if (e.url.startsWith(redirectUrl)) {
            console.log("result:"+e.url);
            this.done=true;
            this.browserRef.close(); 
        }
    });
    this.browserRef.on("loaderror").subscribe((event)=>{
        console.log("loaderror:"+event.url);
        this.done=true; // Please change redirectUrl with your server address to prevent loaderror;
        this.browserRef.close();
    });
    this.browserRef.on("loadstop").subscribe((event)=>{
        console.log("loadstop event comes "+event.url);
        let url:string=event.url;
        if(url.endsWith('iamport.html')){ 
            const inlineCallback = `(rsp) => {
                if( rsp.success ) {
                    location.href = '${redirectUrl}?imp_success=true&imp_uid='+rsp.imp_uid+'&merchant_uid='+rsp.merchant_uid;
                } else {
                    location.href = '${redirectUrl}?imp_success=false&imp_uid='+rsp.imp_uid+'&merchant_uid='+rsp.merchant_uid+'&error_msg='+rsp.error_msg;
                }
            }`;
            const iamport_script = `IMP.request_pay(${JSON.stringify(param)}, ${inlineCallback})`;
            this.browserRef.executeScript({
                code : iamport_script
            });
        }
    });
    this.browserRef.on("exit").subscribe(
        (e) => {
            if(!this.done){
                let alert = this.alertController.create({
                    title: '사용자가 결제를 취소하였습니다.',
                    buttons: ['OK']
                });
                alert.present();
            }
        }
    );
  }
}
