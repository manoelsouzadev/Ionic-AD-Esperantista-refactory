import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtualizarCampanhaPage } from './atualizar-campanha.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizarCampanhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [AtualizarCampanhaPage]
})
export class AtualizarCampanhaPageModule {}
