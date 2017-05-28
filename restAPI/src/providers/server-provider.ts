import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { Platform,Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {StorageProvider} from './storage-provider';
/*
  Generated class for the ServerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServerProvider {
  username:string;
  password:string;
  version=0.01;
  
  constructor(private platform: Platform, 
              private storageProvider:StorageProvider,
              public http: Http,public events: Events) {
    console.log('Hello ServerProvider Provider');
  }

    login(username, password){
    return new Promise((resolve,reject)=>{
          let body={username:username,password:password};
          let url="http://www.takit.biz:8080/login";
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.http.post(url,JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{
                      console.log("res.json().result:"+res.json().result);
                      if(res.json().result=="success"){                        
                          // save id and password
                          this.storageProvider.saveLoginInfo(username,password);
                          this.username=username;
                          this.password=password;
                          resolve(res.json());
                      }else{
                          reject("invalid userInfo");
                      }  
                      if(parseFloat(res.json().version)>this.version){
                          console.log("version out-of-date");
                          this.events.publish('out-of-date');
                      }
                  },(err)=>{
                        reject("network/server err");
                  });
          });
  }

  get(url){
    return new Promise((resolve,reject)=>{
        //curl www.takit.biz:8080/getInfo?Info=server
        this.http.get(url).subscribe((res:any)=>{
            resolve(res.json());
        },(err)=>{
            if(err.hasOwnProperty("status") && err.status==401){
                this.login(this.username,this.password).then((res)=>{
                      this.http.get(url).subscribe((res:any)=>{
                          resolve(res.json());
                      },(err)=>{
                          reject(err);
                      });
                },(err)=>{
                  reject(err);
                });
            }else
                reject(err);
        });
    });
  }

 post(url,body){
    return new Promise((resolve,reject)=>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("url:"+url+" post:"+body);
    this.http.post(url,JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{   
                console.log("res:"+JSON.stringify(res));            
                resolve(res.json());            
            },(err)=>{
                if(err.hasOwnProperty("status") && err.status==401){
                  this.login(this.username,this.password).then((res)=>{
                      this.http.post(url,JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{ 
                          resolve(res.json());
                      },(err)=>{
                          reject(err);
                      });
                  },(err)=>{
                    reject(err);
                  });
            }else
                reject(err);
            });
  });
 }


/*
  login(username, password){
    return new Promise((resolve,reject)=>{
          let body={username:username,password:password};
          let url="http://www.takit.biz:8080/login";

          this.post(url,body).then((res:any)=>{               
                      if(res.result=="success"){
                          // save id and password
                          this.storageProvider.saveLoginInfo(username,password);
                          this.username=username;
                          this.password=password;
                          resolve(res);
                      }else{
                          reject("invalid userInfo");
                      }  
                  },(err)=>{
                        reject("network/server err");
                  });
          });
  }

  get(url){
    return new Promise((resolve,reject)=>{
        //curl www.takit.biz:8080/getInfo?Info=server
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
    headers.append('Content-Type', 'application/json');
    console.log("url:"+url+" post:"+body);
    this.http.post(url,JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{   
                console.log("res:"+JSON.stringify(res));            
                resolve(res.json());            
            },(err)=>{
                reject(err);
            });
  });
 }
*/
}
