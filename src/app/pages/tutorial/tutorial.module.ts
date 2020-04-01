import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TutorialPage } from './tutorial';
import { TutorialPageRoutingModule } from './tutorial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TutorialPageRoutingModule,
    SharedModule
  ],
  declarations: [TutorialPage],
  entryComponents: [TutorialPage],
})
export class TutorialModule {}
