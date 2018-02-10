import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PaymentPage} from '../payment/payment';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

    menu:any;
    amount:number;
    options:any;
    awsS3:string="https://s3.ap-northeast-2.amazonaws.com/takitkorea/";

  constructor(public navCtrl: NavController,public navParams: NavParams) {    
     this.menu=this.navParams.get("menu");
     if(this.menu.hasOwnProperty("options"))
        this.options=JSON.parse(this.menu.options);
     this.amount=this.menu.price;
     this.menu.count = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuDetailPage');
  }

  changeOption(option){
    console.log("flag:"+option.flag);
      if(option.flag===true){
          this.amount+=option.price*this.menu.count;
      }else{
          this.amount-=option.price*this.menu.count;
      }
  }

  increase(menu){
    menu.count++;
    this.amount = menu.price*menu.count;
    if(this.options){
        this.options.forEach(option => {
            if(option.flag===true){
                console.log("option.flag true");
                this.amount+=option.price*menu.count;
            }
        });
    }
  }

  decrease(menu){
      if(menu.count <= 1){
            menu.count=1;
      }else{
            menu.count--;
      }
      this.amount = menu.price*menu.count;
      if(this.options){
          this.options.forEach(option => {
              if(option.flag===true){
                  this.amount+=option.price*menu.count;
              }
          });
      }
  }

  order(){
    this.navCtrl.push(PaymentPage,
                      {class:"PaymentPage",amount:this.amount,menu:this.menu,options:this.options});  
  }
}
