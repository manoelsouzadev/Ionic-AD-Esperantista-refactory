import { EnsaiosPage } from "./ensaios/ensaios.page";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { CampanhasPage } from "./campanhas/campanhas.page";
import { OracoesPage } from "./oracoes/oracoes.page";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarRoutingModule {}
