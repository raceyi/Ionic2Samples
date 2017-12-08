import { NgModule, ErrorHandler } from '@angular/core';

 export class MyErrorHandler implements ErrorHandler {
    handleError(error) {
      // do something with the exception
      console.log("error:"+error);
    }
 }




