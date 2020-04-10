import { LottieAnimationComponent } from './components/lottie-animation/lottie-animation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [ MainHeaderComponent, TabMenuComponent, ImageViewerComponent, LottieAnimationComponent ],
  imports: [ CommonModule, IonicModule, FormsModule, LottieAnimationViewModule.forRoot()],
  exports: [ MainHeaderComponent, TabMenuComponent, LottieAnimationComponent, LottieAnimationViewModule]
})
export class SharedModule {}
