import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imageURI;

  constructor(public navCtrl: NavController,private camera: Camera) {

  }

  takePicture(){
   let cameraOptions = {
      quality: 100,
      targetWidth :500,
      targetHeight :500,
      saveToPhotoAlbum : true,
      allowEdit:true,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      
    }

    this.camera.getPicture(cameraOptions).then((imageURI) => {
        console.log("imageURI:"+imageURI);
        this.imageURI=imageURI;
    }, (err) => {
    // Handle error
        console.log("err:"+JSON.stringify(err)); 
    });
  }

  pickPicture(){
    let options = {
      quality: 100,
      targetWidth :500,
      targetHeight :500,
      allowEdit:true,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageURI) => {
        console.log("imageURI:"+imageURI);
        this.imageURI=imageURI;
       }, (err) => {
           console.log("err:"+JSON.stringify(err)); 
       });        
  }

}
