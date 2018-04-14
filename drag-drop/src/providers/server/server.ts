import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServerProvider Provider');
  }

  post(request,body){
       console.log("request:"+request);
       let address="http://localhost:8100/"+request;
       console.log("address:"+address);
       
       return new Promise((resolve,reject)=>{
            this.http.post(address,body).subscribe((res:any)=>{               
                resolve(res);                    
            },(err)=>{
                console.log("post-err:"+JSON.stringify(err));
            });
       });
  }
}
