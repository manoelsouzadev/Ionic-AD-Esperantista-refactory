import { SharedModalService } from './../../../../shared/services/shared-modal/shared-modal.service';
import { FirebaseService } from './../../../../shared/services/firebase/firebase.service';
import { EnsaiosService } from '../../../../shared/services/ensaio/ensaios.service';
import { OnInit, Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ensaios',
  templateUrl: './ensaios.page.html',
  styleUrls: ['./ensaios.page.scss'],
})
export class EnsaiosPage implements OnInit {

  protected form: FormGroup;
  protected ensaios: any[];

  constructor(
    private router: Router,
    private ensaiosService: EnsaiosService,
     private firebaseService: FirebaseService,
     private platform: Platform,
     private navController: NavController,
     private sharedModalService: SharedModalService
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getEnsaios();
  }

  getEnsaios() {
    this.ensaiosService.list().subscribe(res => (this.ensaios = res));
  }

  redirecionarNovoEnsaio() {
    this.router.navigate(['cadastro/novo-ensaio']);
  }

  redirecionarCategorias(){
    this.router.navigate(['cadastro/categorias']);

  }

  redirecionarAtualizarEnsaio(ensaio){
    this.router.navigate(['cadastro/atualizar-ensaio'], {
      queryParams: { 'id': ensaio._id }
  });
  }

  async deletarEnsaio(id: string, urlImagem: string) {
    if(urlImagem !== null && urlImagem !== undefined && urlImagem !== ''){
      await this.firebaseService.deletarImagemStorage('imagens-ensaio', urlImagem);
    }
    await this.ensaiosService.remove(id).subscribe(
      success => {
        this.sharedModalService.presentToast(
          'Ensaio deletado com sucesso!',
          'medium',
          'custom-modal',
          1500
        )
        this.getEnsaios();
      },
      error => this.sharedModalService.presentToast(
        'Erro ao deletar ensaio, tente novamente!',
        'danger',
        'custom-modal',
        1500
      ),
      () => console.log('Finalizado com sucesso!')
    );
  }
}
