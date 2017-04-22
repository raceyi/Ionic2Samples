import { Component } from '@angular/core';

import { Structural } from '../structural/structural';
import { NgClass } from '../ng-class/ng-class';
import { NgStyle } from '../ng-style/ng-style';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Structural;
  tab2Root = NgStyle;
  tab3Root = NgClass;

  constructor() {

  }
}
