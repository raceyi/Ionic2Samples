import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import {ModalPage} from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public modalCtrl: ModalController) {
  }

  openDialog(){
      let profileModal = this.modalCtrl.create(ModalPage, { userId: 8675309 });
      profileModal.present();
  }

}
