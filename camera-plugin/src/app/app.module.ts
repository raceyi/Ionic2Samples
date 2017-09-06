import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MyErrorHandler } from '../classes/my-error-handler';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    Camera,
    FileTransfer,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ]
})
export class AppModule {}
