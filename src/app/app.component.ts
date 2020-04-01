import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
  OnDestroy
} from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";
import {
  MenuController,
  Platform,
  ToastController,
  PopoverController,
  ActionSheetController,
  ModalController,
  IonRouterOutlet,
  NavController
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage } from "@ionic/storage";

import { UserData } from "./providers/user-data";
import { Toast } from "@ionic-native/toast/ngx";
import { Subscription } from "rxjs";
import { SharedModalService } from "./shared/services/shared-modal/shared-modal.service";
import { SharedColorService } from "./shared/services/shared-color/shared-color.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  subscription: Subscription;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  appPages = [
    {
      title: "Home",
      url: "/app/tabs/home",
      icon: "home"
    },
    {
      title: "Cultos",
      url: "/app/tabs/cultos",
      icon: "contacts"
    },
    {
      title: "Campanhas",
      url: "/listar/campanhas",
      icon: "flame"
    },
    {
      title: "Orações",
      url: "/listar/oracoes",
      icon: "time"
    },
    {
      title: "Ensaios",
      url: "/listar/ensaios",
      icon: "microphone"
    },
    {
      title: "Eventos",
      url: "/listar/tipo-evento",
      icon: "people"
    },
    {
      title: "Administrador",
      url: "/app/tabs/login",
      icon: "settings"
    },
    {
      title: "Sobre",
      url: "/app/tabs/sobre",
      icon: "information-circle"
    }
  ];
  loggedIn = false;
  dark = false;



  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private toast: Toast,
    private sharedModalService: SharedModalService,
    private navController: NavController,
    private sharedColorService: SharedColorService
  ) {
    this.initializeApp();
    //this.backButtonEvent();
  }

  //   backButtonEvent() {
  //    this.subscription = this.platform.backButton.subscribeWithPriority(999999999,() => {
  //         this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
  //         if (this.router.url === '/app/tabs/home') {
  //             navigator['app'].exitApp();
  //         } else {
  //             window.history.back();
  //         }
  //         });
  //     });
  // }

  // ionViewDidLeave(){
  //   this.subscription.unsubscribe();
  //  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      // close action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {}

      // close popover
      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {}

      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);
      }

      // close side menua
      try {
        const element = await this.menu.getOpen();
        if (element !== null) {
          this.menu.close();
        }
      } catch (error) {}

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (this.router.url === "/login") {
          //   this.platform.backButton.subscribe(async () => {
          // this.router.navigate(["/app/tabs/home"]);
          window.history.back();
          //   });
        }
        // if (
        //   this.router.url === "/app/tabs/cultos" ||
        // this.router.url === "/app/tabs/login" ||
        // this.router.url === "/app/tabs/sobre" //||
        // this.router.url === "/login" //||
        //this.router.url === "/menu-dados"
        // ) {
        //   this.navController.back();
        /*if ( this.router.url === '/app/tabs/cultos' || this.router.url === '/app/tabs/login') {
               this.router.navigate(['/app/tabs/home']);*/

        //  } else if(this.router.url === '/menu-dados'){
        //   this.router.navigate(['/app/tabs/login']);
        // } else
        if (this.router.url === "/app/tabs/home") {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            // this.platform.exitApp(); // Exit from app
            navigator["app"].exitApp(); // work in ionic 4
          } else {
            this.sharedModalService.presentToast(
              `Pressione novamente para sair do aplicativo.`,
              "medium",
              "custom-modal",
              2000
            );

            this.lastTimeBackPress = new Date().getTime();
          }
        } //else if(this.router.url === '/app/tabs/cultos'){
        //   this.router.navigate(['/app/tabs/home']);

        // }else if(this.router.url === 'app/tabs/login'){
        //   this.router.navigate(['/app/tabs/home']);
        // }
      });
    });
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: "Update available!",
        showCloseButton: true,
        position: "bottom",
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backButtonEvent();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener("user:login", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:signup", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:logout", () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl("/app/tabs/schedule");
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set("ion_did_tutorial", false);
    this.router.navigateByUrl("/tutorial");
  }
}
