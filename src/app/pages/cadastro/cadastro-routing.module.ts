import { CultosSemanaisResolver } from './../../shared/guards/cultos-semanais/cultos-semanais.resolver';
import { NovoLembretePage } from './novo-lembrete/novo-lembrete.page';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AtualizarCampanhaPage } from "./atualizar-campanha/atualizar-campanha.page";
import { AtualizarCultoPage } from "./atualizar-culto/atualizar-culto.page";
import { CategoriasPage } from "./categorias/categorias.page";
import { NovaCampanhaPage } from "./nova-campanha/nova-campanha.page";
import { NovaOracaoPage } from "./nova-oracao/nova-oracao.page";
import { NovoCultoPage } from "./novo-culto/novo-culto.page";
import { CampanhasPage } from "./secoes-cadastro/secao-cadastro-campanhas/campanhas/campanhas.page";
import { CultosSemanaisPage } from "./secoes-cadastro/secao-cadastro-cultos/cultos-semanais/cultos-semanais.page";
import { OracoesPage } from "./secoes-cadastro/secao-cadastro-oracoes/oracoes/oracoes.page";
import { AtualizarOracaoComponent } from "./atualizar-oracao/atualizar-oracao.component";
import { AtualizarEventoPage } from './atualizar-evento/atualizar-evento.page';
import { EventosPage } from './secoes-cadastro/eventos/eventos.page';
import { NovoEventoPage } from './novo-evento/novo-evento.page';
import { AtualizarEnsaioPage } from "./atualizar-ensaio/atualizar-ensaio.page";
import { NovoEnsaioPage } from "./novo-ensaio/novo-ensaio.page";
import { EnsaiosPage } from "./secoes-cadastro/ensaios/ensaios.page";
import { AtualizarLembretePage } from './atualizar-lembrete/atualizar-lembrete.page';
import { LembretesPage } from './secoes-cadastro/lembretes/lembretes.page';

const routes: Routes = [
  {
    path: "atualizar-campanha",
    component: AtualizarCampanhaPage
  },
  {
    path: "atualizar-culto",
    component: AtualizarCultoPage,
    resolve: { culto : CultosSemanaisResolver }
  },
  {
    path: "atualizar-oracao",
    component: AtualizarOracaoComponent
  },
  {
    path: "categorias",
    component: CategoriasPage
  },
  {
    path: "nova-campanha",
    component: NovaCampanhaPage
  },
  {
    path: "nova-oracao",
    component: NovaOracaoPage
  },
  {
    path: "novo-culto",
    component: NovoCultoPage
  },
  {
    path: "secao",

    children: [
      {
        path: "cultos",
        component: CultosSemanaisPage
      },

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
        path: "eventos",
        component: EventosPage
      },

      {
        path: "lembretes",
        component: LembretesPage
      }
    ]
  },
  {
    path: "novo-ensaio",
    component: NovoEnsaioPage
  },
  {
    path: "atualizar-ensaio",
    component: AtualizarEnsaioPage
  },
  {
    path: "novo-evento",
    component: NovoEventoPage
  },
  {
    path: 'atualizar-evento',
    component: AtualizarEventoPage
  },
  {
    path: 'novo-lembrete',
    component: NovoLembretePage
  },
  {
    path: 'atualizar-lembrete',
    component: AtualizarLembretePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule {}
