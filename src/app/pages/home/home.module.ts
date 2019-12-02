import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ScheduleFilterPage
  ],
  entryComponents: [
    ScheduleFilterPage
  ]
})
export class HomeModule { }
