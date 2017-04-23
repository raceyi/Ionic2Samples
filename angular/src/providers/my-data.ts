import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyData {
  appName:string="Ionic2앱";

  constructor(public http: Http) {
    console.log('Hello MyData Provider');
  }

  getAppName(){
    return this.appName;
  }
}
