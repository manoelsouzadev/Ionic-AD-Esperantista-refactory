import {
  Component,
  ViewChild,
  OnInit,
  ViewChildren,
  QueryList
} from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  IonList,
  LoadingController,
  ModalController,
  ToastController,
  Config,
  IonRouterOutlet,
  MenuController,
  PopoverController,
  ActionSheetController,
  Platform
} from "@ionic/angular";

import { ScheduleFilterPage } from "../../schedule-filter/schedule-filter";
import { ConferenceData } from "../../../providers/conference-data";
import { UserData } from "../../../providers/user-data";
import { Toast } from "@ionic-native/toast/ngx";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";

@Component({
  selector: "page-schedule",
  templateUrl: "home.html",
  styleUrls: ["./home.scss"]
})
export class HomePage implements OnInit {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  // Gets a reference to the list element
  @ViewChild("scheduleList", { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = "";
  segment = "all";
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  // private lottieConfig;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    public modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private toast: Toast,
    private sharedModalService: SharedModalService
  ) {}

  ngOnInit() {
    // this.updateSchedule();
    // this.ios = this.config.get('mode') === 'ios';
    //this.backButtonEvent();
    //  this.lottieConfig = {
    //   path: 'assets/animations/two-people.json',
    //   renderer: 'canvas',
    //   autoplay: true,
    //   loop: true
    // };
  }

  appPages = [
    {
      title: "Cultos",
      url: "/app/tabs/cultos",
      icon: "contacts",
    },
    {
      title: "Campanhas",
      url: "/listar/campanhas",
      icon: "flame",
    },
    {
      title: "Orações",
      url: "/listar/oracoes",
      icon: "time",
    },
    {
      title: "Ensaios",
      url: "/listar/ensaios",
      icon: "microphone",
    },
    {
      title: "Eventos",
      url: "/listar/tipo-evento",
      icon: "people",
    }
  ];

  redirectToRoute(url: string){
    this.router.navigate([url]);
  }

  // updateSchedule() {
  //   // Close any open sliding items when the schedule updates
  //   if (this.scheduleList) {
  //     this.scheduleList.closeSlidingItems();
  //   }

  //   this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
  //     this.shownSessions = data.shownSessions;
  //     this.groups = data.groups;
  //   });
  // }

  // async presentFilter() {
  //   const modal = await this.modalCtrl.create({
  //     component: ScheduleFilterPage,
  //     componentProps: { excludedTracks: this.excludeTracks }
  //   });
  //   await modal.present();

  //   const { data } = await modal.onWillDismiss();
  //   if (data) {
  //     this.excludeTracks = data;
  //     this.updateSchedule();
  //   }
  // }

  // async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
  //   if (this.user.hasFavorite(sessionData.name)) {
  //     // woops, they already favorited it! What shall we do!?
  //     // prompt them to remove it
  //     this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
  //   } else {
  //     // remember this session as a user favorite
  //     this.user.addFavorite(sessionData.name);

  //     // create an alert instance
  //     const alert = await this.alertCtrl.create({
  //       header: 'Favorite Added',
  //       buttons: [{
  //         text: 'OK',
  //         handler: () => {
  //           // close the sliding item
  //           slidingItem.close();
  //         }
  //       }]
  //     });
  //     // now present the alert on top of all other content
  //     await alert.present();
  //   }

  // }

  // async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
  //   const alert = await this.alertCtrl.create({
  //     header: title,
  //     message: 'Would you like to remove this session from your favorites?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           // they clicked the cancel button, do not remove the session
  //           // close the sliding item and hide the option buttons
  //           slidingItem.close();
  //         }
  //       },
  //       {
  //         text: 'Remove',
  //         handler: () => {
  //           // they want to remove this session from their favorites
  //           this.user.removeFavorite(sessionData.name);
  //           this.updateSchedule();

  //           // close the sliding item and hide the option buttons
  //           slidingItem.close();
  //         }
  //       }
  //     ]
  //   });
  //   // now present the alert on top of all other content
  //   await alert.present();
  // }

  // async openSocial(network: string, fab: HTMLIonFabElement) {
  //   const loading = await this.loadingCtrl.create({
  //     message: `Posting to ${network}`,
  //     duration: (Math.random() * 1000) + 500
  //   });
  //   await loading.present();
  //   await loading.onWillDismiss();
  //   fab.close();
  // }

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
        if (this.router.url !== "/app/tabs/home") {
          // window.history.back();
        } else if (this.router.url === "/app/tabs/home") {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            // this.platform.exitApp(); // Exit from app
            navigator["app"].exitApp(); // work in ionic 4
          } else {
            this.sharedModalService.presentToast(
              `Press back again to exit App.`,
              "medium",
              "custom-modal",
              2000
            );

            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }

  redirecionarLogin() {
    this.router.navigate(["/login"]);
  }

  mostrarDetalhes() {
    this.router.navigate(["/home/home-card-detalhes"]);
  }
}
