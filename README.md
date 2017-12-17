# Ionic2Samples

Chapter 2장

    1.sample

Chapter 3장
    
    1.angular

Chapter 4장

    1-1) select-component

    1-2) basic-compoents

    2-1)navigation
    
    2-2)tabs

    3-1)params

    3-2)password

    4.menu

    5.dialog

    6.orientation

Chapter 5장

    1.theme

    2.grid

Chapter 6장

    1.restAPI1
   
    2.restAPI2

    3.restAPI3

       $ionic cordova plugin add cordova-plugin-nativestorage

       $npm install --save @ionic-native/native-storage

       $npm install crypto-js --save
       
       $npm install @types/crypto-js --save

    4.restAPI4
       $ionic cordova plugin add cordova-plugin-nativestorage

       $npm install --save @ionic-native/native-storage

       $npm install crypto-js --save

       $npm install @types/crypto-js --save

Chapter 7장

    1.gesture
  
    2.infinite-scroll
   
    3.ngzone-> camera-plugin참조 
 
    4.events

    5.animation

     $npm install @angular/animations

    6.transition

    7.multi-language

    8.backkey-handler -> transtion참조

    9.custom-icon
    
    10.custom-compoent
    
    11.datetime


Chapter 8장
 
    1-1)facebook-plugin

    1-2)~3)camera-plugin
    
    1-4)push-plugin
 
    1-5)inapp-browser-plugin,iamport

    1-6)media-plugin

    2.kakao-talk-plugin
        plugin 다운로드 후 최신 sdk로 수정. KakaoTalk.m, KakaoTalk.java수정        
       
        $ionic start kakao-talk-plugin blank

        $ionic cordova platform add android

        $ionic cordova platform add ios

        $ionic cordova plugin add  ../plugin/KakaoTalk.java --variable KAKAO_APP_KEY=XXXXXXXXXXX
 
        $ionic cordova plugin add cordova-plugin-appavailability

        $npm install --save @ionic-native/app-availability

        $ionic cordova plugin add cordova-plugin-inappbrowser

        $npm install --save @ionic-native/in-app-browser
 
        $git checkout kakao-talk-plugin

        $ionic cordova build android
 
        $ionic cordova build ios
 
