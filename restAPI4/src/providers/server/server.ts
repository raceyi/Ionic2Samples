import { Injectable } from '@angular/core';
//import { Http,Headers } from '@angular/http';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Platform} from 'ionic-angular';
import {StorageProvider} from '../storage/storage';
import { Observable } from "rxjs/Rx"; //It is necessary for request timeout
import { Events } from 'ionic-angular';

@Injectable()
export class ServerProvider {
  serverAddr:string="http://192.168.0.99:8080"; //server's IP address

  username:string;
  password:string;

  version:string="0.01";

  constructor(public http: HttpClient,private platform:Platform,
                private storageProvider:StorageProvider,public events: Events) {
  }

  get(url_in){
    return new Promise((resolve,reject)=>{
        let url=url_in+"&version="+this.version;
        this.http.get(this.serverAddr+url).subscribe((res:any)=>{ // get has problem with timeout. Why?
            console.log("get response:"+JSON.stringify(res));
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

post(url,body_in){
    return new Promise((resolve,reject)=>{
       let headers = new HttpHeaders({'Content-Type': 'application/json'});
       let body=body_in;
       body.version=this.version;
       this.http.post(this.serverAddr+url,body,{headers:headers}).subscribe((res:any)=>{   
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
        let body={username:username,password:password,version:this.version};

       let headers = new HttpHeaders({'Content-Type': 'application/json'});
       this.http.post(this.serverAddr+"/login",body,{headers:headers}).subscribe((res:any)=>{
                      let object:Object=res;
                      if(object.hasOwnProperty('version') && (parseFloat(res.version)>parseFloat(this.version))){
                                this.events.publish('out-of-date');
                      }
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
