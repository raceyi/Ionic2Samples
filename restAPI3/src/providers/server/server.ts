import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Platform} from 'ionic-angular';
import {StorageProvider} from '../storage/storage';

import 'rxjs/add/operator/map';

@Injectable()
export class ServerProvider {
  serverAddr:string="http://www.takit.biz:8080";

  username:string;
  password:string;

  constructor(public http: Http,private platform:Platform,
                private storageProvider:StorageProvider) {
  }

  get(url){
    return new Promise((resolve,reject)=>{
        console.log("url:"+url);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(this.serverAddr+url,headers).subscribe((res:any)=>{
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
       headers.append('Content-Type','application/json');
       this.http.post(this.serverAddr+url,JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{   
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

login(username, password){
    return new Promise((resolve,reject)=>{
        let body={username:username,password:password};

       let headers = new Headers();
       headers.append('Content-Type','application/json');
       this.http.post(this.serverAddr+"/login",JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{
                      console.log("res:"+JSON.stringify(res.json()));
                      if(res.json().result=="success"){
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
}
