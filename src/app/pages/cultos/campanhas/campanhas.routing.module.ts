import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampanhasPage } from './campanhas.page';

const routes: Routes = [
  {
    path: '',
    component: CampanhasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampanhasPageRoutingModule {}
