import { Injectable } from '@angular/core';
//import { Http,Headers } from '@angular/http'; depreciated
import { Platform} from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ServerProvider {
  serverAddr:string="http://www.takit.biz:8080";

  constructor(public http: HttpClient,private platform:Platform) {
  }

  get(url){
    return new Promise((resolve,reject)=>{
        console.log("url:"+url);
        let serverUrl;
        if(this.platform.is('cordova'))
            serverUrl=this.serverAddr+url; //android,ios
        else
            serverUrl="http://localhost:8100"+url;    //ionic server
        this.http.get(serverUrl).subscribe((res:any)=>{
            resolve(res);
        },(err)=>{
            reject(err);
        });
    });
  }

post(url,body){
    return new Promise((resolve,reject)=>{
        let serverUrl;
        if(this.platform.is('cordova'))
            serverUrl=this.serverAddr+url; //android,ios
        else
            serverUrl="http://localhost:8100"+url;    //ionic server
       let headers = new HttpHeaders({'Content-Type': 'application/json'});
       headers.append('Content-Type','application/json');
       this.http.post(serverUrl,body,{headers:headers}).subscribe((res:any)=>{
            resolve(res);
        },(err)=>{
            reject(err);
        });
    });
  }

}
