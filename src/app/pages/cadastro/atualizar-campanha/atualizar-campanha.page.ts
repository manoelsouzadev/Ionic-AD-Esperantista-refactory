import { environment } from '../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampanhasService } from '../secoes-cadastro/secao-cadastro-campanhas/campanhas/campanhas.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { SharedModalService } from '../../../shared/services/shared-modal/shared-modal.service';
import { SharedHttpService } from '../../../shared/services/shared-http/shared-http.service';
import { Toast } from '@ionic-native/toast/ngx';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-atualizar-campanha',
  templateUrl: './atualizar-campanha.page.html',
  styleUrls: ['./atualizar-campanha.page.scss'],
})
export class AtualizarCampanhaPage implements OnInit {
  protected form: FormGroup;
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campanhasService: CampanhasService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private sharedModalService: SharedModalService,
    private sharedHttpService: SharedHttpService,
    private toastController: ToastController,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams['id'];
      console.log(this.id);
    });

    this.getCampanhaById(this.id);

    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      horario: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFinal: ['', Validators.required],
      dia: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  getCampanhaById(id) {
    this.campanhasService
      .loadByID(id)
      .subscribe(res => this.popularForm(res));
  }

  popularForm(campanha){
    this.id = campanha._id;
    this.form = this.formBuilder.group({
      id: [campanha._id],
      titulo: [campanha.titulo],
      horario: [campanha.horario],
      dataInicio: [campanha.dataInicio],
      dataFinal: [campanha.dataFinal],
      dia: [campanha.dia],
      descricao: [campanha.descricao]
    });
  }

 redirecionarCampanhasCadastradas(){
  this.router.navigate([`/secao/campanhas`]);
 }

  updateCampanha() {
    this.sharedModalService.presentLoadingWithOptions();
    this.campanhasService.save(this.form.value).subscribe(
      success => {
       console.log('Campanha atualizada com sucesso!');
       this.loadingController.dismiss();
       this.presentToast();
       //this.mostrarToast();
       this.resetarForm();
       this.redirecionarCampanhasCadastradas();
      },
      error => console.log('Erro ao atualizado campanha!'),
      () => console.log('Finalizado com sucesso!')
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
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Campanha atualizada!',
      color: 'success',
      mode: 'ios',
      position: 'top',
      cssClass: 'custom-modal',
      duration: 1500
    });
    toast.present();
  }

  mostrarToast(){
    this.toast.show(`I'm a toast`, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
