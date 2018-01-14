# Ionic2Samples

ionic2+관련 질문은 https://www.facebook.com/ionic2plus에 올려주세요.

*기본 샘플 빌드 방법 

    $git clone https://github.com/raceyi/Ionic2Samples

    $cd Ionic2Samples

    $rm -rf sample

    $ionic start sample blank

    $git checkout sample

    $cd sample

    $ionic serve

    $ionic cordova platform add android

    $ionic cordova platform add ios

    $ionic corodva build android

    $ionic cordova build ios

    *각 디렉토리 별로 설치해야할 node module과 cordova plugin이 다릅니다.

    추후 정리해 올리겠습니다. 현재 인프런 강의를 통해 각 샘플의 설치 방법에 대해 아실수 있습니다.

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

        $ionic cordova plugin add  ../plugin/KakaoTalk/ --variable KAKAO_APP_KEY=XXXXXXXXXXX
 
        $ionic cordova plugin add cordova-plugin-appavailability

        $npm install --save @ionic-native/app-availability

        $ionic cordova plugin add cordova-plugin-inappbrowser

        $npm install --save @ionic-native/in-app-browser
 
        $git checkout kakao-talk-plugin

        $ionic cordova build android
 
        $ionic cordova build ios
 
