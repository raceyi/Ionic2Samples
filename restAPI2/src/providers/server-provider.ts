import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServerProvider {

  constructor(public http: Http) {
    console.log('Hello ServerProvider Provider');
  }

get(url){
  return new Promise((resolve,reject)=>{
  this.http.get(url).subscribe((res:any)=>{
            resolve(res.json());
    },(err)=>{
        reject(err);
    });
  });
} 

post(url,body){
    return new Promise((resolve,reject)=>{
       let headers = new Headers();
       headers.append('Content-Type','application/json');
       this.http.post(url,JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{
            resolve(res.json());
        },(err)=>{
            reject(err);
        });
    });
  }

}
