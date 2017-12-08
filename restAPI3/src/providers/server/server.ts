import { Injectable } from '@angular/core';
//import { Http,Headers } from '@angular/http'; depreciated
import { Platform} from 'ionic-angular';
import {StorageProvider} from '../storage/storage';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ServerProvider {
  serverAddr:string="http://192.168.0.99:8080";

  username:string;
  password:string;

  constructor(public http: HttpClient,private platform:Platform,
                private storageProvider:StorageProvider) {
  }

  get(url){
    return new Promise((resolve,reject)=>{
        console.log("url:"+url);
        this.http.get(this.serverAddr+url).subscribe((res:any)=>{
            resolve(res);
        },(err)=>{
            if(err.hasOwnProperty("status") && err.status==401){
                this.login(this.username,this.password).then((res)=>{
                      this.http.get(url).subscribe((res:any)=>{
                          resolve(res);
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
       let headers = new HttpHeaders({'Content-Type': 'application/json'});
       this.http.post(this.serverAddr+url,JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{   
                console.log("res:"+JSON.stringify(res));            
                resolve(res);            
            },(err)=>{
                if(err.hasOwnProperty("status") && err.status==401){
                  this.login(this.username,this.password).then((res)=>{
                      this.http.post(url,JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{ 
                          resolve(res);
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

       let headers = new HttpHeaders({'Content-Type': 'application/json'});
       this.http.post(this.serverAddr+"/login",JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{
                      console.log("res:"+JSON.stringify(res));
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
}
