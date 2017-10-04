import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AppDataProvider} from '../../providers/app-data/app-data';

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

  constructor(public navCtrl: NavController,public appDataProvider:AppDataProvider) {

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

  fontSize:string='x-large';
  change(){
    console.log("fontSize:"+this.fontSize);  
  }

  hiddenFlag:boolean=false;
  hideClick(){
    this.hiddenFlag=true;
  }
  showClick(){
    this.hiddenFlag=false;
  }

  boldClass:boolean=false;
  italicClass:boolean=false;
  largeClass:boolean=false;

  currentClasses: {};

  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses =  {
      bold:   this.boldClass,
      italic: this.italicClass,
      large:  this.largeClass
    };
  }
}
