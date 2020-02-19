import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public downloadURL: string;
  private path: string;
  protected fileImage: string;
  protected fileUri: string;
  private blob: Blob;

  constructor(
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage
  ) {}

  async openGalery() {
    const options: CameraOptions = await {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try {
      await this.camera.getPicture(options).then(
        imageData => {
          this.fileUri = imageData;
          if (this.platform.is('ios')) {
            this.fileImage = this.fileUri.split('/').pop();
          } else {
            this.fileImage = this.fileUri.substring(
              this.fileUri.lastIndexOf('/') + 1,
              this.fileUri.indexOf('?')
            );
          }
          this.path =
            this.fileUri.substring(0, this.fileUri.lastIndexOf('/')) + '/';
        },
        err => {
          //alert(err);
        }
      );
    } catch (error) {
      // alert('erro: ' + error);
    }

    return await this.fileImage;
  }

  async takePhoto(){

  }

  async uploadPicture(pasta: string) {
    if (
      await this.path === '' ||
      await this.path === null ||
      await this.path === undefined ||
      await this.fileImage === '' ||
      await this.fileImage === null ||
      await this.fileImage === undefined
    ) {
      return;
    } else {
      const filename = environment.guid.raw().toString() + '.jpg';
      //alert(filename);
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(
        this.path,
        this.fileImage
      );
      this.blob = await new Blob([buffer], { type: 'image/jpeg' });
      const ref = await this.afStorage.ref(pasta + '/' + filename);
      const task = await ref.put(this.blob);
      await task.ref.getDownloadURL().then(urlDownload => {
        this.downloadURL = urlDownload;
      });
      await this.resetarDados();
      return await this.downloadURL;
    }
  }

  async resetarDados() {
    this.path = await null;
    this.fileImage = await null;
    this.blob = await null;
  }

  async deletarImagemStorage(pasta: string, url: string){
    let imagemDeletar = await url.substring(
              url.indexOf('%') + 3,
              url.indexOf('?'));
            console.log(pasta + imagemDeletar);
             await this.afStorage.ref(pasta + '/' + imagemDeletar).delete();
    return;
  }
}
