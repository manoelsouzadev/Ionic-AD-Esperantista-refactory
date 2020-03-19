import { EscolherTipoEventoPage } from './escolher-tipo-evento/escolher-tipo-evento.page';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { CampanhasPage } from "./campanhas/campanhas.page";
import { OracoesPage } from "./oracoes/oracoes.page";
import { EventosPage } from './eventos/eventos.page';
import { EnsaiosPage } from "./ensaios/ensaios.page";

const routes: Routes = [
  {
    path: "campanhas",
    component: CampanhasPage
  },
  {
    path: "oracoes",
    component: OracoesPage
  },
  {
    path: "ensaios",
    component: EnsaiosPage
  },
  {
    path: 'eventos',
    component: EventosPage
  },
  {
    path: 'tipo-evento',
    component: EscolherTipoEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarRoutingModule {}
