import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckInPage } from './check-in';

@NgModule({
  declarations: [
    CheckInPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckInPage),
  ],
})
export class CheckInPageModule {}
