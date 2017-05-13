import { Component } from '@angular/core';

import { Color } from '../color/color';
import { VwVh } from '../vw-vh/vw-vh';
import { Grid } from '../grid/grid';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Grid;
  tab2Root = VwVh;
  tab3Root = Color;

  constructor() {

  }
}
