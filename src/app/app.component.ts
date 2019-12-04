import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChildren,
  QueryList
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
    private toast: Toast
  ) {
    this.initializeApp();
    console.log(this.router.url);
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
