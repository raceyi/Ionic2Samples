import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  transactions=[];
  wholeTransactions;
  count:number=0;

  constructor(public navCtrl: NavController) {
    this.wholeTransactions=[{date:'2017-08-15',transactionType:"payment",transactionName:"구매", orderName:"아메리카노(1)", nowBalance:9182,amount:1000},
                  {date:'2017-08-13',transactionType:"cancel",transactionName:"구매취소", orderName:"카페라떼(1)", nowBalance:10182,amount:1000},
                  {date:'2017-08-13',transactionType:"payment",transactionName:"구매", orderName:"카페라떼(1)", nowBalance:9182,amount:1000},
                  {date:'2017-08-12',transactionType:"refund",transactionName:"캐쉬환불", orderName:"null", nowBalance:10182,amount:5000},
                  {date:'2017-08-9',transactionType:"cancel",transactionName:"구매취소", orderName:"아포카또(1)", nowBalance:5182,amount:1000},
                  {date:'2017-08-9',transactionType:"payment",transactionName:"구매", orderName:"아포카또(1)", nowBalance:4182,amount:1000},
                  {date:'2017-08-8',transactionType:"payment",transactionName:"구매", orderName:"에스프레소(1)", nowBalance:5182,amount:1000},
                  {date:'2017-08-7',transactionType:"payment",transactionName:"구매", orderName:"카라멜마끼아또(1)", nowBalance:6182,amount:1000},
                  {date:'2017-08-6',transactionType:"cancel",transactionName:"구매취소", orderName:"아메리카노(1)", nowBalance:7182,amount:1000},
                  {date:'2017-08-6',transactionType:"payment",transactionName:"구매", orderName:"아메리카노(1)", nowBalance:6182,amount:1000},
                  {date:'2017-08-5',transactionType:"payment",transactionName:"구매", orderName:"카페라떼(1)", nowBalance:7182,amount:1000},
                  {date:'2017-08-4',transactionType:"payment",transactionName:"구매", orderName:"카라멜마끼아또(1)", nowBalance:8182,amount:1000},
                  {date:'2017-08-2',transactionType:"deposit",transactionName:"캐쉬충전", orderName:"null", nowBalance:9182,amount:5000}];

    for(var i=0;i<5;i++){
        this.transactions.push(this.wholeTransactions[i]);
        this.addStyle(this.transactions[i]);   
    }
    this.count=5;
  }

  addStyle(tr:any){
    if(tr.transactionType=="deposit" ||tr.transactionType=="cancel" ){
        tr.borderStyle={"border-image": "url('assets/img/blue_stick.png') 12 round",
                        "border-image-outset": "0px 100px 0px 0px",
                        "border-image-width": "8px"}
    }else{
        tr.borderStyle={"border-image": "url('assets/img/red_stick.png') 12 round",
                        "border-image-outset": "0px 100px 0px 0px",
                        "border-image-width": "8px"}
    }
  } 
  
  doInfinite(infiniteScroll){
      console.log("doInfinite");
      if(this.wholeTransactions.length-this.transactions.length<5){
            this.updateTransactions(this.wholeTransactions.length-this.transactions.length);
            infiniteScroll.enable(false);
        }else{
            this.updateTransactions(5);
            infiniteScroll.complete();
        }
  }
  
  updateTransactions(num){
      for(var i=0;i<num;i++){
        let tr=this.wholeTransactions[this.count+i];
        this.addStyle(tr);
        this.transactions.push(tr);
      }
      this.count=this.count+num;  
  }
  
}
