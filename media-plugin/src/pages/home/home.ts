import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    file;
    playing:boolean=false;

  constructor(private platform: Platform,public navCtrl: NavController, 
  private media: Media) {
    platform.ready().then(() => {
        if(this.platform.is('android'))
        this.file = this.media.create('file:///android_asset/www/assets/sound.mp3');
      else{
        this.file = this.media.create('assets/sound.mp3');
      }
      this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

      this.file.onSuccess.subscribe(() => {
        console.log('Action is successful');
        if(this.playing)
          this.file.play();
        
      });
      this.file.onError.subscribe(error => console.log('Error! '+JSON.stringify(error)));
    });
  }

  play(){
      if(!this.playing){
        this.playing=true;
        this.file.play();
      }
  }

  stop(){
    if(this.playing){
      this.playing=false;
      this.file.stop();
    }
  }

}
