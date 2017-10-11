import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    menu:any;
    amount:number;
    options:any;
    dirPath:string="assets/";

  constructor(public navCtrl: NavController) {
     this.menu={"menuName":"오채참치비빔밥","explanation":"","price":3500,'imagePath':'bibimbob.png','description':'다섯가지 신선한 채소 비빔밥'} ;
     this.options=JSON.parse("[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]");
    
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
    this.options.forEach(option => {
        if(option.flag===true){
            console.log("option.flag true");
            this.amount+=option.price*menu.count;
        }
    });
  }

  decrease(menu){
      if(menu.count <= 1){
            menu.count=1;
      }else{
            menu.count--;
      }
      this.amount = menu.price*menu.count;
      this.options.forEach(option => {
          if(option.flag===true){
              this.amount+=option.price*menu.count;
          }
      });
  }
}
