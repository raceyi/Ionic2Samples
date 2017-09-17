import { Component } from '@angular/core';
import { App, NavController ,Platform,IonicApp,MenuController,ViewController,AlertController} from 'ionic-angular';

import {NextPage} from '../next/next';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navController: NavController,
              private platform:Platform,
              private ionicApp: IonicApp,
              private menuCtrl: MenuController,
              public viewCtrl: ViewController,
              private alertController:AlertController,
              private app:App) {

  }

 ionViewDidLoad(){ 
    //refer to https://github.com/driftyco/ionic/issues/6982. 
    //registerBackButtonAction에 대해 계속 업데이트되고 있음으로 위의 url을 참조하시기바랍니다. 
    this.platform.registerBackButtonAction(() => {
            console.log("registerBackButtonAction");
            let activePortal = this.ionicApp._loadingPortal.getActive() ||
              this.ionicApp._modalPortal.getActive() ||
              this.ionicApp._toastPortal.getActive() ||
                this.ionicApp._overlayPortal.getActive();

            //activePortal is the active overlay like a modal,toast,etc
            if (activePortal) {
                activePortal.dismiss();
                return
            }
            else if (this.menuCtrl.isOpen()) { // Close menu if open
                this.menuCtrl.close();
                return
            }
            let view = this.navController.getActive(); // As none of the above have occurred, its either a page pushed from menu or tab
            let activeVC = this.navController.getActive(); //get the active view
          
            let page = activeVC.instance; //page is the current view's instance i.e the current component I suppose

            if (!(page != this.viewCtrl)) { // Check if the current page is pushed from a menu click. 
                                            // HomePage와 동일한 페이지 인지를 확인합니다. 
                
                if (this.navController.canGoBack() || view && view.isOverlay) {
                    this.navController.pop(); //pop if page can go back or if its an overlay over a menu page
                }             
                else {
                         let alert =  this.alertController.create({
                                title: '백키 버튼의 action이 없습니다.',
                                buttons: [
                                    {
                                        text: '네',
                                        handler: () => {
                                            this.platform.exitApp();
                                        }
                          }]});
                          alert.present();
                }
                return;
            }else{            
                 let alert = this.alertController.create({
                                title: '앱을 종료하시겠습니까?',
                                buttons: [
                                    {
                                        text: '아니오',
                                        handler: () => {
                                        }
                                    },
                                    {
                                        text: '네',
                                        handler: () => {
                                            console.log("terminate App");
                                            this.platform.exitApp();
                                        }
                          }]});
                    alert.present();
            }
        }, 0);
  }

  nextPage(){
    console.log("move into next Page");
    this.navController.push(NextPage,{},{animate:true,animation: 'slide-up-down', direction: 'forward' });
  }

}
