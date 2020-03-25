import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "escolher-tipo-evento",
  templateUrl: "./escolher-tipo-evento.page.html",
  styleUrls: ["./escolher-tipo-evento.page.scss"]
})
export class EscolherTipoEventoPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  redirecionarEventos(eventType) {
    this.router.navigate(["listar/eventos"], {
      queryParams: {
        tipo: eventType
      }
    });
  }
}
