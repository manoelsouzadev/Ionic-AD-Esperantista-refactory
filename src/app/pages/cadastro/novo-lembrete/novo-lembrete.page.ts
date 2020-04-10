import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

import { LembretesService } from "./../../../shared/services/lembretes/lembretes.service";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";

@Component({
  selector: "novo-lembrete",
  templateUrl: "./novo-lembrete.page.html",
  styleUrls: ["./novo-lembrete.page.scss"],
})
export class NovoLembretePage implements OnInit {
  private form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private lembretesService: LembretesService,
    private loadingController: LoadingController,
    private sharedModalService: SharedModalService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      titulo: ["", Validators.required],
      texto: ["", Validators.required],
    });
  }

  redirecionarLembretesCadastrados() {
    this.router.navigate(["cadastro/secao/lembretes"]);
  }

  async salvarLembrete() {
    await this.sharedModalService
      .showAlertTitle(
        "Informe um título para o lembrete",
        "Este título será utilizado apenas para identificação, não sendo exibido junto ao lembrete.",
        "Cancelar",
        "Ok"
      )
      .then(async (title) => {
        if (title !== "") {
          await this.sharedModalService.presentLoadingWithOptions();
          await this.form.get('titulo').setValue(title);
          await this.lembretesService.save(this.form.value).subscribe(
            (success) => {
              this.sharedModalService.presentToast(
                "Lembrete salvo com sucesso!",
                "dark",
                "custom-modal",
                1500
              );
              console.log("Lembrete salvo com sucesso!");
              this.loadingController.dismiss();
              this.resetarForm();
            },
            (error) => {
              this.sharedModalService.presentToast(
                "Erro ao salvar lembrete. Tente novamente!",
                "danger",
                "custom-modal",
                1500
              );
            },
            () => console.log("Finalizado com sucesso!")
          );
        } else {
          this.sharedModalService.presentToast(
            "Erro ao salvar lembrete. Informe um título!",
            "danger",
            "custom-modal",
            1500
          );
        }
      })
      .catch((err) => {
        return;
      });
  }

  resetarForm() {
    this.form.patchValue({
      texto: null,
    });
    this.form.get("texto").markAsUntouched();
  }
}
