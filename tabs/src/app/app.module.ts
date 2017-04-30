import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { NextAbout } from '../pages/next-about/next-about';
import { NextContact } from '../pages/next-contact/next-contact';
import { NextHome } from '../pages/next-home/next-home';
import { NextTabs } from '../pages/next-tabs/next-tabs';
import { NextExit } from '../pages/next-exit/next-exit';
import { NextPage } from '../pages/next-page/next-page';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {StorageProvider} from '../providers/storage-provider';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NextPage,
    NextExit,
    NextAbout,
    NextContact,
    NextHome,
    NextTabs
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NextPage,
    NextExit,
    NextAbout,
    NextContact,
    NextHome,
    NextTabs
  ],
  providers: [
    StorageProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
