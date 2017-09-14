import { Component } from '@angular/core';

import { CheckInPage } from '../check-in/check-in';
import { CheckOutPage } from '../check-out/check-out';
import { ListPage } from '../list/list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CheckInPage;
  tab2Root = CheckOutPage;
  tab3Root = ListPage;

  constructor() {

  }
}
