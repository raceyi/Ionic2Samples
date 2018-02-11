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
import { LoginProvider } from '../providers/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';
//import { DeviceAccounts } from '@ionic-native/device-accounts';
import { CardProvider } from '../providers/card/card';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser,InAppBrowserEvent } from '@ionic-native/in-app-browser';

import {MyErrorHandler} from '../classes/my-error-handler';
import { HttpClientModule } from '@angular/common/http';
import { SMS } from '@ionic-native/sms';
//import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SignupPageModule,
    LoginPageModule,
    MenuPageModule,
    PasswordPageModule,
    PaymentPageModule,
    ShopPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: MyErrorHandler},
    StorageProvider,
    AndroidPermissions,
    NativeStorage,
   // DeviceAccounts, It doesn't work
    LoginProvider,
    CardProvider,
    Facebook,
    AppAvailability,
    InAppBrowser,
    SMS,
    //EmailComposer It doesn't work
  ]
})
export class AppModule {}
