import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { CadastroRoutingModule } from "./cadastro-routing.module";
import { AtualizarCampanhaPage } from "./atualizar-campanha/atualizar-campanha.page";
import { AtualizarCultoPage } from "./atualizar-culto/atualizar-culto.page";
import { CategoriasPage } from "./categorias/categorias.page";
import { NovaCampanhaPage } from "./nova-campanha/nova-campanha.page";
import { NovaOracaoPage } from "./nova-oracao/nova-oracao.page";
import { NovoCultoPage } from "./novo-culto/novo-culto.page";
import { CampanhasPage } from "./secoes-cadastro/secao-cadastro-campanhas/campanhas/campanhas.page";
import { CultosSemanaisPage } from "./secoes-cadastro/secao-cadastro-cultos/cultos-semanais/cultos-semanais.page";
import { OracoesPage } from "./secoes-cadastro/secao-cadastro-oracoes/oracoes/oracoes.page";

@NgModule({
  declarations: [
    AtualizarCampanhaPage,
    AtualizarCultoPage,
    CategoriasPage,
    NovaCampanhaPage,
    NovaOracaoPage,
    NovoCultoPage,
    CampanhasPage,
    CultosSemanaisPage,
    OracoesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadastroRoutingModule
  ]
})
export class CadastroModule {}
