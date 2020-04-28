import { AditionalModalComponent } from './components/aditional-modal/aditional-modal.component';
import { LottieAnimationComponent } from "./components/lottie-animation/lottie-animation.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { TabMenuComponent } from "./components/tab-menu/tab-menu.component";
import { ImageViewerComponent } from "./components/image-viewer/image-viewer.component";
import { LottieAnimationViewModule } from "ng-lottie";
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return import("lottie-web");
}

@NgModule({
  declarations: [
    MainHeaderComponent,
    TabMenuComponent,
    ImageViewerComponent,
    LottieAnimationComponent,
    AditionalModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    LottieAnimationViewModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory, useCache: true }),
  ],
  exports: [
    MainHeaderComponent,
    TabMenuComponent,
    LottieAnimationComponent,
    LottieAnimationViewModule,
  ],
})
export class SharedModule {}
