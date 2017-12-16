import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform,AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

declare var window:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  IMP;
  browserRef;
  done:boolean=false;

  constructor(private platform: Platform,public navCtrl: NavController,private httpClient: HTTP,// It doesn't work under iOS. why? Hope it fixed soon. 
    private iab: InAppBrowser,private alertController:AlertController) {
      console.log("HomePage constructor");
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter");
  }

  getAccessToken(){
    return new Promise((resolve,reject)=>{ 
      let body={imp_key:"xxxxxxxxxxxxxx", imp_secret:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"};
      this.httpClient.post("https://api.iamport.kr/users/getToken",body,{}).then((res:any)=>{              
          console.log("res:"+JSON.stringify(res));
          resolve(res.response.access_token);
      },(err)=>{
          console.log("err:"+JSON.stringify(err));
      });
    });
  }

  paymentCreditCardAgain(){
    this.getAccessToken().then((access_token:any)=>{
        console.log("access_token...:"+access_token);
        let body={customer_uid:"your-customer-unique-id", 
                  merchant_uid:'merchant_' + new Date().getTime(),  // 결제건별로 고유한 값을 지정합니다.
                  amount:3300,
                  name:"iamport검증",
                  vat:300 // 부가세 
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
            // "res:{"code":0,"message":null,
            //       "response":{"amount":3300,"apply_num":"62748487","bank_code":null,"bank_name":null,"buyer_addr":null,"buyer_email":null,
            //       "buyer_name":null,"buyer_postcode":null,"buyer_tel":null,"cancel_amount":0,"cancel_history":[],"cancel_reason":null,"cancel_receipt_urls":[],
            //       "cancelled_at":0,"card_code":"361","card_name":"BC카드","card_quota":0,"cash_receipt_issued":false,"currency":"KRW","custom_data":null,"escrow":false,
            //       "fail_reason":null,"failed_at":0,"imp_uid":"xxxxxxxx","merchant_uid":"xxxxxxxxx","name":"iamport검증","paid_at":1510653939,"pay_method":"card",
            //       "pg_provider":"danal_tpay","pg_tid":"201711141905372583512400","receipt_url":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            //       "status":"paid","user_agent":"sorry_not_supported_anymore","vbank_code":null,"vbank_date":0,"vbank_holder":null,"vbank_name":null,"vbank_num":null}}"
        },(err)=>{
            console.log("err:"+JSON.stringify(err));
        });
    },(err)=>{

    });
  }

  registerCard(){
    let param={
            pay_method : 'card', // 'card'만 지원됩니다.
            merchant_uid : 'merchant_' + new Date().getTime(), // 결제건별로 고유한 값을 지정합니다.
            name : '최초인증결제',
            amount : 0, // 빌링키 발급
            customer_uid : 'your-customer-unique-id', //customer_uid 파라메터가 있어야 빌링키 발급을 시도합니다. 한번 등록된 값을 가지고 결제를 수행함으로 고객의 등록카드별로 다른값을 사용하시기 바랍니다.
            buyer_email : 'iamport@siot.do',
            buyer_name : '아임포트',
            buyer_tel : '02-1234-1234'
        }

    const redirectUrl = "http://xxx.xxx.xxx.xxx/iamportResult";//It brings about load error. Please change it with your server address
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
