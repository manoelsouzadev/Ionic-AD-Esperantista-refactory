import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseService } from "../../../../../shared/services/firebase/firebase.service";
import { OracoesService } from './oracoes.service';
import { SharedModalService } from '../../../../../shared/services/shared-modal/shared-modal.service';

@Component({
  selector: "oracoes",
  templateUrl: "./oracoes.page.html",
  styleUrls: ["./oracoes.page.scss"]
})
export class OracoesPage implements OnInit {

  protected oracoes: any[];

  constructor(
    private router: Router,
    private oracoesService: OracoesService,
    private firebaseService: FirebaseService,
    private sharedModalService: SharedModalService
  ) {}

  ngOnInit() {}

  ionViewWillEnter(){
    this.getOracoes();
  }

  getOracoes() {
    this.oracoesService.list().subscribe(res => (this.oracoes = res));
  }

  redirecionarCategorias(){
    this.router.navigate(['cadastro/categorias']);
  }

  redirecionarNovaOracao() {
    this.router.navigate(["cadastro/nova-oracao"]);
  }

  redirecionarAtualizarOracao(oracao){
    this.router.navigate(['cadastro/atualizar-oracao'], {
      queryParams: { 'id': oracao._id }
  });
  }

  async deletarOracao(id: string, urlImagem: string) {
    if(urlImagem !== null && urlImagem !== undefined && urlImagem !== ''){
      await this.firebaseService.deletarImagemStorage('imagens-oracao', urlImagem);
    }
    await this.oracoesService.remove(id).subscribe(
      success => {
        this.sharedModalService.presentToast(
          'Oração deletada com sucesso!',
          'medium',
          'custom-modal',
          1500
        );
        this.getOracoes();
      },
      error => this.sharedModalService.presentToast(
        'Erro ao deletar oração, tente novamente!',
        'danger',
        'custom-modal',
        1500
      ),
      () => console.log('Finalizado com sucesso!')
    );
  }
}
