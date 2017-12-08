import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as CryptoJS from 'crypto-js';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class StorageProvider {

  constructor(private nativeStorage: NativeStorage) {
    console.log('Hello StorageProvider Provider');
  }

    decryptValue(value){
        var key=value.substring(0, 16);
        var encrypt=value.substring(16, value.length);
        console.log("value:"+value+" key:"+key+" encrypt:"+encrypt);
        var decrypted=CryptoJS.AES.decrypt(encrypt,key);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    encryptValue(value){
        var buffer="";
        for (var i = 0; i < 16; i++) {
            buffer+= Math.floor((Math.random() * 10));
        }
        console.log("buffer"+buffer);
        var encrypted = CryptoJS.AES.encrypt(value, buffer);
        console.log("value:"+buffer+encrypted);
        
        return (buffer+encrypted);    
    }


    saveLoginInfo(username,password){
      return new Promise((resolve,reject)=>{
          let usernameenc=this.encryptValue(username);
          let passwordenc=this.encryptValue(password);
          let usernameP= new Promise((resolveu,rejectu)=>{
                this.nativeStorage.setItem("username",usernameenc)
                  .then(
                    data =>{
                      resolveu()
                    },
                    error => rejectu(error)
                  );
                });
          let passwordP= new Promise((resolvep,rejectp)=>{ 
                   this.nativeStorage.setItem("password",passwordenc)
                  .then(
                    data => {
                      resolvep()
                    },
                    error => rejectp(error)
                  );
                });

          Promise.all([usernameP,passwordP]).then(()=>{
              resolve();
          },(err)=>{
              reject(err);
          });
      });
    }

    getLoginInfo(){
      return new Promise((resolve,reject)=>{
          let username,password;
          let usernameP= new Promise((resolveu,rejectu)=>{
                this.nativeStorage.getItem("username")
                  .then(
                    data =>{
                      username=data; 
                      resolveu(data)
                    },
                    error => rejectu(error)
                  );
                });
          let passwordP= new Promise((resolvep,rejectp)=>{ 
                   this.nativeStorage.getItem("password")
                  .then(
                    data => {
                      password=data;
                      resolvep(data)
                    },
                    error => rejectp(error)
                  );
                });

          Promise.all([usernameP,passwordP]).then(()=>{
              username=this.decryptValue(username);
              password=this.decryptValue(password);
              console.log("username:"+username+" password:"+password);
              resolve({username:username,password:password});
          },(err)=>{
              reject(err);
          });
      });

    }

}
