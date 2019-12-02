import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';

@NgModule({
  declarations: [ MainHeaderComponent, TabMenuComponent, ImageViewerComponent ],
  imports: [ CommonModule, IonicModule, FormsModule],
  exports: [ MainHeaderComponent, TabMenuComponent ]
})
export class SharedModule {}
