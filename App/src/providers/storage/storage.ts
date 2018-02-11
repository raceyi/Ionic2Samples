import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  payInfo=[];
  email;
  type; //facebook or kakao
  id;   // id of facebook and kakao

  deliveryFee:number=3000;
  phone="01012345678";

  constructor(private nativeStorage: NativeStorage,private platform:Platform) {
    console.log('Hello StorageProvider Provider');
    platform.ready().then(() => {
        this.readPayInfo().then(()=>{
            this.determinCardColor(); 
            console.log("StorageProvider-payInfo:"+JSON.stringify(this.payInfo));
        });
    });
  }

cardColorlist=[
              {name:"bc",color:"#ec4855"},
              {name:"shinhan",color:"#134596"},
              {name:"samsung",color:"#0d62a8"},
              {name:"kb",color:"#756d62"},
              {name:"hyundai",color:"#000000"},
              {name:"woori",color:"#1a9fda"},
              {name:"lotte",color:"#e02431"},
              {name:"hana",color:"#108375"},
              {name:"kakao", color:"#EBE315"},
              {name:"master", color:"#fc601f"},
              {name:"union",color:"#fb0f1c"},
              {name:"visa", color:"#1a215d"},
              {name:"비씨",color:"#ec4855"},
              {name:"신한",color:"#134596"},
              {name:"삼성",color:"#0d62a8"},
              {name:"국민",color:"#756d62"},
              {name:"현대",color:"#000000"},
              {name:"우리",color:"#1a9fda"},
              {name:"롯데",color:"#e02431"},
              {name:"하나",color:"#108375"},
              {name:"카카오", color:"#EBE315"},
              {name:"마스터", color:"#fc601f"},
              {name:"유니온페이",color:"#fb0f1c"},
              {name:"비자", color:"#1a215d"}];

defaultCardColor ="#33B9C6";            

    determinCardColor(){
        console.log("determinCardColor");
        this.payInfo.forEach((payment:any)=>{
            payment.background=this.defaultCardColor;
            for(var i=0;i<this.cardColorlist.length;i++){
                let name:string=payment.info.name;
                if(name!=undefined && name.toLocaleLowerCase().startsWith(this.cardColorlist[i].name)){
                        payment.background=this.cardColorlist[i].color;
                }
            }
        })
        console.log("payments:"+JSON.stringify(this.payInfo));
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

    saveId(type,id,email){
          let string=JSON.stringify({type:type,id:id,email:email});
          console.log("saveId:"+string);
          var encrypted:string=this.encryptValue(string);
          this.nativeStorage.setItem('id',encodeURI(encrypted));
          this.type=type;
          this.id=id;
          this.email=email;
    }

    readId(){
        return new Promise((resolve,reject)=>{
            console.log("readId getItem");
            this.nativeStorage.getItem("id").then((value:string)=>{
                console.log("...value:"+value);
                if(value==null){
                    reject();
                }else{    
                    console.log("...id:"+this.decryptValue(value));
                    let obj=JSON.parse(this.decryptValue(value));
                    this.email=obj.email;
                    this.type=obj.type;
                    this.id=obj.id;
                    resolve(JSON.parse(this.decryptValue(value)));
                }
            },(err)=>{
                    reject();
            });
        });
    }

   savePassowrd(password){
          var encrypted:string=this.encryptValue(password);
          this.nativeStorage.setItem('password',encodeURI(encrypted));
   }
   
    readPassword(){
        return new Promise((resolve,reject)=>{
            this.nativeStorage.getItem("password").then((value:string)=>{
                console.log("value:"+value);
                if(value==null){
                    reject();
                }else{    
                    resolve(this.decryptValue(value));
                }
            },(err)=>{
                    reject();
            });
        });
    }

    savePayInfo(){
          var encrypted:string=this.encryptValue(JSON.stringify(this.payInfo));
          this.nativeStorage.setItem('payInfo',encodeURI(encrypted));
    }

    readPayInfo(){
        return new Promise((resolve,reject)=>{
            this.nativeStorage.getItem("payInfo").then((value:string)=>{
                console.log("value:"+value);
                if(value==null){
                    reject();
                }else{    
                    console.log(this.decryptValue(value));
                    this.payInfo=JSON.parse(this.decryptValue(value));
                    resolve();
                }
            },(err)=>{
                    reject();
            });
        });
    }
}
