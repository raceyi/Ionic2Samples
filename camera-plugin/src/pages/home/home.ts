import { Component ,NgZone} from '@angular/core';
import { NavController,Platform ,LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

var page;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  imageURI;
  fileTransfer: FileTransferObject;
  
  public workoutProgress: string = '0' + '%';
  serverURI="http://www.takit.biz:8080/ocrFileSubmit";

  constructor(public navCtrl: NavController,private platform:Platform,
              private ngZone:NgZone,
              private camera: Camera,private transfer:FileTransfer) {
      page=this;          
      this.platform.ready().then(() => {
          this.fileTransfer=this.transfer.create();
      });
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
        if(imageURI !== undefined){
            this.fileUpload(imageURI).then(()=>{

            },(err)=>{

            });
        }
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
        console.log("imageURI:"+JSON.stringify(imageURI));
        this.imageURI=imageURI;
        this.fileUpload(imageURI).then(()=>{

        },(err)=>{

        });
       }, (err) => {
           console.log("err:"+JSON.stringify(err)); 
       });        
  }

  fileUpload(imageURI){
    return new Promise((resolve,reject)=>{
      if(imageURI !== undefined){
         let options :FileUploadOptions = {
                    fileKey: 'file',
                    fileName: 'name.jpg', 
                    mimeType: 'image/jpeg',
                    params: { //extra fields which are delivered with file
                        description: 'file upload test' 
                    }
                }; 
                this.fileTransfer.onProgress(this.onProgress);
                console.log("call fileTransfer.upload "+imageURI);

                this.fileTransfer.upload(imageURI, this.serverURI, options, false)
                .then((response: any) => {
                    console.log("upload:"+JSON.stringify(response));
                    let result=JSON.parse(response.response);
                    console.log("result.result:"+result.result);
                    this.ngZone.run(()=>{
                      //console.log("progress 100%");
                      //this.workoutProgress='100%';
                    })
                    resolve();
                },(err)=>{
                    reject(err);
                });
        }
    });
  }
  
  onProgress(progressEvent: ProgressEvent){
    console.log("page.serverURI:"+page.serverURI);
    page.ngZone.run(()=>{
      let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        page.workoutProgress = Math.min( (progress), 100) + '%';
        console.log("workoutProgress:"+page.workoutProgress);
    });
  }

}
