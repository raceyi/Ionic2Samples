import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Platform} from 'ionic-angular';
import {StorageProvider} from '../storage/storage';
import { Observable } from "rxjs/Rx"; //It is necessary for request timeout
import { Events } from 'ionic-angular';

@Injectable()
export class ServerProvider {
  serverAddr:string="http://www.takit.biz:8080";

  username:string;
  password:string;

  version:string="0.01";

  constructor(public http: Http,private platform:Platform,
                private storageProvider:StorageProvider,public events: Events) {
  }

  get(url_in){
    return new Promise((resolve,reject)=>{
        let url=url_in+"&version="+this.version;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(this.serverAddr+url,headers).subscribe((res:any)=>{
            console.log("get response:"+JSON.stringify(res.json()));
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

post(url,body_in){
    return new Promise((resolve,reject)=>{
       let headers = new Headers();
       headers.append('Content-Type','application/json');
       let body=body_in;
       body.version=this.version;
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
        let body={username:username,password:password,version:this.version};

       let headers = new Headers();
       headers.append('Content-Type','application/json');
       this.http.post(this.serverAddr+"/login",JSON.stringify(body),{headers:headers}).subscribe((res:any)=>{
                      let object:Object=res.json();
                      if(object.hasOwnProperty('version') && (parseFloat(res.json().version)>parseFloat(this.version))){
                                this.events.publish('out-of-date');
                      }
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
