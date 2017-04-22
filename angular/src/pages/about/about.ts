import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  bold:boolean=false;
  italic:boolean=false;
  large:boolean=false;

currentClasses: {};

constructor(public navCtrl: NavController) {

}

setCurrentClasses() {
  // CSS classes: added/removed per current state of component properties
  this.currentClasses =  {
    bold:   this.bold,
    italic: this.italic,
    large:  this.large
  };
}
  

}
