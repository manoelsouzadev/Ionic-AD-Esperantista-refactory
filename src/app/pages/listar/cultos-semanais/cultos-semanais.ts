import { Culto } from './../../../models/culto';
import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import {
  ActionSheetController,
  ModalController,
  Platform
} from "@ionic/angular";

import { ConferenceData } from "../../../providers/conference-data";
import { SharedHttpService } from "../../../shared/services/shared-http/shared-http.service";
import { CultosSemanaisService } from "../../cadastro/secoes-cadastro/secao-cadastro-cultos/cultos-semanais/cultos-semanais.service";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";
import { delay } from 'rxjs/operators';

@Component({
  selector: "cultos-semanais",
  templateUrl: "cultos-semanais.html",
  styleUrls: ["./cultos-semanais.scss"]
})
export class CultosSemanaisPage {
  speakers: any[] = [];
  protected cultos: Culto[];
  private showData: boolean;
  private message: string = "Carregando...";
  private showNoData: boolean = false;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public router: Router,
    private cultosSemanaisService: CultosSemanaisService,
    public modalController: ModalController,
    private sharedModalService: SharedModalService,
    private sharedHttpService: SharedHttpService,
    private platform: Platform
  ) {}

  // ionViewDidEnter() {
  //   this.confData.getSpeakers().subscribe((speakers: any[]) => {
  //     this.speakers = speakers;
  //   });
  // }

  // goToSpeakerTwitter(speaker: any) {
  //   this.inAppBrowser.create(
  //     `https://twitter.com/${speaker.twitter}`,
  //     '_blank'
  //   );
  // }

  // async openSpeakerShare(speaker: any) {
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Share ' + speaker.name,
  //     buttons: [
  //       {
  //         text: 'Copy Link',
  //         handler: () => {
  //           console.log(
  //             'Copy link clicked on https://twitter.com/' + speaker.twitter
  //           );
  //           if (
  //             (window as any)['cordova'] &&
  //             (window as any)['cordova'].plugins.clipboard
  //           ) {
  //             (window as any)['cordova'].plugins.clipboard.copy(
  //               'https://twitter.com/' + speaker.twitter
  //             );
  //           }
  //         }
  //       },
  //       {
  //         text: 'Share via ...'
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }
  //     ]
  //   });

  //   await actionSheet.present();
  // }

  // async openContact(speaker: any) {
  //   const mode = 'ios'; // this.config.get('mode');

  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Contact ' + speaker.name,
  //     buttons: [
  //       {
  //         text: `Email ( ${speaker.email} )`,
  //         icon: mode !== 'ios' ? 'mail' : null,
  //         handler: () => {
  //           window.open('mailto:' + speaker.email);
  //         }
  //       },
  //       {
  //         text: `Call ( ${speaker.phone} )`,
  //         icon: mode !== 'ios' ? 'call' : null,
  //         handler: () => {
  //           window.open('tel:' + speaker.phone);
  //         }
  //       }
  //     ]
  //   });

  //   await actionSheet.present();
  // }
  ngOnInit() {}

  async ionViewWillEnter() {
    await this.cultosSemanaisService.list().subscribe(res => {
      this.cultos = res;
      this.showData = res.length === 0 ? false : true;
      if (this.showData === false){
        this.showData = true;
         this.sleep(1100).then(res => this.showNoData = true);

        this.message = "Não há cultos para exibir no momento.";
      }else {
        this.showNoData = false;
      }
      this.sharedModalService.showMessageNoticeByDayOfWeek(this.cultos);
    });
  }

  sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }


  async showMessageNotice() {
    await this.sharedModalService.showMessageNotice(this.cultos);
  }

  async viewImage(src: string, title: string = "", description: string = "") {
    await this.sharedModalService.viewImage(src, title, description);
  }

  doRefresh(event, endpoint) {
    this.sharedHttpService
      .getData(endpoint)
      .subscribe(data => (this.cultos = data));
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
