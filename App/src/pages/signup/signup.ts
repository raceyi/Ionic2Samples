import { Component ,NgZone} from '@angular/core';
import { IonicPage, NavController,Platform, NavParams,AlertController } from 'ionic-angular';
import {ShopPage} from "../shop/shop";
import {PasswordPage} from "../password/password";
import { AndroidPermissions } from '@ionic-native/android-permissions';
//import { DeviceAccounts } from '@ionic-native/device-accounts';
import {StorageProvider} from '../../providers/storage/storage';
declare var cordova:any;
declare var plugins:any;

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  email:string;
  password:string;
  passwordConfirm:string;
  agreement:boolean=false;
  buttonColor:any={'color':'#6441a5'};

  userAgreementShown=false;        //1

  currentShown;  //undefined

  passwordConfirmString:string="";
  passwordString:string="";
  passwordMask:boolean=false;
  passwordConfirmMask:boolean=false;


  constructor(public navCtrl: NavController,
              private androidPermissions: AndroidPermissions,
              private ngZone:NgZone, 
              private platform:Platform,
             // private deviceAccounts: DeviceAccounts,
              private alertCtrl:AlertController,
              private storageProvider:StorageProvider,
              public navParams: NavParams) {
    
    if(this.platform.is("android")){ 
          androidPermissions.checkPermission(androidPermissions.PERMISSION.GET_ACCOUNTS).then((status)=> {
            if (status.hasPermission ) {
              console.log("Yes :D ");
              plugins.DeviceAccounts.getEmail((info)=>{
                this.ngZone.run(()=>{
                  this.email=info;
                });
              });
            }
            else {
              console.warn("No :( ");
              androidPermissions.requestPermission(androidPermissions.PERMISSION.GET_ACCOUNTS).then((status)=>{
                if( status.hasPermission ){
                    console.log("call DeviceAccounts");
                    plugins.DeviceAccounts.getEmail((info)=>{
                      this.ngZone.run(()=>{
                        this.email=info;
                      });
                    });
                }
              },(err)=>{

              });
            }
          },(err)=>{

          });

          androidPermissions.checkPermission(androidPermissions.PERMISSION.SEND_SMS).then((status)=> {
              androidPermissions.requestPermission(androidPermissions.PERMISSION.SEND_SMS).then((status)=>{
                  if( status.hasPermission ){
                  }else{
                    let alert = this.alertCtrl.create({
                              title: '문자전송허가 없이는 앱가입이 불가능합니다.',
                              buttons: ['OK']
                          });
                          alert.present(); 
                          return;                   
                  }
              });
          });
    }
      cordova.plugins.email.isAvailable((available)=>{
        console.log("hasAccount:"+available);
        if(!available) {
                    let alert = this.alertCtrl.create({
                              title: '이메일 계정 없이는 앱가입이 불가능합니다.',
                              buttons: ['OK']
                          });
                          alert.present(); 
                          return;                   
        }
      });   

  }

  validateEmail(email){   //http://www.w3resource.com/javascript/form/email-validation.php
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return (true);
      }
      return (false);
  }

  checked(){
    console.log("checked comes");
    if(!this.agreement){
        this.agreement=true;
        this.buttonColor={'color':'white',
                          'background-color':'#6441a5'
                        };
    }else{
        if(!this.email || !this.validateEmail(this.email)){
            let alert = this.alertCtrl.create({
                      title: '정상 이메일을 입력해주시기 바랍니다.',
                      buttons: ['OK']
                  });
                  alert.present();
            return;
        }
        if(this.password!=this.passwordConfirm){
            let alert = this.alertCtrl.create({
                        title: '결제 비밀번호가 일치하지 않습니다.',
                        buttons: ['OK']
                    });
            alert.present();       
            return false;
        }
        //save login info, password into NativeStorage and then move into ShopPage
        this.storageProvider.saveId(this.navParams.get("type"),this.navParams.get("id"),this.email);
        console.log("password:"+this.password);
        this.storageProvider.savePassowrd(this.password);
        this.navCtrl.setRoot(ShopPage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  show(title){
    console.log(title+" comes");
    this.userAgreementShown=!this.userAgreementShown; 
  }

  back(){
    this.navCtrl.pop();
  }

 myCallbackPasswordFunction = (_params) => {
      return new Promise((resolve, reject) => {
          console.log("password confirm params:"+_params);
          this.password=_params;
          this.ngZone.run(()=>{
                this.passwordString="******";
                this.passwordMask=true;
                console.log("this.passwordConfirmString:"+this.passwordString);
          });
          resolve();
      });
  }

  myCallbackPasswordConfirmFunction = (_params) => {
      return new Promise((resolve, reject) => {
          console.log("password confirm params:"+_params);
          this.passwordConfirm=_params;
          this.ngZone.run(()=>{
                this.passwordConfirmString="******";
                this.passwordConfirmMask=true;
                console.log("this.passwordConfirmString:"+this.passwordConfirmString);
          });
          resolve();
      });
  }

  passwordInput(){
          this.navCtrl.push(PasswordPage,{callback: this.myCallbackPasswordFunction});
  }

  passwordConfirmInput(){
      this.navCtrl.push(PasswordPage,{callback: this.myCallbackPasswordConfirmFunction});
  }


}
