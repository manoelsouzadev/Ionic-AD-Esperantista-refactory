import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";
import { LoadingController } from "@ionic/angular";
import { CultosSemanaisService } from "../secoes-cadastro/secao-cadastro-cultos/cultos-semanais/cultos-semanais.service";
import { FirebaseService } from "../../../shared/services/firebase/firebase.service";

@Component({
  selector: "app-novo-culto",
  templateUrl: "./novo-culto.page.html",
  styleUrls: ["./novo-culto.page.scss"],
})
export class NovoCultoPage implements OnInit {
  protected form: FormGroup;
  //imgPath: string;
  //fileToUpload: any;
  protected fileImage: string = null;
  protected fileImageCamera: string = null;
  private downloadURL: string = "";
  private radioOption: string = "galeria";
  // private haveText: boolean = false;
  private aditional: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedModalService: SharedModalService,
    private loadingController: LoadingController,
    private cultosSemanaisService: CultosSemanaisService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      titulo: ["", Validators.required],
      horarioInicio: ["", Validators.required],
      horarioTermino: ["", Validators.required],
      dia: ["", Validators.required],
      descricao: ["", Validators.required],
      urlImagem: [""],
      adicional: [""],
    });

    // this.route.queryParams.subscribe((queryParams: any) => {
    //   this.setValuesOnForm(queryParams["textInputModal"]);
    // });

    // this.route.queryParams.subscribe((queryParams: any) => {
    //   this.setValuesOnForm(queryParams["textInputModal"]);
    // });
  }


  // setValuesOnForm(value) {
  //   this.form.patchValue({
  //     adicional: value,
  //   });

  //   this.aditional = value;
  // }

  // setValuesOnForm(value) {
  //   this.form.patchValue({
  //     adicional: value,
  //   });
  // }

  // clearAditionalInput() {
  //   this.form.patchValue({
  //     adicional: "",
  //   });
  // }

  // openAditionalModal() {
  //   this.sharedModalService.presentAditionalModal(
  //     this.form.get("adicional").value,
  //     "/cadastro/novo-culto"
  //   );
  // }

  // setAditionalOnForm(value){
  //   this.form.patchValue({
  //     adicional: value
  //   });
  //   console.log(this.form.value);
  // }

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

  redirecionarCultosCadastrados() {
    this.router.navigate(["cadastro/secao/cultos"]);
  }

  async salvarCulto() {
    console.log(this.form.value);
    await this.sharedModalService.presentLoadingWithOptions();

    // this.downloadURL !== null ||
    // this.downloadURL !== undefined ||
    // this.downloadURL !== ''
    /*?*/
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

    await this.cultosSemanaisService.save(this.form.value).subscribe(
      (success) => {
        this.sharedModalService.presentToast(
          "Culto salvo com sucesso!",
          "dark",
          "custom-modal",
          1500
        );
        console.log("Culto salvo com sucesso!");
        this.loadingController.dismiss();
        this.resetarForm();
      },
      (error) => {
        this.sharedModalService.presentToast(
          "Erro ao salvar culto. Tente novamente!",
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
      horarioInicio: null,
      horarioTermino: null,
      dia: null,
      descricao: null,
      adicional: null
    });
    this.fileImage = null;
    this.fileImageCamera = null;
    this.downloadURL = "";
    this.form.get("titulo").markAsUntouched();
    this.form.get("horarioInicio").markAsUntouched();
    this.form.get("horarioTermino").markAsUntouched();
    this.form.get("dia").markAsUntouched();
    this.form.get("descricao").markAsUntouched();
  }

  async openGalery() {
    await this.firebaseService
      .openGalery()
      .then((file) => {
        this.fileImage = file;
      })
      .catch((this.fileImage = null));
  }

  async uploadPicture() {
    await this.firebaseService
      .uploadPicture("imagens-culto")
      .then((downURL) => (this.downloadURL = downURL))
      .catch((this.downloadURL = null));
  }

  async takePicture() {
    await this.firebaseService
      .takePicture()
      .then((file) => {
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
      .uploadPictureBase64("imagens-culto")
      .then((downURL) => (this.downloadURL = downURL))
      .catch((this.downloadURL = null));
  }
}
