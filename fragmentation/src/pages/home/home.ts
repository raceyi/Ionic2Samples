import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shoplist=[{takitId:"서울창업허브@치킨카레"},
            {takitId:"서울창업허브@도시락"},
            {takitId:"서울창업허브@김밥"}];

  constructor(public navCtrl: NavController) {

  }

}
