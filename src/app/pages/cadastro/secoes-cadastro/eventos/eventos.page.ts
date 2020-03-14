import { EventosService } from './../../../../shared/services/eventos/eventos.service';
import { SharedModalService } from './../../../../shared/services/shared-modal/shared-modal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../../shared/services/firebase/firebase.service';

@Component({
  selector: 'eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  protected form: FormGroup;
  protected eventos: any[];
  constructor(
    private router: Router,
    private eventosService: EventosService,
    private firebaseService: FirebaseService,
    private sharedModalService: SharedModalService
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getEventos();
  }

  getEventos() {
    this.eventosService.list().subscribe(res => (this.eventos = res));
  }

  redirecionarNovoEvento() {
    this.router.navigate(['cadastro/novo-evento']);
  }

  redirecionarCategorias(){
    this.router.navigate(['cadastro/categorias']);

  }

  redirecionarAtualizarEvento(evento){
    this.router.navigate(['cadastro/atualizar-evento'], {
      queryParams: { 'id': evento._id }
  });
  }

  async deletarEvento(id: string, urlImagem: string) {
    if(urlImagem !== null && urlImagem !== undefined && urlImagem !== ''){
    await this.firebaseService.deletarImagemStorage('imagens-evento', urlImagem);
    }
    await this.eventosService.remove(id).subscribe(
      success => {
        this.sharedModalService.presentToast(
          'Evento deletado com sucesso!',
          'medium',
          'custom-modal',
          1500
        );
        this.getEventos();
      },
      error => this.sharedModalService.presentToast(
        'Erro ao deletar evento, tente novamente!',
        'danger',
        'custom-modal',
        1500
      ),
      () => console.log('Finalizado com sucesso!')
    );
  }
}

