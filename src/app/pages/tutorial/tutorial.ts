import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { MenuController, IonSlides } from "@ionic/angular";

import { Storage } from "@ionic/storage";

@Component({
  selector: "page-tutorial",
  templateUrl: "tutorial.html",
  styleUrls: ["./tutorial.scss"]
})
export class TutorialPage {
  private showSkip: boolean = true;
  private lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  @ViewChild("slides", { static: true }) slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) {}

  ngOnInit() {
    this.lottieConfig = {
      path: "assets/animations/happy-emoji.json",
      renderer: "canvas",
      autoplay: true,
      loop: true
    };
  }

  startApp() {
    this.router
      .navigateByUrl("/app/tabs/home", { replaceUrl: true })
      .then(() => this.storage.set("ion_did_tutorial", true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get("ion_did_tutorial").then(res => {
      if (res === true) {
        this.router.navigateByUrl("/app/tabs/home", { replaceUrl: true });
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
