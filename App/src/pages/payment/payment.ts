import { Component,NgZone,ViewChild } from '@angular/core';
import { IonicPage, NavController,ViewController,AlertController, NavParams ,Scroll} from 'ionic-angular';
import {StorageProvider} from '../../providers/storage/storage';
import {CardProvider} from '../../providers/card/card';
import {PasswordPage} from "../password/password";
import {ShopPage} from "../shop/shop";
import { SMS } from '@ionic-native/sms';
import { EmailComposer } from '@ionic-native/email-composer';
declare var cordova:any;

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  inStoreColor="#6441a5";
  takeoutColor="#bdbdbd";
  deliveryColor="#bdbdbd";

  paymentSelection="cash";
  cardIndex=-1;
  currentCashClasses={
    'cash-card':true,  
    'card-unselect-border':false,
    'scroll-col-latest':false,
    'cash-select-border':true,
    'select-scroll-col-latest':true
  };

  currentCardClassesArray=[];

  menu;
  options;

  discount;

  totalAmount=0;
  payAmount=0;

  takeout=0; //takeout:1 , takeout:2(delivery)
  deliveryAddress;
  orderDetail;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ngZone:NgZone,
              private alertCtrl:AlertController, 
              private cardProvider:CardProvider, 
              private sms: SMS,   
              private emailComposer: EmailComposer,                       
              public storageProvider:StorageProvider) {

    this.totalAmount=this.navParams.get("amount");
    this.menu=this.navParams.get("menu");
    this.options=this.navParams.get("options");
    this.orderDetail=this.navParams.get("orderDetail");
    this.payAmount=this.totalAmount*0.97;      
    this.discount=this.totalAmount*0.03;
    console.log("discount:"+this.discount);
   
    console.log("...payInfo: "+ JSON.stringify(this.storageProvider.payInfo));
    this.storageProvider.payInfo.forEach(payment=>{
        this.currentCardClassesArray.push({
            'card-card':true,
            'scroll-col-latest':true,
            'card-unselect-border':true,
            'select-scroll-col-latest':false,
            'card-select-border':false
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  selectInStore(){
      this.inStoreColor="#6441a5";
      this.takeoutColor="#bdbdbd";
      this.deliveryColor="#bdbdbd";
      this.takeout=0; //takeout:1 , takeout:2(delivery)
      this.payAmount=this.totalAmount*0.97;  
      this.discount=this.totalAmount*0.03;          
  }

  selectTakeOut(){
      this.inStoreColor="#bdbdbd";
      this.takeoutColor="#6441a5";
      this.deliveryColor="#bdbdbd";
      this.takeout=1; //takeout:1 , takeout:2(delivery)
      this.payAmount=this.totalAmount*0.97;
      this.discount=this.totalAmount*0.03;      
  }

  selectDelivery(){
      this.inStoreColor="#bdbdbd";
      this.takeoutColor="#bdbdbd";
      this.deliveryColor="#6441a5";
      this.takeout=2; //takeout:1 , takeout:2(delivery)
      this.payAmount=this.totalAmount*0.97+this.storageProvider.deliveryFee;
      this.discount=this.totalAmount*0.03;
  }

 myCallbackPasswordFunction = (_params) => {
      return new Promise((resolve, reject) => {
          this.storageProvider.readPassword().then((password)=>{
              console.log("password");
            if( password==_params){
                this.cardProvider.payCard(this.storageProvider.payInfo[this.cardIndex].info.customer_uid,this.payAmount,"앱주문").then((approval)=>{
                    let  views:ViewController[]; 
                    views=this.navCtrl.getViews();            
                    views.forEach(view=>{
                        if(view.getNavParams().get("class")!=undefined){
                            console.log("class:"+view.getNavParams().get("class"));
                            if(view.getNavParams().get("class")=="MenuPage"||
                            view.getNavParams().get("class")=="PaymentPage")  {
                                    console.log("remove "+view.getNavParams().get("class"));
                                    this.navCtrl.removeView(view);
                            }             
                        }
                    })
                    //문자 보내기, email보내기 
                    /*
                    this.sms.hasPermission().then((available)=>{
                            console.log("sms.hasPermission:"+available);
                    },err=>{

                    });
                    */
                    this.orderDetail+=" 승인번호:"+approval;
                    this.sms.send(this.storageProvider.phone, this.orderDetail).then((value)=>{

                    },err=>{
                        let alert = this.alertCtrl.create({
                            title: '문자전송에 실패했습니다. 상점에 연락바랍니다.',
                            buttons: ['OK']
                        });
                            alert.present();       
                        
                    });

                    cordova.plugins.email.isAvailable((available)=>{
                        console.log("!!!! hasAccount:"+available);
                        if(available) {
                            //Now we know we can send
                            cordova.plugins.email.open({
                                to:      this.storageProvider.email,
                                subject: '주문정보',
                                body:    this.orderDetail
                            });
                        }else{
                            let alert = this.alertCtrl.create({
                                title: '이메일 전송에 실패했습니다.',
                                buttons: ['OK']
                            });
                                alert.present();       
                            
                        }
                    });
                    resolve();
                })
            }else{
                        let alert = this.alertCtrl.create({
                            title: '결제비밀번호 오류입니다.',
                            buttons: ['OK']
                        });
                            alert.present();       
                    reject();
            }
          });
      });
  }

  pay(){
    if(this.cardIndex==-1){
        let alert = this.alertCtrl.create({
            title: '결제카드를 선택해주시기 바랍니다.',
            buttons: ['OK']
        });
            alert.present();       
            return;
    }

    if(this.storageProvider.payInfo[this.cardIndex].info.customer_uid==undefined 
        || this.storageProvider.payInfo[this.cardIndex].info.customer_uid.length==0){
      let alert = this.alertCtrl.create({
            title: '등록 카드정보에 오류가 있습니다.',
            buttons: ['OK']
        });
            alert.present();       
            return;            
    }
    this.navCtrl.push(PasswordPage, {class:"PasswordPage",callback: this.myCallbackPasswordFunction});
  }

 
  cardSelect(i){
      if(this.cardIndex>=0){
            this.currentCardClassesArray[this.cardIndex]={
                'card-card':true,
                'scroll-col-latest':true,
                'card-unselect-border':true,
                'select-scroll-col-latest':false,
                'card-select-border':false
            }; 
      }

      this.currentCashClasses={
            'cash-card':true,  
            'card-unselect-border':true,
            'scroll-col-latest':true,
            'cash-select-border':false,
            'select-scroll-col-latest':false
        };

      this.currentCardClassesArray[i]={
        'card-card':true,
        'scroll-col-latest':false,
        'card-unselect-border':false,
        'select-scroll-col-latest':true,
        'card-select-border':true
      }; 
      this.cardIndex=i;         
  }

  back(){
      this.navCtrl.pop();
  }

  removeCard(i){
    let alert = this.alertCtrl.create({
        title: this.storageProvider.payInfo[i].info.name+"를 삭제하시겠습니까?",
              buttons: [
        {
          text: '네',
          handler: () => {
            console.log('Agree clicked');
            this.ngZone.run(()=>{
                this.cardProvider.removeCard(i);
                this.currentCardClassesArray.splice(i,1);
            });
          }
        },
        {
          text: '아니오',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    alert.present();
  }

  addCard(){
    console.log("currentCardClassesArray:"+JSON.stringify(this.currentCardClassesArray));
        this.cardProvider.addCard().then((res)=>{
            console.log("...addCard done... ");
            this.ngZone.run(()=>{
                this.currentCardClassesArray.push({
                    'card-card':true,
                    'scroll-col-latest':true,
                    'card-unselect-border':true,
                    'select-scroll-col-latest':false,
                    'card-select-border':false
                });
            });            
                console.log("...currentCardClassesArray:"+JSON.stringify(this.currentCardClassesArray));
        },err=>{

        });
  }
}
