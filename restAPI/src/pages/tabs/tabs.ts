import { Component } from '@angular/core';
import { AlertController,Events } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public events: Events,private alertController:AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.events.subscribe('out-of-date',()=>{
        let alert = this.alertController.create({
                                title: '앱을 업데이트 해주시기 바랍니다.',
                                buttons: ['OK']
                            });
        alert.present();
    })
  }
}
