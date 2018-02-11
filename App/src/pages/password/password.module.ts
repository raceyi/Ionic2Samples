import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordPage } from './password';

@NgModule({
  declarations: [
    PasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordPage),
  ],
})
export class PasswordPageModule {}
