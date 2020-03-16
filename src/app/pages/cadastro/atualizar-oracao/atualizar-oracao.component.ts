import { FirebaseService } from "./../../../shared/services/firebase/firebase.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoadingController } from "@ionic/angular";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";
import { OracoesService } from "../secoes-cadastro/secao-cadastro-oracoes/oracoes/oracoes.service";

@Component({
  selector: "atualizar-oracao",
  templateUrl: "./atualizar-oracao.component.html",
  styleUrls: ["./atualizar-oracao.component.scss"]
})
export class AtualizarOracaoComponent implements OnInit {
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
    private oracoesService: OracoesService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private sharedModalService: SharedModalService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams["id"];
    });

    this.getOracaoById(this.id);

    this.form = this.formBuilder.group({
      titulo: ["", Validators.required],
      horario: ["", Validators.required],
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

  getOracaoById(id) {
    this.oracoesService.loadByID(id).subscribe(res => this.popularForm(res));
  }

  popularForm(oracao) {
    this.id = oracao._id;
    let diaFormatado = oracao.dia.split(",");

    this.form = this.formBuilder.group({
      id: [oracao._id],
      titulo: [oracao.titulo],
      horario: [oracao.horario],
      dataInicio: [oracao.dataInicio],
      dataFinal: [oracao.dataFinal],
      dia: [diaFormatado],
      descricao: [oracao.descricao],
      urlImagem: [oracao.urlImagem]
    });
    this.urlImagem = oracao.urlImagem;
  }

  redirecionarOracoesCadastradas() {
    this.router.navigate([`cadastro/secao/oracoes`]);
  }

  async updateOracao() {
    await this.sharedModalService.presentLoadingWithOptions();
    await this.form.get("dia").setValue(this.form.get("dia").value + "");
    await this.oracoesService.save(this.form.value).subscribe(
      success => {
        this.loadingController.dismiss();
        this.sharedModalService.presentToast(
          "Oração atualizada com sucesso!",
          "medium",
          "custom-modal",
          1500
        );
        //this.presentToast();
        //this.mostrarToast();
        this.resetarForm();
        this.redirecionarOracoesCadastradas();
      },
      error =>
        this.sharedModalService.presentToast(
          "Erro ao atualizar oração, tente novamente!",
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
      descricao: null,
      urlImagem: null
    });
    this.fileImage = null;
    this.fileImageCamera = null;
    this.urlImagem = null;
    this.downloadURL = null;
  }

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
          "imagens-campanha",
          this.form.get("urlImagem").value
        );
      }
      await this.uploadPicture();
      await this.form.get("urlImagem").setValue(this.downloadURL);
      await this.form.get("dia").setValue(this.form.get("dia").value + "");
      await this.oracoesService.save(this.form.value).subscribe(
        success => {
          this.sharedModalService.presentToast(
            "Imagem alterada com sucesso!",
            "medium",
            "custom-modal",
            1500
          );
          this.loadingController.dismiss();
          this.resetarForm();
          this.redirecionarOracoesCadastradas();
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
          "imagens-oracao",
          this.form.get("urlImagem").value
        );
      }
      await this.uploadPictureBase64();
      await this.form.get("urlImagem").setValue(this.downloadURL);
      await this.form.get("dia").setValue(this.form.get("dia").value + "");
      await this.oracoesService.save(this.form.value).subscribe(
        success => {
          this.sharedModalService.presentToast(
            "Imagem alterada com sucesso!",
            "medium",
            "custom-modal",
            1500
          );
          this.loadingController.dismiss();
          this.resetarForm();
          this.redirecionarOracoesCadastradas();
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
            "imagens-oracao",
            this.form.get("urlImagem").value
          );

          await this.form.get("urlImagem").setValue("");
          await this.form.get("dia").setValue(this.form.get("dia").value + "");
          await this.oracoesService.save(this.form.value).subscribe(
            success => {
              this.sharedModalService.presentToast(
                "A imagem foi excluída!",
                "medium",
                "custom-modal",
                1500
              );
              this.resetarForm();
              this.redirecionarOracoesCadastradas();
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
