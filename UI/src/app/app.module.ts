import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { StorageProvider } from '../providers/storage/storage';

import {LoginPageModule} from '../pages/login/login.module';
import {MenuPageModule} from '../pages/menu/menu.module';
import {PasswordPageModule} from '../pages/password/password.module';
import {PaymentPageModule} from '../pages/payment/payment.module';
import {ShopPageModule} from '../pages/shop/shop.module';
import {SignupPageModule} from '../pages/signup/signup.module';
import {ComponentsModule} from '../components/components.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    SignupPageModule,
    LoginPageModule,
    MenuPageModule,
    PasswordPageModule,
    PaymentPageModule,
    ShopPageModule,
  //  ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider
  ]
})
export class AppModule {}
