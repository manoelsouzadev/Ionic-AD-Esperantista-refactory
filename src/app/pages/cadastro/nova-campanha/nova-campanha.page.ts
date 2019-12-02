import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModalService } from '../../../shared/services/shared-modal/shared-modal.service';
import { LoadingController } from '@ionic/angular';
import { CampanhasService } from '../secoes-cadastro/secao-cadastro-campanhas/campanhas/campanhas.service';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-nova-campanha',
  templateUrl: './nova-campanha.page.html',
  styleUrls: ['./nova-campanha.page.scss'],
})
export class NovaCampanhaPage implements OnInit {

  protected form: FormGroup;
  protected fileImage: string;
  private downloadURL: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedModalService: SharedModalService,
    private loadingController: LoadingController,
    private campanhasService: CampanhasService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      horario: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFinal: ['', Validators.required],
      dia: [''],
      descricao: ['', Validators.required ],
      urlImagem: ['', Validators.required]
    });
  }

  redirecionarCampanhasCadastradas(){
    this.router.navigate(['/secao/campanhas']);
   }

  async salvarCampanha() {
    console.log(this.form.get('dia').value + '');
    await this.sharedModalService.presentLoadingWithOptions();
    await this.uploadPicture();
    await this.form.get('urlImagem').setValue(this.downloadURL);
    await this.form.get('dia').setValue(this.form.get('dia').value + '');
    await this.campanhasService.save(this.form.value).subscribe(
      success => {
       console.log('Campanha salvo com sucesso!');
       this.loadingController.dismiss();
        this.resetarForm();
      },
      error => console.log('Erro ao salvar campanha!'),
      () => console.log('Finalizado com sucesso!')
    );
  }

  resetarForm() {
    this.form.patchValue({
      titulo: "",
      horario: null,
      dataInicio: null,
      dataFinal: null,
      dia: null,
      descricao: null
    });
    this.fileImage = null;
    this.downloadURL = null;
  }

   async openGalery() {
    await this.firebaseService
      .openGalery()
      .then(file => (this.fileImage = file))
      .catch((this.fileImage = null));
  }

  async uploadPicture() {
    await this.firebaseService
      .uploadPicture('imagens-campanha')
      .then(downURL => (this.downloadURL = downURL))
      .catch((this.downloadURL = null));
  }

}
