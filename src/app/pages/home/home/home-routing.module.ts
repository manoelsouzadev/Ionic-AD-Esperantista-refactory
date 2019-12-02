import { HomeCardDetalhesPage } from './../home-card-detalhes/home-card-detalhes.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'home-card-detalhes',
    component: HomeCardDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
