import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { CampanhasPage } from './secao-cadastro-campanhas/campanhas/campanhas.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CultosSemanaisPage } from './secao-cadastro-cultos/cultos-semanais/cultos-semanais.page';

const routes: Routes = [
  {
    path: 'cultos',
    component: CultosSemanaisPage
  },
  {
    path: 'campanhas',
    component: CampanhasPage
  }
];

@NgModule({
  declarations: [ CultosSemanaisPage, CampanhasPage ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SecoesCadastroModule { }
