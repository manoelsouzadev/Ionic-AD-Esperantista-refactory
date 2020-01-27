import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CampanhasPage } from './campanhas.page';
import { SharedModule } from '../../../shared/shared.module';
import { CampanhasPageRoutingModule } from './campanhas.routing.module';

// const routes: Routes = [
//   {
//     path: '',
//     component: CampanhasPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CampanhasPageRoutingModule
    // RouterModule.forChild(routes)
  ],
  declarations: [CampanhasPage]
})
export class CampanhasPageModule {}
