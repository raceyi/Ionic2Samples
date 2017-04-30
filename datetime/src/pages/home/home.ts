import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myDate:string;

  constructor(public navCtrl: NavController) {
    var d = new Date();
    var mm = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1); // getMonth() is zero-based
    var dd  = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    var hh = d.getHours() <10? "0"+d.getHours(): d.getHours();
    var min = d.getMinutes()<10? "0"+d.getMinutes():d.getMinutes(); 
    var dString=d.getFullYear()+'-'+(mm)+'-'+dd+'T'+hh+":"+min+moment().format("Z");
 
    //var dString=d.toISOString(); // UTC time 
    this.myDate=dString;
  }

  checkInput(){
    console.log(this.myDate);
    var date=new Date(this.myDate);
    console.log("month:"+date.getMonth()+" date:"+date.getDate()+" hour:"+date.getHours());
  }

}
