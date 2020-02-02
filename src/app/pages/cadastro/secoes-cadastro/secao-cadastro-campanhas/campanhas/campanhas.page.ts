import { SharedModalService } from './../../../../../shared/services/shared-modal/shared-modal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CampanhasService } from './campanhas.service';
import { FirebaseService } from '../../../../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.page.html',
  styleUrls: ['./campanhas.page.scss'],
})
export class CampanhasPage implements OnInit {

  protected form: FormGroup;
  protected campanhas: any[];
  constructor(
    private router: Router,
    private campanhasService: CampanhasService,
    private firebaseService: FirebaseService,
    private sharedModalService: SharedModalService
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getCampanhas();
  }

  getCampanhas() {
    this.campanhasService.list().subscribe(res => (this.campanhas = res));
  }

  redirecionarNovaCampanha() {
    this.router.navigate(['/nova-campanha']);
  }

  redirecionarCategorias(){
    this.router.navigate(['/categorias']);

  }

  redirecionarAtualizarCampanha(campanha){
    console.log(campanha);
    this.router.navigate(['/atualizar-campanha'], {
      queryParams: { 'id': campanha._id }
  });
  }

  async deletarCampanha(id: string, urlImagem: string) {
    console.log(id);
    if(urlImagem !== null && urlImagem !== undefined && urlImagem !== ''){
    await this.firebaseService.deletarImagemStorage('imagens-campanha', urlImagem);
    }
    await this.campanhasService.remove(id).subscribe(
      success => {
        this.sharedModalService.presentToast(
          'Campanha deletada com sucesso!',
          'medium',
          'custom-modal',
          1500
        );
        this.getCampanhas();
      },
      error => this.sharedModalService.presentToast(
        'Erro ao deletar campanha, tente novamente!',
        'danger',
        'custom-modal',
        1500
      ),
      () => console.log('Finalizado com sucesso!')
    );
  }
}

