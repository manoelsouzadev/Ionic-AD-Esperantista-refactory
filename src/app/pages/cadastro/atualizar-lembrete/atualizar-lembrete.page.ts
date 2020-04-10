import { LembretesService } from "./../../../shared/services/lembretes/lembretes.service";
import { Validators } from "@angular/forms";
import { SharedModalService } from "./../../../shared/services/shared-modal/shared-modal.service";
import { LoadingController } from "@ionic/angular";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "atualizar-lembrete",
  templateUrl: "./atualizar-lembrete.page.html",
  styleUrls: ["./atualizar-lembrete.page.scss"],
})
export class AtualizarLembretePage implements OnInit {
  private form: FormGroup;
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private sharedModalService: SharedModalService,
    private lembretesService: LembretesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams["id"];
    });

    this.getLembreteById(this.id);

    this.form = this.formBuilder.group({
      id: [""],
      titulo: ["", Validators.required],
      texto: ["", Validators.required]
    });

  }

  getLembreteById(id) {
    this.lembretesService
      .loadByID(id)
      .subscribe((res) => this.popularForm(res));
  }

  popularForm(lembrete) {
    console.log(lembrete);
    this.id = lembrete._id;
    this.form = this.formBuilder.group({
      id: [lembrete._id],
      titulo: [lembrete.titulo],
      texto: [lembrete.texto],
    });
  }

  redirecionarLembretesCadastrados() {
    this.router.navigate(["cadastro/secao/lembretes"]);
  }

  // updateLembrete() {
  //   console.log(this.form.value);
  //   this.sharedModalService.presentLoadingWithOptions();
  //   this.lembretesService.save(this.form.value).subscribe(
  //     (success) => {
  //       this.loadingController.dismiss();
  //       //this.presentToast();
  //       this.sharedModalService.presentToast(
  //         "Lembrete atualizado com sucesso!",
  //         "dark",
  //         "custom-modal",
  //         1500
  //       );
  //       //this.mostrarToast();
  //       this.resetarForm();
  //       this.redirecionarLembretesCadastrados();
  //     },
  //     (error) =>
  //       this.sharedModalService.presentToast(
  //         "Erro ao atualizar lembrete, tente novamente!",
  //         "danger",
  //         "custom-modal",
  //         1500
  //       ),
  //     () => console.log("Finalizado com sucesso!")
  //   );
  // }

  async updateLembrete() {
    await this.sharedModalService
      .showAlertTitle(
        "Deseja atualizar o título do lembrete?",
        "Este título será utilizado apenas para identificação, não sendo exibido junto ao lembrete.",
        "Cancelar",
        "Ok",
        this.form.get('titulo').value
      )
      .then(async (title) => {
        if (title !== "") {
          await this.sharedModalService.presentLoadingWithOptions();
          await this.form.get('titulo').setValue(title);
          await this.lembretesService.save(this.form.value).subscribe(
            (success) => {
              this.sharedModalService.presentToast(
                "Lembrete atualizado com sucesso!",
                "dark",
                "custom-modal",
                1500
              );
              this.loadingController.dismiss();
              this.resetarForm();
              this.redirecionarLembretesCadastrados();
            },
            (error) => {
              this.sharedModalService.presentToast(
                "Erro ao atualizar lembrete. Tente novamente!",
                "danger",
                "custom-modal",
                1500
              );
            },
            () => console.log("Finalizado com sucesso!")
          );
        } else {
          this.sharedModalService.presentToast(
            "Erro ao atualizar o lembrete. Informe um título!",
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
  }
}
