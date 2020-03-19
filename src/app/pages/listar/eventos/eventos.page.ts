import { Evento } from './../../../models/eventos';
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { SharedHttpService } from "./../../../shared/services/shared-http/shared-http.service";
import { SharedModalService } from "./../../../shared/services/shared-modal/shared-modal.service";
import { EventosService } from "./../../../shared/services/eventos/eventos.service";

@Component({
  selector: "eventos",
  templateUrl: "./eventos.page.html",
  styleUrls: ["./eventos.page.scss"]
})
export class EventosPage implements OnInit {
  private eventos: Evento[];
  private eventType: string;

  constructor(
    private eventosService: EventosService,
    private sharedModalService: SharedModalService,
    private sharedHttpService: SharedHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.eventType = queryParams["tipo"];
    });

    this.eventosService.getEventsByType(this.eventType).subscribe(res => {
      this.eventos = res;
      this.sharedModalService.showMessageNotice(this.eventos);
    });
  }

  async viewImage(src: string, title: string = "", description: string = "") {
    await this.sharedModalService.viewImage(src, title, description);
  }

  doRefresh(event, endpoint) {
    // this.sharedHttpService
    //   .getData(endpoint)
    //   .subscribe(data => (this.eventos = data));
    this.eventosService.getEventsByType(this.eventType).subscribe(res => {
      this.eventos = res;
    });
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
