import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { AngularFireStorage } from "@angular/fire/storage";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  public downloadURL: string;
  private path: string;
  protected fileImage: string = null;
  protected fileUri: string;
  private photoBase64: string;
  private msg: string = null;
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
          if (this.platform.is("ios")) {
            this.fileImage = this.fileUri.split("/").pop();
          } else {
            this.fileImage = this.fileUri.substring(
              this.fileUri.lastIndexOf("/") + 1,
              this.fileUri.indexOf("?")
            );
          }
          this.path =
            this.fileUri.substring(0, this.fileUri.lastIndexOf("/")) + "/";
        },
        err => {
          alert("entrou 2: " + err);
          this.fileImage = null;
        }
      );
    } catch (error) {
      // alert('erro: ' + error);
    }

    return await this.fileImage;
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    };

    await this.camera
      .getPicture(options)
      .then(
        ImageData => {
          //let base64Image = 'data:image/jpeg;base64,' + ImageData;
          this.photoBase64 = ImageData;
          alert(ImageData);
          this.msg = "IMG-" + Math.random() * 1000000;
        },
        // err => {
        //   alert("entrou: " + err);
        //   this.msg = null;
        // }
      )
      .catch(error => {
        //alert(error);
        return;
      });

    // this.photoBase64 !== null &&
    // this.photoBase64 !== undefined &&
    // this.photoBase64 !== ""
    //   ? (this.msg = "IMG-" + Math.random() * 1000000)
    //   : (this.msg = "");
    // alert(this.msg);
    // if (this.msg === null || this.msg === undefined) {

    // } else {
      return await this.msg;
    // }
  }

  async uploadPictureBase64(pasta: string) {
    alert("start of method uploadPicturebase64: "+this.photoBase64);
    if (
      await this.photoBase64 === "" ||
      await this.photoBase64 === null ||
      await this.photoBase64 === undefined
    ) {
      alert("uploabase64 method: nao entrou")
      return;
    } else {
      alert("entrou");
      const filename = (await environment.guid.raw().toString()) + ".jpg";
      const ref = await this.afStorage.ref(pasta + "/" + filename);
      const task = await ref.putString(this.photoBase64, "base64", {
        contentType: "image/jpg"
      });
      await task.ref.getDownloadURL().then(urlDownload => {
        this.downloadURL = urlDownload;
      });
      await this.resetarDados();
      return await this.downloadURL;
    }
  }

  async uploadPicture(pasta: string) {
    if (
      (await this.path) === "" ||
      (await this.path) === null ||
      (await this.path) === undefined ||
      (await this.fileImage) === "" ||
      (await this.fileImage) === null ||
      (await this.fileImage) === undefined
    ) {
      return;
    } else {
      const filename = environment.guid.raw().toString() + ".jpg";
      //alert(filename);
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(
        this.path,
        this.fileImage
      );
      this.blob = await new Blob([buffer], { type: "image/jpeg" });
      const ref = await this.afStorage.ref(pasta + "/" + filename);
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
    this.photoBase64 = await null;
  }

  async deletarImagemStorage(pasta: string, url: string) {
    let imagemDeletar = await url.substring(
      url.indexOf("%") + 3,
      url.indexOf("?")
    );
    console.log(pasta + imagemDeletar);
    await this.afStorage.ref(pasta + "/" + imagemDeletar).delete();
    return;
  }
}
