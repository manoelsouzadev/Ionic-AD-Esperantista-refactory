import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";
import { LoadingController } from "@ionic/angular";
import { FirebaseService } from "../../../shared/services/firebase/firebase.service";
import { EventosService } from './../../../shared/services/eventos/eventos.service';

@Component({
  selector: 'novo-evento',
  templateUrl: './novo-evento.page.html',
  styleUrls: ['./novo-evento.page.scss'],
})
export class NovoEventoPage implements OnInit {
  private form: FormGroup;
  protected fileImage: string;
  protected fileImageCamera: string = null;
  private downloadURL: string;
  private radioOption: string = "galeria";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedModalService: SharedModalService,
    private loadingController: LoadingController,
    private eventosService: EventosService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      titulo: ["", Validators.required],
      horario: ["", Validators.required],
      dataInicio: ["", Validators.required],
      dataFinal: ["", Validators.required],
      dia: ["", Validators.required],
      tipo: ["Interno", Validators.required],
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

  redirecionarEventosCadastrados() {
    this.router.navigate(["cadastro/secao/eventos"]);
  }

  async salvarEvento() {
    await this.sharedModalService.presentLoadingWithOptions();
    if (this.fileImage !== undefined && this.fileImage !== null) {
      await this.uploadPicture();
      await this.form.get("urlImagem").setValue(this.downloadURL);
    } else if (
      this.fileImageCamera !== undefined &&
      this.fileImageCamera !== null
    ) {
      await this.uploadPictureBase64();
      await this.form.get("urlImagem").setValue(this.downloadURL);
    } else {
      await this.form.get("urlImagem").setValue("");
    }
    await this.form.get("dia").setValue(this.form.get("dia").value + "");
    await this.eventosService.save(this.form.value).subscribe(
      success => {
        this.sharedModalService.presentToast(
          "Evento salvo com sucesso!",
          "medium",
          "custom-modal",
          1500
        );
        this.loadingController.dismiss();
        this.resetarForm();
      },
      error =>
        this.sharedModalService.presentToast(
          "Erro ao salvar evento. Tente novamente!",
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
      dataInicio: null,
      dataFinal: null,
      dia: null,
      descricao: null
    });
    this.fileImage = null;
    this.downloadURL = null;
    this.fileImageCamera = null;
    this.form.get("titulo").markAsUntouched();
    this.form.get("horario").markAsUntouched();
    this.form.get("dataInicio").markAsUntouched();
    this.form.get("dataFinal").markAsUntouched();
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
}
