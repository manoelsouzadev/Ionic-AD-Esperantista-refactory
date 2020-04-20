import { SharedHttpService } from "./../shared-http/shared-http.service";
import { Injectable } from "@angular/core";
import {
  LoadingController,
  ToastController,
  ModalController,
} from "@ionic/angular";
import { ImageViewerComponent } from "../../../shared/components/image-viewer/image-viewer.component";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class SharedModalService {
  private semana = [
    " Domingo",
    " Segunda-feira",
    " Terça-feira",
    " Quarta-feira",
    " Quinta-feira",
    " Sexta-feira",
    " Sábado",
  ];

  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private sharedHttpService: SharedHttpService
  ) {}

  async presentToast(
    textMessage: string = "",
    colorModal: string = "",
    cssClassModal: string = "",
    durationModal: number = 1500
  ) {
    const toast = await this.toastController.create({
      message: textMessage,
      color: colorModal,
      mode: "ios",
      position: "top",
      cssClass: cssClassModal,
      duration: durationModal,
    });
    toast.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      message: "Por favor, espere...",
      translucent: true,
      duration: 5000,
      cssClass: "custom-class custom-loading",
    });
    return await loading.present();
  }

  async viewImage(src: string, title: string = "", description: string = "") {
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        imgSource: src,
        imgTitle: title,
        imgDescription: description,
      },
      cssClass: "modal-fullscreen",
      keyboardClose: true,
      showBackdrop: true,
    });

    return await modal.present();
  }

  async callToast(message: string) {
    this.presentToast(message, "medium", "custom-modal", 4000);
    await this.delay(5000);
  }

  async showMessageNotice(data) {
    for (let i = 0; i < data.length; i++) {
      var strDataInicial = data[i].dataInicio;
      var strDataFinal = data[i].dataFinal;
      var partesDataInicial = strDataInicial.split("-");
      var partesDataFinal = strDataFinal.split("-");
      var dataAtual = new Date().toDateString();
      var dataInicial = new Date(
        partesDataInicial[0],
        partesDataInicial[1] - 1,
        partesDataInicial[2]
      ).toDateString();
      var dataFinal = new Date(
        partesDataFinal[0],
        partesDataFinal[1] - 1,
        partesDataFinal[2]
      ).toDateString();
      if (
        dataInicial.toString() == dataAtual.toString() &&
        dataFinal.toString() == dataAtual.toString()
      ) {
        //console.log(cultos[i].nome +' é hoje, '+ 'às ' + cultos[i].horario +". "+ i);
        //this.callToast(reuniao[i].titulo + ' começa hoje, às ' + reuniao[i].horario + ' horas, e termina hoje.');
        this.presentToast(
          data[i].titulo +
            " começa hoje, às " +
            data[i].horario +
            " horas, e termina hoje.",
          "dark",
          "custom-modal",
          4000
        );
        await this.delay(5000);
      } else if (dataInicial.toString() == dataAtual.toString()) {
        //console.log(cultos[i].nome +' é hoje, '+ 'às ' + cultos[i].horario +". "+ i);
        //this.callToast(reuniao[i].titulo + ' começa hoje, às ' + reuniao[i].horario + ' horas.');
        this.presentToast(
          data[i].titulo + " começa hoje, às " + data[i].horario + " horas.",
          "dark",
          "custom-modal",
          4000
        );
        await this.delay(5000);
      } else if (dataFinal.toString() == dataAtual.toString()) {
        //console.log(cultos[i].nome +' é hoje, '+ 'às ' + cultos[i].horario +". "+ i);
        //this.callToast(reuniao[i].titulo + ' termina hoje.');
        this.presentToast(
          data[i].titulo + " termina hoje.",
          "dark",
          "custom-modal",
          4000
        );
        await this.delay(5000);
      }
    }
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async confirmationAlert(
    header: string,
    message: string,
    textButton1: string,
    textButton2: string
  ): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>((resolve) => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController.create({
      header: header,
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: textButton1,
          handler: () => resolveFunction(false),
        },
        {
          text: textButton2,
          handler: () => resolveFunction(true),
        },
      ],
    });
    await alert.present();
    return promise;
  }

  public async showAlertConfirm(
    header: string,
    message: string,
    textButton1: string,
    textButton2: string
  ) {
    const confirm = await this.confirmationAlert(
      header,
      message,
      textButton1,
      textButton2
    );
    if (confirm) {
      console.log("Deleted");
      return true;
    } else {
      console.log("Canceled");
      return false;
    }
  }

  private async titleAlert(
    header: string,
    message: string,
    textButton1: string,
    textButton2: string,
    inputValue?: string
  ): Promise<string> {
    let resolveFunction: (title: string) => void;
    const promise = new Promise<string>((resolve) => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController.create({
      header: header,
      subHeader: message,
      backdropDismiss: false,
      inputs: [
        {
          name: "title",
          type: "text",
          placeholder: "Título",
          value: inputValue !== "" ? inputValue : ""
        },
      ],
      buttons: [
        {
          text: textButton1,
          handler: () => {
            return "";
          },
        },
        {
          text: textButton2,
          handler: (alertData) => resolveFunction(alertData.title),
        },
      ],
    });
    await alert.present();
    return promise;
  }

  public async showAlertTitle(
    header: string,
    message: string,
    textButton1: string,
    textButton2: string,
    inputValue?: string
  ) {
    const title = await this.titleAlert(
      header,
      message,
      textButton1,
      textButton2,
      inputValue
    );
    if (!(title === "")) {
      console.log("título: " + title);
      return title;
    } else {
      console.log("título: " + title);
      return title;
    }
  }

  async showMessageNoticeByDayOfWeek(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].dia === this.semana[new Date().getDay()].trim()) {
        this.presentToast(
          `${data[i].titulo} é hoje às ${data[i].horario}.`,
          "dark",
          "custom-modal",
          4000
        );
        await this.delay(5000);
      }
    }
  }

  async showMesageNoticeByListDayOfWeek(data) {

    for (let i = 0; i < data.length; i++) {
      var title = await data[i].titulo;
      var hour = await data[i].horario;
      var days = await data[i].dia.split(",");
      for (let j = 0; j < days.length; j++) {
        if (days[j].trim() === this.semana[new Date().getDay()].trim()) {
          await this.presentToast(
            `${title} é hoje, às ${hour}.`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        }
      }
    }
  }
}
