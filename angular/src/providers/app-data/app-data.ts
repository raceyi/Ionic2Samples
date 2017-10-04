import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppDataProvider {
  
  appName:string="Ionic2+앱";

  constructor(public http: Http) {
    console.log('Hello AppDataProvider Provider');
  }

    getAppName(){
    return this.appName;
  }

}
