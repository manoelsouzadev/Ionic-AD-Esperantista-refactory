import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CultosSemanaisPage } from '../cadastro-dados/cultos-semanais/cultos-semanais.page';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: 'cultos-semanais',
    component: CultosSemanaisPage
  }
];

@NgModule({
  declarations: [ CultosSemanaisPage ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class CadastroDadosModule { }
