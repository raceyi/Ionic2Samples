import { Component , trigger, state, style, transition, animate, keyframes} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
      trigger('slide', [
      state('down', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)' // x,y,z
      })),
      state('up', style({
        opacity: 1,
        transform: 'translate3d(0, -50vh, 0)'
      })),
      transition('down => up', animate('1000ms')),
      transition('up => down', animate('1000ms'))
    ]),
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('1000ms linear'))
    ])
    ]  
})


export class HomePage {
  slideState:string="down"; 
  fadeState:string="visible";

  constructor(public navCtrl: NavController) {

  }

  hide(){
    console.log("hide");
    this.slideState='up';
    this.fadeState='invisible';
    setTimeout(() => {
         console.log("slide up");
       }, 1000);     
  }

  show(){
    console.log("show");
    this.slideState='down';  
    this.fadeState="visible";  
    setTimeout(() => {
         console.log("slide down");
       }, 1000);         
  }

}
