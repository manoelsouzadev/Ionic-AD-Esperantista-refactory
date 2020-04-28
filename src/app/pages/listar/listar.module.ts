import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { CampanhasPage } from "./campanhas/campanhas.page";
import { ListarRoutingModule } from "./listar-routing.module";
import { SharedModule } from "./../../shared/shared.module";
import { OracoesPage } from "./oracoes/oracoes.page";
import { EnsaiosPage } from "./ensaios/ensaios.page";
import { EventosPage } from "./eventos/eventos.page";
import { LembretesPage } from '../listar/lembretes/lembretes.page';
import { EscolherTipoEventoPage } from './escolher-tipo-evento/escolher-tipo-evento.page';

@NgModule({
  declarations: [CampanhasPage, OracoesPage, EnsaiosPage, EventosPage, EscolherTipoEventoPage, LembretesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    ListarRoutingModule
  ]
})
export class ListarModule {}
