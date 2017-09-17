import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ActionSheetCustomIconController} from 'ionic2-custom-icons';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private actionsheetCtrl:ActionSheetCustomIconController) {

  }

  ionViewDidLoad(){ 
    console.log("ionViewDidLoad");
    let actionSheet = this.actionsheetCtrl.create({
  title: 'My action sheet',
  buttons: [
    // Custom icon button
    {
      text: 'next',
      customIcon: {
        set: 'direction',
        name: 'next'
      },
      handler: () => {
        console.log('My custom icon clicked');
      }
    },
    // Default icon button
    {
      text: 'prev',
      icon: 'arrow-back',
      handler: () => {
        console.log('Ionic default icon set clicked');
      }
    }
  ]
});
// Show action sheet
actionSheet.present();

  }

}
