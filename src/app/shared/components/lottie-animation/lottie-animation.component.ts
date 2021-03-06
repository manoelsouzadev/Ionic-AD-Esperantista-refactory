import { Component, OnInit, Input } from "@angular/core";
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: "lottie-animation",
  templateUrl: "./lottie-animation.component.html",
  styleUrls: ["./lottie-animation.component.scss"],
})
export class LottieAnimationComponent implements OnInit {
  // private lottieConfig: Object;
  @Input() animationName: string;
  @Input() renderer: string;
  @Input() autoplay: boolean;
  @Input() loop: boolean;
  @Input() size: number;
  @Input() message: string;
  // private anim: any;
  private options: AnimationOptions;

  constructor() {}

  ngOnInit() {
    // this.lottieConfig = {
    //   path: `assets/animations/${this.animationName}`,
    //   renderer: this.renderer,
    //   autoplay: this.autoplay,
    //   loop: this.loop,
    // };

   this.options = {
     path: `/assets/animations/${this.animationName}`,
    };
  }
}
