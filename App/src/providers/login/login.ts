import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import {Platform} from 'ionic-angular';
import {StorageProvider} from '../storage/storage';
import {Http,Headers} from '@angular/http';
import { AppAvailability } from '@ionic-native/app-availability';

import { HttpClient ,HttpHeaders} from '@angular/common/http';

declare var KakaoTalk:any;

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  
  constructor(public fb: Facebook,private platform:Platform
      ,public storageProvider:StorageProvider, private appAvailability: AppAvailability
      ,private httpClient: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  loginSocialLogin(type){
    if(type=="facebook"){
      return new Promise((resolve,reject)=>{
        this.fblogin(this,{}).then((res:any)=>{
                resolve(res);
            }, (err)=>{
                reject(err);
            });
        });
    }else if(type=="kakao"){
      return new Promise((resolve,reject)=>{
        this.kakaologin(this,{}).then((res:any)=>{
                resolve(res);
            }, (err)=>{
                reject(err);
            });
          });
    }
  }


  fblogin(fbProvider:LoginProvider,params){    
    return new Promise((resolve,reject)=>{
      if(this.platform.is('cordova')) {
           fbProvider.fb.getLoginStatus().then((status_response) => { 
           console.log(JSON.stringify(status_response));
           if(status_response.status=='connected'){
              console.log("conneted status");
              //console.log(status_response.userId); //please save facebook id 
              fbProvider.fb.api("me/?fields=id,email,last_name,first_name", ["public_profile","email"]).then((api_response) =>{
                   console.log(JSON.stringify(api_response));
                   resolve(api_response);
               },(api_err)=>{
                   console.log("facebook.api error:"+JSON.stringify(api_err));
                   let reason={stage:"api_err",msg:api_err}; 
                   reject(reason);
               }); 
           }else{ // try login
              console.log("Not connected status");
              fbProvider.fb.login(["public_profile","email"]).then((login_response:any) => {
                   console.log(JSON.stringify(login_response));
                   //console.log(login_response.userId);
                   resolve(login_response);
               },(login_err)=>{
                   console.log(JSON.stringify(login_err));
                   let reason={stage:"login_err",msg:login_err};
                   reject(reason);
               }); 
           }
       },(status_err) =>{
           console.log(JSON.stringify(status_err)); 
           let reason={stage:"status_err",msg:status_err};
           reject(reason);
       });
      }else{
            console.log("Please run me on a device");
            let reason={stage:"cordova_err",msg:"run me on device"};
            reject(reason);
      }
      });
  }    

  kakaologin(kakaoProvider,params){
    return new Promise((resolve,reject)=>{

      var scheme;
      if(this.platform.is('android')){
          scheme='com.kakao.talk';         
      }else if(this.platform.is('ios')){
          scheme='kakaotalk://';
      }else{
          console.log("unknown platform");
      }
      
      this.appAvailability.check(scheme).then(
          ()=> {  // Success callback
              console.log(scheme + ' is available. call KakaoTalk.login ');
              KakaoTalk.login(
                    (userProfile)=>{
                        console.log("userProfile:"+JSON.stringify(userProfile));
                        var id;
                        if(typeof userProfile === "string"){
                                id=userProfile;
                        }else{ // humm... userProfile data type changes. Why?
                                id=userProfile.id;
                        }
                        console.log('Successful kakaotalk login with'+id);
                        resolve(userProfile);
                    },
                    (err)=> {
                        console.log('Error logging in');
                        console.log(JSON.stringify(err));
                        let reason={stage:"login_err",msg:err}; 
                        reject(reason);
                    }
              ); 
          },
          ()=>{  // Error callback
              console.log(scheme + ' is not available');
              reject({stage:"social_login", msg:"카카오톡이 설치되어있지 않습니다."});
          });     
      });
  }
}
