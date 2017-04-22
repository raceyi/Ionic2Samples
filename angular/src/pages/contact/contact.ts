import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  bold:boolean=false;
  italic:boolean=false;
  large:boolean=false;

  currentStyles = {
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-size':  '12px'
  };

  fontSize:string='x-large';

  constructor(public navCtrl: NavController) {

  }

setCurrentStyles() {
  // CSS styles: set per current state of component properties
  this.currentStyles = {
    'font-style':  this.italic ? 'italic' : 'normal',
    'font-weight': this.bold ? 'bold'   : 'normal',
    'font-size':   this.large ? '24px'   : '12px'
  };
  console.log(JSON.stringify(this.currentStyles));
}

  change(){
    console.log("fontSize:"+this.fontSize);  
  }
}
