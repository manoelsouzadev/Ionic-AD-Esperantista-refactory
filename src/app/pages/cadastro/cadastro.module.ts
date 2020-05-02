import { SharedModule } from './../../shared/shared.module';
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
import { AtualizarOracaoComponent } from './atualizar-oracao/atualizar-oracao.component';
import { EventosPage } from './secoes-cadastro/eventos/eventos.page';
import { AtualizarEventoPage } from './atualizar-evento/atualizar-evento.page';
import { NovoEventoPage } from './novo-evento/novo-evento.page';
import { AtualizarEnsaioPage } from './atualizar-ensaio/atualizar-ensaio.page';
import { NovoEnsaioPage } from './novo-ensaio/novo-ensaio.page';
import { EnsaiosPage } from './secoes-cadastro/ensaios/ensaios.page';
import { AtualizarLembretePage } from './atualizar-lembrete/atualizar-lembrete.page';
import { LembretesPage } from './secoes-cadastro/lembretes/lembretes.page';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { NovoLembretePage } from './novo-lembrete/novo-lembrete.page';

@NgModule({
  declarations: [
    AtualizarCampanhaPage,
    AtualizarCultoPage,
    AtualizarOracaoComponent,
    CategoriasPage,
    NovaCampanhaPage,
    NovaOracaoPage,
    NovoCultoPage,
    CampanhasPage,
    CultosSemanaisPage,
    OracoesPage,
    EnsaiosPage,
    NovoEnsaioPage,
    AtualizarCampanhaPage,
    AtualizarEnsaioPage,
    NovoEventoPage,
    EventosPage,
    AtualizarEventoPage,
    LembretesPage,
    AtualizarLembretePage,
    NovoLembretePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CovalentTextEditorModule,
    ReactiveFormsModule,
    CadastroRoutingModule
  ]
})
export class CadastroModule {}
