import { NgModule, ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

 export class MyErrorHandler implements ErrorHandler {
    handleError(error) {
      // do something with the exception
      console.log("error:..."+error);
    }
 }


