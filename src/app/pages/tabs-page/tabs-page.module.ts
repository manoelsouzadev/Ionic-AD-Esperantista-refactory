import { HomeModule } from './../home/home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { LoginModule } from '../login/login.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';
import { SpeakerDetailModule } from '../speaker-detail/speaker-detail.module';
import { CultosSemanaisModule } from '../../pages/listar/cultos-semanais/cultos-semanais.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    LoginModule,
    HomeModule,
    SessionDetailModule,
    SpeakerDetailModule,
    CultosSemanaisModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
