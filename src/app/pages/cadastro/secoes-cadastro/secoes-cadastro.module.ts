import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { CampanhasPage } from './secao-cadastro-campanhas/campanhas/campanhas.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CultosSemanaisPage } from './secao-cadastro-cultos/cultos-semanais/cultos-semanais.page';
import { OracoesPage } from './secao-cadastro-oracoes/oracoes/oracoes.page';

const routes: Routes = [
  {
    path: 'cultos',
    component: CultosSemanaisPage
  },
  {
    path: 'campanhas',
    component: CampanhasPage
  },
  {
    path: 'oracoes',
    component: OracoesPage
  }
];

@NgModule({
  declarations: [ CultosSemanaisPage, CampanhasPage, OracoesPage ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SecoesCadastroModule { }
