import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CultosSemanaisPage } from './cultos-semanais';
import { CultosSemanaisPageRoutingModule } from './cultos-semanais-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CultosSemanaisPageRoutingModule
  ],
  declarations: [CultosSemanaisPage],
})
export class CultosSemanaisModule {}
