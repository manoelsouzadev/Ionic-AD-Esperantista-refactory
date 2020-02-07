import { Component, OnInit } from '@angular/core';

import { OracoesService } from './../../cadastro/secoes-cadastro/secao-cadastro-oracoes/oracoes/oracoes.service';
import { SharedModalService } from './../../../shared/services/shared-modal/shared-modal.service';

@Component({
  selector: 'oracoes',
  templateUrl: './oracoes.page.html',
  styleUrls: ['./oracoes.page.scss'],
})
export class OracoesPage implements OnInit {
  protected oracoes: any[];

  constructor(
    private sharedModalService: SharedModalService,
    private oracoesService: OracoesService
  ) {
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.oracoesService.list().subscribe(res => {
      this.oracoes = res;
    });
  }

  async showMessageNotice() {
    await this.sharedModalService.showMessageNotice(this.oracoes);
  }

  async viewImage(src: string, title: string = "", description: string = "") {
    await this.sharedModalService.viewImage(src, title, description);
  }
}

