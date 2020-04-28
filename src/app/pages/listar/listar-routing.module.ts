import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { CampanhasPage } from "./campanhas/campanhas.page";
import { OracoesPage } from "./oracoes/oracoes.page";
import { EventosPage } from './eventos/eventos.page';
import { EnsaiosPage } from "./ensaios/ensaios.page";
import { LembretesPage } from '../listar/lembretes/lembretes.page';
import { EscolherTipoEventoPage } from './escolher-tipo-evento/escolher-tipo-evento.page';

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
  },
  {
    path: 'lembretes',
    component: LembretesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarRoutingModule {}
