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
    private firebaseService: FirebaseService
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

  redirecionarMenuDados(campanha){
    console.log(campanha);
    this.router.navigate(['menu-dados']);
     
  }

  redirecionarAtualizarCampanha(campanha){
    console.log(campanha);
    this.router.navigate(['atualizar-campanha'], {
      queryParams: { 'id': campanha._id } 
  });
  }
  
  async deletarCampanha(id: string, urlImagem: string) { 
    console.log(id);
    await this.firebaseService.deletarImagemStorage('imagens-campanha', urlImagem);
    await this.campanhasService.remove(id).subscribe(
      success => {
        console.log('Campanha deletada com sucesso!');
        this.getCampanhas();
      },
      error => console.log('Erro ao deletar campanha!'),
      () => console.log('Finalizado com sucesso!')
    );
  }
}

