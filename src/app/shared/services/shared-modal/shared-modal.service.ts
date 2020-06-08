import { AditionalModalComponent } from "../../components/aditional-modal/aditional-modal.component";
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

  private currentDate = new Date();
  private crtHours = this.currentDate.getHours();
  private crtMinutes = this.currentDate.getMinutes();
  private currentHour = `${this.currentDate.getHours() < 10 ? "0" + this.crtHours : crtHours }:${this.currentDate.getMinutes() < 10 ? "0" + this.crtMinutes : this.crtMinutes }`;
  private currentFullDate = `${this.currentDate.getFullYear()}-${
    this.currentDate.getMonth() < 10
      ? "0" + (this.currentDate.getMonth() + 1)
      : this.currentDate.getMonth() + 1
  }-${this.currentDate.getDate()}`;
  //private crtHours = this.currentDate.getHours();
  //private crtMinutes = this.currentDate.getMinutes();

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
    console.log(this.currentFullDate);
    var currentDate = new Date();
    var currentHour = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    var currentFullDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() < 10
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    var crtHours = currentDate.getHours();
    var crtMinutes = currentDate.getMinutes();

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
      var dtHours = parseInt(data[i].horarioInicio.substring(0, 2));
      var dtMinutes = data[i].horarioInicio.substring(3, 5);
	console.log(currentHour, data[i].horarioTermino);
      if (
        dataInicial.toString() == dataAtual.toString() &&
        dataFinal.toString() == dataAtual.toString()
      ) {
        if (this.currentHour === data[i].horarioInicio) {
          this.presentToast(
            `${data[i].titulo} inicia agora, e termina hoje. Contamos com sua presença.`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        } else if (this.currentHour < data[i].horarioInicio) {
          this.presentToast(
            `${data[i].titulo} inicia hoje às ${data[i].horarioInicio} e termina hoje. Contamos com sua presença`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        }
        else if(this.currentHour >= data[i].horarioTermino){
	console.log('entrou');
          this.presentToast(
            `${data[i].titulo} encerrou às ${data[i].horarioTermino} hora(s).`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        }
        else if (dtMinutes === "00") {
          let result = crtHours - dtHours;
          let msg = this.getMessage(
            data[i].titulo,
            result,
            crtMinutes,
            dtMinutes
          );
          this.presentToast(msg, "dark", "custom-modal", 4000);
          await this.delay(5000);
        } else {
          let result = crtHours - dtHours;
          let msg = this.getMessage(
            data[i].titulo,
            result,
            crtMinutes,
            dtMinutes
          );
          this.presentToast(msg, "dark", "custom-modal", 4000);
          await this.delay(5000);
        }
      } else if (dataInicial.toString() == dataAtual.toString()) {
        if (this.currentHour === data[i].horarioInicio) {
          this.presentToast(
            `${data[i].titulo} inicia agora. Contamos com sua presença`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        } else if (this.currentHour < data[i].horarioInicio) {
          this.presentToast(
            `${data[i].titulo} inicia hoje às ${data[i].horarioInicio}. Contamos com sua presença`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        }
        else if(this.currentHour >= data[i].horarioTermino){
          this.presentToast(
            `${data[i].titulo} terminou às ${data[i].horarioTermino} hora(s). Verifique se ainda há datas marcadas.`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        }
        else if (dtMinutes === "00") {
          let result = crtHours - dtHours;
          let msg = this.getMessage(
            data[i].titulo,
            result,
            crtMinutes,
            dtMinutes
          );
          this.presentToast(msg, "dark", "custom-modal", 4000);
          await this.delay(5000);
        } else {
          let result = crtHours - dtHours;
          let msg = this.getMessage(
            data[i].titulo,
            result,
            crtMinutes,
            dtMinutes
          );
          this.presentToast(msg, "dark", "custom-modal", 4000);
          await this.delay(5000);
        }
      } else if (dataFinal.toString() == dataAtual.toString()) {
        if (this.currentHour === data[i].horarioInicio) {
          this.presentToast(
            `${data[i].titulo} está chegando ao fim. Hoje é o último dia. Contamos com sua presença.`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        } else if (this.currentHour < data[i].horarioInicio) {
          this.presentToast(
            `${data[i].titulo} inicia às ${data[i].horarioInicio}. Hoje é o último dia. Contamos com sua presença.`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        }
        else if(this.currentHour >= data[i].horarioTermino){
          this.presentToast(
            `${data[i].titulo} terminou às ${data[i].horarioTermino} hora(s). Verifique se ainda há datas marcadas.`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        }
        else if (dtMinutes === "00") {
          let result = crtHours - dtHours;
          let msg = this.getMessage(
            data[i].titulo,
            result,
            crtMinutes,
            dtMinutes
          );
          this.presentToast(msg, "dark", "custom-modal", 4000);
          await this.delay(5000);
        } else {
          let result = crtHours - dtHours;
          let msg = this.getMessage(
            data[i].titulo,
            result,
            crtMinutes,
            dtMinutes
          );
          this.presentToast(msg, "dark", "custom-modal", 4000);
          await this.delay(5000);
        }
      } else if (
        currentFullDate > data[i].dataInicio &&
        currentFullDate < data[i].dataFinal
      ) {
        //   if (currentHour === data[i].horario) {
        //     this.presentToast(
        //       `${data[i].titulo} está começando.`,
        //       "dark",
        //       "custom-modal",
        //       4000
        //     );
        //     await this.delay(5000);
        //   } else if (currentHour < data[i].horario) {
        //     this.presentToast(
        //       `Hoje tem ${data[i].titulo} às ${data[i].horario} horas.`,
        //       "dark",
        //       "custom-modal",
        //       4000
        //     );
        //     await this.delay(5000);
        //   }
        //   // else if(crtHours >= data[i].horarioTermino){
        //   //         console.log("Culto terminou");
        //   // }
        //   else if (dtMinutes === "00") {
        //     let result = crtHours - dtHours;
        //     let msg = this.getMessage(
        //       data[i].titulo,
        //       result,
        //       crtMinutes,
        //       dtMinutes
        //     );
        //     console.log(msg);
        //     this.presentToast(msg, "dark", "custom-modal", 4000);
        //     await this.delay(5000);
        //   } else {
        //     let result = crtHours - dtHours;
        //     let msg = this.getMessage(
        //       data[i].titulo,
        //       result,
        //       crtMinutes,
        //       dtMinutes
        //     );
        //     console.log(msg);
        //     this.presentToast(msg, "dark", "custom-modal", 4000);
        //     await this.delay(5000);
        //   }
        this.showMesageNoticeByListDayOfWeek([data[i]]);
      }
    }
  }

  private getMessage(title, result, currentMinute, dataMinute) {
    var hourstring = "hora";
    var minutestring = "minuto";
    if (result === 0) {
      result += "0";
      hourstring = "horas";
    }
    if (result === 1) {
      hourstring = "hora";
    }

    if (result > 1) {
      hourstring = "horas";
    }

    if (currentMinute > "01" || dataMinute > "01") {
      minutestring = "minutos";
    }

    //return [result,hourstring,minutestring];
    return `${title} começou a ${result} ${hourstring} e ${Math.abs(
      parseInt(dataMinute) - currentMinute
    )} ${minutestring}.`;
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
      return true;
    } else {
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
          value: inputValue !== "" ? inputValue : "",
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
      return title;
    } else {
      return title;
    }
  }

  async showMessageNoticeByDayOfWeek(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].dia === this.semana[new Date().getDay()].trim()) {
        // this.presentToast(
        //   `${data[i].titulo} é hoje às ${data[i].horarioInicio}.`,
        //   "dark",
        //   "custom-modal",
        //   4000
        // );
        // await this.delay(5000);

        var dtHours = parseInt(data[i].horarioInicio.substring(0, 2));
        var dtMinutes = data[i].horarioInicio.substring(3, 5);
        if (this.currentHour === data[i].horarioInicio) {
          this.presentToast(
            `${data[i].titulo} já começou. Contamos com sua presença`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        } else if (this.currentHour < data[i].horarioInicio) {
          this.presentToast(
            `Hoje tem ${data[i].titulo} às ${data[i].horarioInicio} hora(s). Contamos com sua presença.`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        }
        else if(this.currentHour >= data[i].horarioTermino){
          this.presentToast(
            `${data[i].titulo} terminou às ${data[i].horarioTermino} hora(s).`,
            "dark",
            "custom-modal",
            4000
          );
          await this.delay(5000);
        }
        else if (dtMinutes === "00") {
          let result = this.crtHours - dtHours;
          let msg = this.getMessage(
            data[i].titulo,
            result,
            this.crtMinutes,
            dtMinutes
          );
          this.presentToast(msg, "dark", "custom-modal", 4000);
          await this.delay(5000);
        } else {
          let result = this.crtHours - dtHours;
          let msg = this.getMessage(
            data[i].titulo,
            result,
            this.crtMinutes,
            dtMinutes
          );
          this.presentToast(msg, "dark", "custom-modal", 4000);
          await this.delay(5000);
        }
      }
    }
  }

  async showMesageNoticeByListDayOfWeek(data) {
    for (let i = 0; i < data.length; i++) {
      var title = await data[i].titulo;
      var hour = await data[i].horarioInicio;
      var days = await data[i].dia.split(",");
      for (let j = 0; j < days.length; j++) {
        if (days[j].trim() === this.semana[new Date().getDay()].trim()) {
          // await this.presentToast(
          //   `${title} é hoje, às ${hour}.`,
          //   "dark",
          //   "custom-modal",
          //   4000
          // );
          // await this.delay(5000);
          var dtHours = parseInt(data[i].horarioInicio.substring(0, 2));
          var dtMinutes = data[i].horarioInicio.substring(3, 5);
          if (this.currentHour === data[i].horarioInicio) {
            this.presentToast(
              `${data[i].titulo} já começou.`,
              "dark",
              "custom-modal",
              4000
            );
            await this.delay(5000);
          } else if (this.currentHour < data[i].horarioInicio) {
            this.presentToast(
              `Hoje tem ${data[i].titulo} às ${data[i].horarioInicio} hora(s). Contamos com sua presença.`,
              "dark",
              "custom-modal",
              4000
            );
            await this.delay(5000);
          }
          else if(this.currentHour >= data[i].horarioTermino){
            this.presentToast(
              `${data[i].titulo} terminou às ${data[i].horarioTermino} hora(s).`,
              "dark",
              "custom-modal",
              4000
            );
            await this.delay(5000);
          }
          else if (dtMinutes === "00") {
            let result = this.crtHours - dtHours;
            let msg = this.getMessage(
              data[i].titulo,
              result,
              this.crtMinutes,
              dtMinutes
            );
            this.presentToast(msg, "dark", "custom-modal", 4000);
            await this.delay(5000);
          } else {
            let result = this.crtHours - dtHours;
            let msg = this.getMessage(
              data[i].titulo,
              result,
              this.crtMinutes,
              dtMinutes
            );
            this.presentToast(msg, "dark", "custom-modal", 4000);
            await this.delay(5000);
          }
        }
      }
    }
  }

  async presentAditionalModal(textInput: string, url: string) {
    const modal = await this.modalController.create({
      component: AditionalModalComponent,
      componentProps: {
        textInput: textInput,
        url: url,
      },
    });
    return await modal.present();
  }

  showCollapsible(collapsible) {
    collapsible.nativeElement.classList.toggle("active");
    var content = collapsible.nativeElement.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
}
