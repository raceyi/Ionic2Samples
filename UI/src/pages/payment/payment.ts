import { Component,NgZone,ViewChild } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams ,Scroll} from 'ionic-angular';
import {StorageProvider} from '../../providers/storage/storage';
import {PasswordPage} from "../password/password";
import {ShopPage} from "../shop/shop";

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
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ngZone:NgZone,
              public storageProvider:StorageProvider) {

    this.totalAmount=this.navParams.get("amount");
    this.menu=this.navParams.get("menu");
    this.options=this.navParams.get("options");
    
    this.payAmount=this.totalAmount*0.97;      
    this.discount=this.totalAmount*0.03;
    console.log("discount:"+this.discount);

    this.storageProvider.payInfo.forEach(payment=>{
        this.currentCardClassesArray.push({
            'card-card':true,
            'scroll-col-latest':true,
            'card-unselect-border':true,
            'select-scroll-col-latest':false,
            'card-select-border':false
        });
    });
     
        let  views:ViewController[]; 
        views=this.navCtrl.getViews();
        views.forEach(view=>{
            console.log("view.name:"+view.name);   
            console.log("view.id "+view.id);
            console.log("view.instance "+typeof view.instance );
            if(view.getNavParams().get("class")!=undefined){
                console.log("class:"+view.getNavParams().get("class"));
                if(view.getNavParams().get("class")=="CashPasswordPage" ||
                    view.getNavParams().get("class")=="MenuPage")  {
                        this.navCtrl.removeView(view);
                    }             
            }
        })
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
            resolve();
      });
  }

  pay(){
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
}
