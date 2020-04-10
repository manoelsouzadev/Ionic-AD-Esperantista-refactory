import { LembretesService } from './../../../../shared/services/lembretes/lembretes.service';
import { SharedModalService } from './../../../../shared/services/shared-modal/shared-modal.service';
import { Platform, NavController } from '@ionic/angular';
import { FirebaseService } from './../../../../shared/services/firebase/firebase.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {markdown} from 'markdown';

@Component({
  selector: 'lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {
  protected form: FormGroup;
  protected lembretes: any[];

  constructor(
    private router: Router,
     private firebaseService: FirebaseService,
     private lembretesService: LembretesService,
     private platform: Platform,
     private navController: NavController,
     private sharedModalService: SharedModalService
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getLembretes();
  }

  getLembretes() {
    this.lembretesService.list().subscribe(res => (this.lembretes = res.map((lembrete) => ({...lembrete, texto:  markdown.toHTML(lembrete.texto.substring(0, 20))}))));
  }

  redirecionarNovoLembrete() {
    this.router.navigate(['cadastro/novo-lembrete']);
  }

  redirecionarCategorias(){
    this.router.navigate(['cadastro/categorias']);

  }

  redirecionarAtualizarLembrete(lembrete){
    this.router.navigate(['cadastro/atualizar-lembrete'], {
      queryParams: { 'id': lembrete._id }
  });
  }

  async deletarLembrete(id: string) {
    await this.lembretesService.remove(id).subscribe(
      success => {
        this.sharedModalService.presentToast(
          'Lembrete deletado com sucesso!',
          'dark',
          'custom-modal',
          1500
        );;
        this.getLembretes();
      },
      error => this.sharedModalService.presentToast(
        'Erro ao deletar lembrete, tente novamente!',
        'danger',
        'custom-modal',
        1500
      ),
      () => console.log('Finalizado com sucesso!')
    );
  }
}

