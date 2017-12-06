import { Component,ViewChild } from '@angular/core';
import { NavController, Select } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('select') selectRef:Select;

  open(){
    this.selectRef.open();  
  }

  gaming: string = "n64";
  gender: string = "f";
  os: string;
  music: string;
  month: string;
  year: number;

  musicAlertOpts: { title: string, subTitle: string };

  constructor() {
    this.musicAlertOpts = {
      title: '1994 Music',
      subTitle: 'Select your favorite'
    };
  }

  stpSelect() {
    console.log('STP selected');
  }

  language:string="English";

  cancelText:string="cancel";
  okText:string="ok";

  englishButtonColor:string="secondary";
  koreanButtonColor:string="primary";

  selectKorean(){
    this.cancelText="취소";
    this.okText="확인";
    this.englishButtonColor="primary";
    this.koreanButtonColor="secondary";
  }

  selectEnglish(){
    this.cancelText="cancel";
    this.okText="ok";
    this.englishButtonColor="secondary";
    this.koreanButtonColor="primary";
  }
}
