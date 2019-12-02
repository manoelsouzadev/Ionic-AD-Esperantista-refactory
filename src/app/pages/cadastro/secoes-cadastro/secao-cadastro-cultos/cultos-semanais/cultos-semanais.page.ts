import { OnInit, Component } from '@angular/core';
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
     private firebaseService: FirebaseService
  ) {
  }

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

  redirecionarMenuDados(culto){
    console.log(culto);
    this.router.navigate(['menu-dados']);
     
  }

  redirecionarAtualizarCulto(culto){
    console.log(culto);
  
    this.router.navigate(['atualizar-culto'], {
      queryParams: { 'id': culto._id } 
  });
  }
  
  async deletarCulto(id: string, urlImagem: string) { 
    console.log(id);
    await this.firebaseService.deletarImagemStorage('imagens-culto', urlImagem);
    await this.cultosSemanaisService.remove(id).subscribe(
      success => {
        console.log('Culto deletado com sucesso!');
        this.getCultos();
      },
      error => console.log('Erro ao deletar culto!'),
      () => console.log('Finalizado com sucesso!')
    );
  }
}
