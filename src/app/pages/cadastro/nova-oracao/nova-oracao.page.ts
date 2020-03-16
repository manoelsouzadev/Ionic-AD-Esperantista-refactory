import { LoadingController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";
import { FirebaseService } from "../../../shared/services/firebase/firebase.service";
import { OracoesService } from "../secoes-cadastro/secao-cadastro-oracoes/oracoes/oracoes.service";

@Component({
  selector: "nova-oracao",
  templateUrl: "./nova-oracao.page.html",
  styleUrls: ["./nova-oracao.page.scss"]
})
export class NovaOracaoPage implements OnInit {
  protected form: FormGroup;
  //imgPath: string;
  //fileToUpload: any;
  protected fileImage: string;
  private downloadURL: string;
  private fileImageCamera: string = null;
  private radioOption: string = "galeria";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedModalService: SharedModalService,
    private oracoesService: OracoesService,
    private loadingController: LoadingController,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      titulo: ["", Validators.required],
      horario: ["", Validators.required],
      dia: ["", Validators.required],
      descricao: ["", Validators.required],
      urlImagem: [""]
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

  redirecionarOracoesCadastradas() {
    this.router.navigate(["cadastro/secao/oracoes"]);
  }

  async salvarOracao() {
    console.log(this.form.value);
    await this.sharedModalService.presentLoadingWithOptions();
    if (this.fileImage !== undefined && this.fileImage !== null) {
      await this.uploadPicture();
      await this.form.get("urlImagem").setValue(this.downloadURL);
    } else {
      await this.form.get("urlImagem").setValue("");
    }
    await this.form.get("dia").setValue(this.form.get("dia").value + "");
    await this.oracoesService.save(this.form.value).subscribe(
      success => {
        this.sharedModalService.presentToast(
          "Oração salva com sucesso!",
          "medium",
          "custom-modal",
          1500
        );
        console.log("Oração salva com sucesso!");
        this.loadingController.dismiss();
        this.resetarForm();
      },
      error => {
        this.sharedModalService.presentToast(
          "Erro ao salvar oração. Tente novamente!",
          "danger",
          "custom-modal",
          1500
        );
      },
      () => console.log("Finalizado com sucesso!")
    );
  }

  resetarForm() {
    this.form.patchValue({
      titulo: null,
      horario: null,
      dia: null,
      descricao: null
    });
    this.fileImage = null;
    this.downloadURL = null;
    this.fileImageCamera = null;
    this.form.get("titulo").markAsUntouched();
    this.form.get("horario").markAsUntouched();
    this.form.get("dia").markAsUntouched();
    this.form.get("descricao").markAsUntouched();
  }

  async openGalery() {
    await this.firebaseService
      .openGalery()
      .then(file => (this.fileImage = file))
      .catch((this.fileImage = null));
  }

  async uploadPicture() {
    await this.firebaseService
      .uploadPicture("imagens-oracao")
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
      .uploadPictureBase64("imagens-oracao")
      .then(downURL => (this.downloadURL = downURL))
      .catch((this.downloadURL = null));
  }
}
