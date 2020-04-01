import { EnsaiosService } from "./../../../shared/services/ensaio/ensaios.service";
import { FirebaseService } from "./../../../shared/services/firebase/firebase.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoadingController } from "@ionic/angular";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";

@Component({
  selector: "atualizar-ensaio",
  templateUrl: "./atualizar-ensaio.page.html",
  styleUrls: ["./atualizar-ensaio.page.scss"]
})
export class AtualizarEnsaioPage implements OnInit {
  private form: FormGroup;
  private id: string;
  private urlImagem: string;
  private downloadURL: string;
  private fileImage: any = null;
  private fileImageCamera: string = null;
  private radioOption: string = "galeria";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ensaioService: EnsaiosService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private sharedModalService: SharedModalService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams["id"];
    });

    this.getEnsaioById(this.id);

    this.form = this.formBuilder.group({
      titulo: ["", Validators.required],
      horario: ["", Validators.required],
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

  getEnsaioById(id) {
    this.ensaioService.loadByID(id).subscribe(res => this.popularForm(res));
  }

  popularForm(ensaio) {
    this.id = ensaio._id;
    let diaFormatado = ensaio.dia.split(",");
    this.form = this.formBuilder.group({
      id: [ensaio._id],
      titulo: [ensaio.titulo],
      horario: [ensaio.horario],
      dia: [diaFormatado],
      descricao: [ensaio.descricao],
      urlImagem: [ensaio.urlImagem]
    });
    this.urlImagem = ensaio.urlImagem;
  }

  redirecionarEnsaiosCadastrados() {
    this.router.navigate(["cadastro/secao/ensaios"]);
  }

  updateEnsaio() {
    this.sharedModalService.presentLoadingWithOptions();
    this.ensaioService.save(this.form.value).subscribe(
      success => {
        this.loadingController.dismiss();
        //this.presentToast();
        this.sharedModalService.presentToast(
          "Ensaio atualizado com sucesso!",
          "dark",
          "custom-modal",
          1500
        );
        //this.mostrarToast();
        this.resetarForm();
        this.redirecionarEnsaiosCadastrados();
      },
      error =>
        this.sharedModalService.presentToast(
          "Erro ao atualizar ensaio, tente novamente!",
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
      dia: null,
      descricao: null,
      urlImagem: null
    });
    this.fileImage = null;
    this.fileImageCamera = null;
    this.urlImagem = null;
    this.downloadURL = null;
  }

  //Futuramente excluido
  // async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: "Culto atualizado!",
  //     color: "success",
  //     mode: "ios",
  //     position: "top",
  //     cssClass: "custom-modal",
  //     duration: 1500
  //   });
  //   toast.present();
  // }
  // async openGalery() {
  //   await this.firebaseService
  //     .openGalery();
  // }

  async openGalery() {
    await this.firebaseService
      .openGalery()
      .then(file => (this.fileImage = file))
      .catch((this.fileImage = null));
  }

  // async alterarImagem() {
  //   await this.sharedModalService.presentLoadingWithOptions();
  //   await this.firebaseService.deletarImagemStorage(
  //     "imagens-culto",
  //     this.form.get('urlImagem').value
  //   );
  //   await this.uploadPicture();
  //   await this.form.get("urlImagem").setValue(this.downloadURL);
  //   //await alert("alterarImagem" + "  " + this.form.get("urlImagem").value);
  //   //await alert("alterarImagem" + "  " + this.form.value);

  //   await this.cultosSemanaisService.save(this.form.value).subscribe(
  //     success => {
  //       this.sharedModalService.presentToast(
  //         "Imagem alterada com sucesso!",
  //         "success",
  //         "custom-modal",
  //         1500
  //       );
  //       this.loadingController.dismiss();
  //       this.resetarForm();
  //       this.redirecionarCultosCadastrados();
  //     },
  //     error => this.sharedModalService.presentToast(
  //       "Erro ao alterar imagem, tente novamente mais tarde!",
  //       "error",
  //       "custom-modal",
  //       1500
  //     ),
  //     () => console.log("Finalizado com sucesso!")
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
          "imagens-ensaio",
          this.form.get("urlImagem").value
        );
      }
      await this.uploadPicture();
      await this.form.get("urlImagem").setValue(this.downloadURL);

      await this.ensaioService.save(this.form.value).subscribe(
        success => {
          this.sharedModalService.presentToast(
            "Imagem alterada com sucesso!",
            "dark",
            "custom-modal",
            1500
          );
          this.loadingController.dismiss();
          this.resetarForm();
          this.redirecionarEnsaiosCadastrados();
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

  async uploadPicture() {
    await this.firebaseService
      .uploadPicture("imagens-ensaio")
      .then(downURL => (this.downloadURL = downURL))
      .catch((this.downloadURL = null));
  }

  // mostrarToast() {
  //   this.toast.show(`I'm a toast`, "5000", "center").subscribe(toast => {
  //     console.log(toast);
  //   });
  //}

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
      .uploadPictureBase64("imagens-ensaio")
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
          "imagens-ensaio",
          this.form.get("urlImagem").value
        );
      }
      await this.uploadPictureBase64();
      await this.form.get("urlImagem").setValue(this.downloadURL);
      await this.form.get("dia").setValue(this.form.get("dia").value + "");
      await this.ensaioService.save(this.form.value).subscribe(
        success => {
          this.sharedModalService.presentToast(
            "Imagem alterada com sucesso!",
            "medium",
            "custom-modal",
            1500
          );
          this.loadingController.dismiss();
          this.resetarForm();
          this.redirecionarEnsaiosCadastrados();
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
            "imagens-ensaio",
            this.form.get("urlImagem").value
          );

          await this.form.get("urlImagem").setValue("");
          await this.ensaioService.save(this.form.value).subscribe(
            success => {
              this.sharedModalService.presentToast(
                "A imagem foi excluída!",
                "medium",
                "custom-modal",
                1500
              );
              this.resetarForm();
              this.redirecionarEnsaiosCadastrados();
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
