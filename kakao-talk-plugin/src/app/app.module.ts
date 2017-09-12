import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppAvailability } from '@ionic-native/app-availability';
import {Http,Headers} from '@angular/http';
import {HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MyErrorHandler} from '../classes/my-error-handler';
import { InAppBrowser,InAppBrowserEvent } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppAvailability,
    InAppBrowser,
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ]
})
export class AppModule {}
