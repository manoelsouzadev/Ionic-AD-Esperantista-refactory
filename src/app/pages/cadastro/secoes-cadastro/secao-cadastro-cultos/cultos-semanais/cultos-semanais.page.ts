import { SharedModalService } from './../../../../../shared/services/shared-modal/shared-modal.service';
import { OnInit, Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CultosSemanaisService } from './cultos-semanais.service';
import { FirebaseService } from '../../../../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-cultos-semanais',
  templateUrl: './cultos-semanais.page.html',
  styleUrls: ['./cultos-semanais.page.scss'],
})
export class CultosSemanaisPage implements OnInit {

  protected form: FormGroup;
  protected cultos: any[];
  constructor(
    private router: Router,
    private cultosSemanaisService: CultosSemanaisService,
     private firebaseService: FirebaseService,
     private platform: Platform,
     private navController: NavController,
     private sharedModalService: SharedModalService
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getCultos();
  }

  getCultos() {
    this.cultosSemanaisService.list().subscribe(res => (this.cultos = res));
  }

  redirecionarNovoCulto() {
    this.router.navigate(['/novo-culto']);
  }

  redirecionarCategorias(){
    this.router.navigate(['/categorias']);

  }

  redirecionarAtualizarCulto(culto){
    console.log(culto);

    this.router.navigate(['/atualizar-culto'], {
      queryParams: { 'id': culto._id }
  });
  }

  async deletarCulto(id: string, urlImagem: string) {
    console.log(id);
    if(urlImagem !== null && urlImagem !== undefined && urlImagem !== ''){
      await this.firebaseService.deletarImagemStorage('imagens-culto', urlImagem);
    }
    await this.cultosSemanaisService.remove(id).subscribe(
      success => {
        this.sharedModalService.presentToast(
          'Culto deletado com sucesso!',
          'medium',
          'custom-modal',
          1500
        );;
        this.getCultos();
      },
      error => this.sharedModalService.presentToast(
        'Erro ao deletar culto, tente novamente!',
        'danger',
        'custom-modal',
        1500
      ),
      () => console.log('Finalizado com sucesso!')
    );
  }
}
