import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Platform ,AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {StorageProvider} from '../../providers/storage/storage';

var gCardProvider;

/*
  Generated class for the CardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardProvider {
  done:boolean=false;
  browserRef;

  constructor(private platform:Platform,  
              private alertController:AlertController,              
              public storageProvider:StorageProvider,
              private httpClient: HttpClient,
              private iab: InAppBrowser) {
    console.log('Hello CardProvider Provider');
    gCardProvider=this;    
  }

///////////////////////////////////////////////////////////
   registerCard(){
    return new Promise((resolve,reject)=>{
    this.done=false;
    let customer_uid=this.storageProvider.email+'_'+new Date().getTime();
    console.log("customer_uid:"+customer_uid);
    let machant_uid='merchant_' + new Date().getTime();
    console.log("merchant_uid:"+machant_uid);
    let param={
            pay_method : 'card', // 'card'만 지원됩니다.
            merchant_uid : machant_uid, // 결제건별로 고유한 값을 지정합니다.
            name : '최초인증결제',
            amount : 10, // 빌링키 발급
            customer_uid : customer_uid, //customer_uid 파라메터가 있어야 빌링키 발급을 시도합니다. 한번 등록된 값을 가지고 결제를 수행함으로 고객의 등록카드별로 다른값을 사용하시기 바랍니다.
            buyer_email : 'iamport@siot.do',
            buyer_name : '아임포트',
            buyer_tel : '02-1234-1234'
        }

    const redirectUrl = "http://takit.biz:8000/oauth";//It brings about load error. Please change it with your server address
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
            if(gCardProvider.browserRef!=undefined){
                console.log("call gBrowserRef.close");
                gCardProvider.browserRef.close(); 
            }else
                console.log("this.browserRef is undefined");
            gCardProvider.done=true;
            console.log("result:"+e.url);
            if(e.url.includes("imp_success=true")){
                console.log("cert success");
                let strs=e.url.split("imp_uid=");
                let strs1=strs[1].split("&");
                console.log("strs[1]:"+strs[1]);
                console.log("strs1[1]:"+strs1[1]); 
                gCardProvider.getAccessToken().then((accessToken)=>{
                    // call get function to get card info
                    gCardProvider.getCardInfo(customer_uid,accessToken).then((res)=>{
                        console.log("getCardInfo returns "+JSON.stringify(param));
                        if(!res.hasOwnProperty("card_name"))
                            resolve({customer_uid:customer_uid,card_name:res.card_name});
                        else    
                            resolve({customer_uid:customer_uid,card_name:res.card_name,mask_no:res.mask_no});
                    },err=>{

                    });
                });
                // cancel card payment, 10 won
                gCardProvider.cancelPayment(strs1[0]); //imp_uid
            }else{
                console.log("cert failure");            
                reject('카드 등록에 실패하였습니다.');
            }
        }
    });
    this.browserRef.on("loaderror").subscribe((event)=>{
        console.log("loaderror:"+event.url);
        gCardProvider.done=true; // Please change redirectUrl with your server address to prevent loaderror;
        if(gCardProvider.browserRef!=undefined){
                console.log("call this.browserRef.close");
                gCardProvider.browserRef.close();
        }
    });
    this.browserRef.on("loadstop").subscribe((event)=>{
        console.log("loadstop event comes "+event.url);
        if(gCardProvider.done){ 
            if(gCardProvider.browserRef!=undefined){
                console.log("close browser");
                gCardProvider.browserRef.close();
            }else
                console.log("browserRef undefined");            
            return;
        }
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
            console.log("gCardProvider.done:"+gCardProvider.done)
            if(!gCardProvider.done){
                reject('카드 등록을 사용자가 취소하였습니다');
            }else{
                console.log("browser close");
            }
        }
    );
    });
  }

  getAccessToken(){
    return new Promise((resolve,reject)=>{ 
      let body={imp_key:"0878886247430095", imp_secret:"HUn9M5jY5HUUjKL0KrWT0SieKT5cEAnl"};
      this.httpClient.post("https://api.iamport.kr/users/getToken",body).subscribe((res:any)=>{              
          console.log("res:"+JSON.stringify(res));
          resolve(res.response.access_token);
      },(err)=>{
          console.log("err:"+JSON.stringify(err));
      });
    });
  }

  getCardInfo(customer_uid,accessToken){
    return new Promise((resolve,reject)=>{       
      let path= 'https://api.iamport.kr/subscribe/customers/'+customer_uid+'?_token='+accessToken;
      this.httpClient.get(path).subscribe((res:any)=>{
            console.log("res:"+JSON.stringify(res));
            resolve({card_name:res.response.card_name,mask_no:res.response.card_number});
      },err=>{
            reject();
      });
    });
  }

  addCard(){
     return new Promise((resolve,reject)=>{            
      this.registerCard().then((param:any)=>{
            console.log("registerCard return param:"+JSON.stringify(param));
            this.storageProvider.payInfo.push({info:{name:param.card_name ,mask_no:param.card_number,customer_uid: param.customer_uid}});        
            this.storageProvider.determinCardColor();        
            this.storageProvider.savePayInfo();
            console.log("addCard call resolve ");
            resolve({info:{name:param.card_name ,mask_no:param.card_number,customer_uid: param.customer_uid}});
        },(err)=>{
                    let alert = this.alertController.create({
                        title: JSON.stringify(err),
                        buttons: ['OK']
                    });
                    alert.present();
                    reject();
        });
     });
  }
  
  removeCard(i){
    this.storageProvider.payInfo.splice(i,1);
    this.storageProvider.savePayInfo();
  }

  cancelPayment(imp_uid){
    return new Promise((resolve,reject)=>{             
    this.getAccessToken().then((accessToken:string)=>{
        let headers= new HttpHeaders({'Authorization':accessToken});
        let path="https://api.iamport.kr/payments/cancel";
        this.httpClient.post(path,{imp_uid:imp_uid}, {headers: headers}).subscribe((res:any)=>{  
            console.log("cancelPayment:"+JSON.stringify(res));
            if(res.code==0)            
                resolve();
            else
                reject();
        },err=>{
            reject();
        });
    },err=>{
        reject();
    });
    });
  }

    payCard(customer_uid,amount,name){   
    return new Promise((resolve,reject)=>{             
        this.getAccessToken().then((accessToken:string)=>{
            let headers= new HttpHeaders({'Authorization':accessToken});
            let path="https://api.iamport.kr/subscribe/payments/again";
            let merchant_uid=customer_uid+'_'+new Date().getTime();
            let body={customer_uid:customer_uid, 
                    merchant_uid:merchant_uid, 
                    amount:amount,
                    name:name
                }
            this.httpClient.post(path,body, {headers: headers}).subscribe((res:any)=>{  
                console.log("payCard:"+JSON.stringify(res));
                if(res.code==0)            
                    resolve(res.response.apply_num);
                else
                    reject();
            },err=>{
                reject();
            });
        },err=>{
            reject();
        });
    });
    
    }
}
