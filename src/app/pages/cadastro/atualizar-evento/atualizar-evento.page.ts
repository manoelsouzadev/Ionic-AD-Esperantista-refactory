import { EventosService } from './../../../shared/services/eventos/eventos.service';
import { FirebaseService } from "./../../../shared/services/firebase/firebase.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CampanhasService } from "../secoes-cadastro/secao-cadastro-campanhas/campanhas/campanhas.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoadingController, ToastController } from "@ionic/angular";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";
import { SharedHttpService } from "../../../shared/services/shared-http/shared-http.service";
import { Toast } from "@ionic-native/toast/ngx";

@Component({
  selector: 'atualizar-evento',
  templateUrl: './atualizar-evento.page.html',
  styleUrls: ['./atualizar-evento.page.scss'],
})
export class AtualizarEventoPage implements OnInit {
  private form: FormGroup;
  private id: string;
  private urlImagem: string;
  private downloadURL: string;
  private fileImage: any = null;
  private radioOption: string = "galeria";
  private fileImageCamera: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventosService: EventosService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private sharedModalService: SharedModalService,
    private firebaseService: FirebaseService,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams["id"];
    });

    this.getEventoById(this.id);

    this.form = this.formBuilder.group({
      titulo: ["", Validators.required],
      horario: ["", Validators.required],
      local: ["", Validators.required],
      tipo: ["", Validators.required],
      dataInicio: ["", Validators.required],
      dataFinal: ["", Validators.required],
      dia: ["", Validators.required],
      descricao: ["", Validators.required],
      urlImagem: ["", Validators.required]
    });
  }

  changeRadioValue(option) {
    this.radioOption = option;
    if (option === "galeria") {
      this.fileImageCamera = null;
      this.firebaseService.resetarDados();
    } else if (option === "camera") {
      this.fileImage = null;
      this.firebaseService.resetarDados();
    }
  }

  clearInputImage(option) {
    if (option === "galeria") {
      this.fileImage = null;
      this.firebaseService.resetarDados();
    } else if (option === "camera") {
      this.fileImageCamera = null;
      this.firebaseService.resetarDados();
    }
  }

  getEventoById(id) {
    this.eventosService.loadByID(id).subscribe(res => this.popularForm(res));
  }

  popularForm(evento) {
    this.id = evento._id;
    let diaFormatado = evento.dia.split(",");
    this.form = this.formBuilder.group({
      id: [evento._id],
      titulo: [evento.titulo],
      horario: [evento.horario],
      local: [evento.local],
      tipo: [evento.tipo],
      dataInicio: [evento.dataInicio],
      dataFinal: [evento.dataFinal],
      dia: [diaFormatado],
      descricao: [evento.descricao],
      urlImagem: [evento.urlImagem]
    });
    this.urlImagem = evento.urlImagem;
  }

  redirecionarEventosCadastrados() {
    this.router.navigate([`cadastro/secao/eventos`]);
  }

  async updateEvento() {
    await this.sharedModalService.presentLoadingWithOptions();
    await this.form.get("dia").setValue(this.form.get("dia").value + "");
    await this.eventosService.save(this.form.value).subscribe(
      success => {
        this.loadingController.dismiss();
        this.sharedModalService.presentToast(
          "Evento atualizado com sucesso!",
          "dark",
          "custom-modal",
          1500
        );
        //this.presentToast();
        //this.mostrarToast();
        this.resetarForm();
        this.redirecionarEventosCadastrados();
      },
      error =>
        this.sharedModalService.presentToast(
          "Erro ao atualizar evento, tente novamente!",
          "danger",
          "custom-modal",
          1500
        ),
      () => console.log("Finalizado com sucesso!")
    );
  }

  resetarForm() {
    this.form.patchValue({
      titulo: null,
      horario: null,
      local: null,
      dataInicio: null,
      dataFinal: null,
      dia: null,
      descricao: null,
      urlImagem: null
    });
    this.fileImage = null;
    this.fileImageCamera = null;
    this.urlImagem = null;
    this.downloadURL = null;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Evento atualizado!",
      color: "success",
      mode: "ios",
      position: "top",
      cssClass: "custom-modal",
      duration: 1500
    });
    toast.present();
  }

  /*Remover este método, pois está inutilizado*/
  // mostrarToast(){
  //   this.toast.show(`I'm a toast`, '5000', 'center').subscribe(
  //     toast => {
  //       console.log(toast);
  //     }
  //   );
  // }

  async alterarImagemGaleria() {
    await this.openGalery();
    if (this.fileImage !== undefined && this.fileImage !== null) {
      await this.sharedModalService.presentLoadingWithOptions();
      if (
        this.form.get("urlImagem").value !== "" ||
        this.form.get("urlImagem").value !== null ||
        this.form.get("urlImagem").value !== undefined
      ) {
        await this.firebaseService.deletarImagemStorage(
          "imagens-evento",
          this.form.get("urlImagem").value
        );
      }
      await this.uploadPicture();
      await this.form.get("urlImagem").setValue(this.downloadURL);
      await this.form.get("dia").setValue(this.form.get("dia").value + "");
      await this.eventosService.save(this.form.value).subscribe(
        success => {
          this.sharedModalService.presentToast(
            "Imagem alterada com sucesso!",
            "dark",
            "custom-modal",
            1500
          );
          this.loadingController.dismiss();
          this.resetarForm();
          this.redirecionarEventosCadastrados();
        },
        error =>
          this.sharedModalService.presentToast(
            "Erro ao alterar imagem, tente novamente!",
            "danger",
            "custom-modal",
            1500
          ),
        () => console.log("Finalizado com sucesso!")
      );
    } else {
      return;
    }
  }

  async openGalery() {
    await this.firebaseService
      .openGalery()
      .then(file => (this.fileImage = file))
      .catch((this.fileImage = null));
  }

  async uploadPicture() {
    await this.firebaseService
      .uploadPicture("imagens-evento")
      .then(downURL => (this.downloadURL = downURL))
      .catch((this.downloadURL = null));
  }

  async takePicture() {
    await this.firebaseService
      .takePicture()
      .then(file => {
        //this.fileImage = null;
        this.fileImageCamera = file;
        //this.fileImage = file;
        //alert(this.fileImageCamera);
        // this.fileImage = file;
      })
      .catch((this.fileImageCamera = null));
  }

  async uploadPictureBase64() {
    await this.firebaseService
      .uploadPictureBase64("imagens-evento")
      .then(downURL => (this.downloadURL = downURL))
      .catch((this.downloadURL = null));
  }

  async alterarImagemCamera() {
    await this.takePicture();
    if (this.fileImageCamera !== undefined && this.fileImageCamera !== null) {
      await this.sharedModalService.presentLoadingWithOptions();
      if (
        this.form.get("urlImagem").value !== "" ||
        this.form.get("urlImagem").value !== null ||
        this.form.get("urlImagem").value !== undefined
      ) {
        await this.firebaseService.deletarImagemStorage(
          "imagens-evento",
          this.form.get("urlImagem").value
        );
      }
      await this.uploadPictureBase64();
      await this.form.get("urlImagem").setValue(this.downloadURL);
      await this.form.get("dia").setValue(this.form.get("dia").value + "");
      await this.eventosService.save(this.form.value).subscribe(
        success => {
          this.sharedModalService.presentToast(
            "Imagem alterada com sucesso!",
            "medium",
            "custom-modal",
            1500
          );
          this.loadingController.dismiss();
          this.resetarForm();
          this.redirecionarEventosCadastrados();
        },
        error =>
          this.sharedModalService.presentToast(
            "Erro ao alterar imagem, tente novamente!",
            "danger",
            "custom-modal",
            1500
          ),
        () => console.log("Finalizado com sucesso!")
      );
    } else {
      return;
    }
  }

  async deletarImagem() {
    this.sharedModalService
      .showAlertConfirm(
        "Confirmação",
        "Deseja realmente excluir esta imagem?",
        "Não",
        "Sim"
      )
      .then(async del => {
        if (del) {
          await this.firebaseService.deletarImagemStorage(
            "imagens-evento",
            this.form.get("urlImagem").value
          );

          await this.form.get("urlImagem").setValue("");
          await this.form.get("dia").setValue(this.form.get("dia").value + "");
          await this.eventosService.save(this.form.value).subscribe(
            success => {
              this.sharedModalService.presentToast(
                "A imagem foi excluída!",
                "medium",
                "custom-modal",
                1500
              );
              this.resetarForm();
              this.redirecionarEventosCadastrados();
            },
            error =>
              this.sharedModalService.presentToast(
                "Erro ao excluir imagem, tente novamente!",
                "danger",
                "custom-modal",
                1500
              ),
            () => console.log("Finalizado com sucesso!")
          );
        } else {
          return;
        }
      });
  }
}
