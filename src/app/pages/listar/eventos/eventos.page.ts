import { Component, OnInit } from '@angular/core';

import { SharedHttpService } from './../../../shared/services/shared-http/shared-http.service';
import { SharedModalService } from './../../../shared/services/shared-modal/shared-modal.service';
import { EventosService } from './../../../shared/services/eventos/eventos.service';

@Component({
  selector: 'eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  private eventos: any[];

  constructor(
    private eventosService: EventosService,
    private sharedModalService: SharedModalService,
    private sharedHttpService: SharedHttpService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.eventosService.list().subscribe(res => {
      this.eventos = res;
      this.sharedModalService.showMessageNotice(this.eventos);
    });
  }

  async viewImage(src: string, title: string = "", description: string = "") {
    await this.sharedModalService.viewImage(src, title, description);
  }

  doRefresh(event, endpoint) {
    this.sharedHttpService
      .getData(endpoint)
      .subscribe(data => (this.eventos = data));
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}

