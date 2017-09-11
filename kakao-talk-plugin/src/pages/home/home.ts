import { Component } from '@angular/core';
import { NavController ,Platform} from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';

declare var KakaoTalk:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private platform:Platform,
              private appAvailability: AppAvailability){
  }

  kakaologin(){
      var scheme;
      if(this.platform.is('android')){
          scheme='com.kakao.talk';         
      }else if(this.platform.is('ios')){
          scheme='kakaotalk://';
      }else{
          console.log("unknown platform");
      }   
      console.log("ionic-scheme:"+scheme);
          this.appAvailability.check(scheme).then(
          ()=> {  // Success callback
              console.log(scheme + ' is available. call KakaoTalk.login ');
              KakaoTalk.login(
                    (userProfile)=>{
                        console.log("userProfile:"+JSON.stringify(userProfile));
                        console.log('Successful kakaotalk login');
                        /* !!! Add App server login here !!!*/
                    },
                    (err)=> {
                        console.log('Error logging in');
                        console.log(JSON.stringify(err));
                        let reason={stage:"login_err",msg:err}; 
                    }
              ); 
          },
          (error)=>{  // Error callback
              console.log("appAvailability error:"+JSON.stringify(error));
          });
  }
}
