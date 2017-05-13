import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VwVh } from './vw-vh';

@NgModule({
  declarations: [
    VwVh,
  ],
  imports: [
    IonicPageModule.forChild(VwVh),
  ],
  exports: [
    VwVh
  ]
})
export class VwVhModule {}
