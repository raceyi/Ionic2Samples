import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { Structural } from '../pages/structural/structural';
import { NgClass } from '../pages/ng-class/ng-class';
import { NgStyle } from '../pages/ng-style/ng-style';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyData } from '../providers/my-data';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    Structural,
    NgClass,
    NgStyle,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Structural,
    NgClass,
    NgStyle,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MyData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
