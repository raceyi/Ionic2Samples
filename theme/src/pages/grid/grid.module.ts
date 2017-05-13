import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Grid } from './grid';

@NgModule({
  declarations: [
    Grid,
  ],
  imports: [
    IonicPageModule.forChild(Grid),
  ],
  exports: [
    Grid
  ]
})
export class GridModule {}
