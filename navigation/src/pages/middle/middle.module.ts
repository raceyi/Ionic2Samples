import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiddlePage } from './middle';

@NgModule({
  declarations: [
    MiddlePage,
  ],
  imports: [
    IonicPageModule.forChild(MiddlePage),
  ],
})
export class MiddlePageModule {}
