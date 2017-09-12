import { Component } from '@angular/core';
import { NavController ,Platform} from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser,InAppBrowserEvent } from '@ionic-native/in-app-browser';
import {Http,Headers} from '@angular/http';

declare var KakaoTalk:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  browserRef;
  restAPIKey="XXXXXXXX";
  kakaoOauthUrl="XXXXXXX"; 

  constructor(public navCtrl: NavController,
              private platform:Platform,
              private appAvailability: AppAvailability,
              private iab: InAppBrowser,private http:Http){
  }

  kakaologin(){
   this.doKakaoLogin().then((profile)=>{
       console.log("kakao login success");
   },(err)=>{
       console.log("kakao login failure");
   })
   
  }


    doKakaoLogin(){
      return new Promise((resolve,reject)=>{
   
      var scheme;
      if(this.platform.is('android')){
          scheme='com.kakao.talk';         
      }else if(this.platform.is('ios')){
          scheme='kakaotalk://';
      }else{
          console.log("unknown platform");
      }   
      console.log("ionic-scheme:"+scheme);

      console.log("ionic-scheme:"+scheme);
          this.appAvailability.check(scheme).then(
          ()=> {  // Success callback
              console.log(scheme + ' is available. call KakaoTalk.login ');
              KakaoTalk.login(
                    (userProfile)=>{
                        console.log("userProfile:"+JSON.stringify(userProfile));
                        console.log('Successful kakaotalk login');
                        /* !!! Add App server login here !!!*/
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
          (error)=>{  // Error callback
              let successComes:boolean=false;
              this.browserRef=this.iab.create("https://kauth.kakao.com/oauth/authorize?client_id="+this.restAPIKey+"&redirect_uri="+this.kakaoOauthUrl+"&response_type=code","_blank");
              this.browserRef.on("exit").subscribe((event:InAppBrowserEvent)=>{
                  let successComes:boolean=false;
                  console.log("exit comes: "+JSON.stringify(event));
                  setTimeout(() => {
                      if(!successComes){
                            let reason={stage:"login_err",msg:"no input"}; 
                            reject(reason);
                      }
                }, 1000); //  1 second. Is it enough?
              });
              this.browserRef.on("loadstart").subscribe((event:InAppBrowserEvent)=>{
                  console.log("InAppBrowserEvent(loadstart):"+String(event.url)); 
                  var url=String(event.url);
                  if(url.startsWith(this.kakaoOauthUrl+"?code=")){
                      successComes=true;
                      console.log("success to get code");
                      this.browserRef.close();
                      let authorize_code=event.url.substr(event.url.indexOf("code=")+5);
                      console.log("authorize_code:"+authorize_code);
                      // get token and then get user profile info
                      // request server login with authorize_code.                      
                      this.getKakaoToken( this.restAPIKey,this.kakaoOauthUrl,authorize_code).then(
                          (token:any)=>{ 
                              console.log("access_token:"+token.access_token); 
                              this.getKakaoMe(token.access_token).then((profile:any)=>{
                                    console.log("getKakaoMe profile:"+JSON.stringify(profile)); 
                                    console.log('Successful kakaotalk login with'+profile.id);
                                    // !!! Call App server API here !!!        
                                    resolve(profile);                                    
                              },(err)=>{
                                 console.log("getKakaoMe err"+JSON.stringify(err)); 
                                 let reason={stage:"getKakaoMe_err",msg:err};
                                 reject(reason); 
                              });
                          },
                          (err)=>{
                              console.log("getKakaoToken err "+JSON.stringify(err));
                              let reason={stage:"login_err",msg:"getKakaoToken err "}; 
                              reject(reason);
                          });
                  }
                  // Please add code for login failure here!
              });    
          });
      });
    }

    getKakaoToken(app_key,redirect_uri,authorize_code){
      return new Promise((resolve, reject)=>{
              console.log("getKakaoToken authorize_code:"+authorize_code);

              let body = 'grant_type=authorization_code'+
                         '&client_id='+app_key+
                         '&redirect_uri='+redirect_uri+
                         '&code='+authorize_code;
              let headers = new Headers();
              headers.append('Content-Type', 'application/x-www-form-urlencoded');
             console.log("body:"+body); 
             this.http.post("https://kauth.kakao.com/oauth/token",body,{headers: headers}).subscribe((res)=>{
                 console.log("getKakaoToken success:"+JSON.stringify(res.json()));
                 resolve(res.json()); 
             },(err)=>{
              console.log("err:"+JSON.stringify(err));
                 reject(err);
             });
         });
  }

  getKakaoMe(access_token){
      return new Promise((resolve, reject)=>{
              console.log("getKakaoMe token:"+access_token);
              let headers = new Headers();
              headers.append('Authorization', 'Bearer '+access_token);
              headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
             this.http.get("https://kapi.kakao.com/v1/user/me",{headers: headers}).subscribe((res)=>{
                 var profile=res.json();
                 resolve(profile); 
             },(err)=>{
              console.log("err:"+JSON.stringify(err));
                 reject(err);
             });
         });
  }
}
