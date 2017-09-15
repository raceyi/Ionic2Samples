import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private translateService: TranslateService,
              private alertController:AlertController) {

  }

  ionViewDidEnter() {

      this.translateService.get('Hi').subscribe(
        hi => {
          let alert = this.alertController.create({
                            title: hi,
                            buttons: ['OK']
                        });
                        alert.present();
        });

  }
}
