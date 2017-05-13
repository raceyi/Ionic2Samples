import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Color } from './color';

@NgModule({
  declarations: [
    Color,
  ],
  imports: [
    IonicPageModule.forChild(Color),
  ],
  exports: [
    Color
  ]
})
export class ColorModule {}
