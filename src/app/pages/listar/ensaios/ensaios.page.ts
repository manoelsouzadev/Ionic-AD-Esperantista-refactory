import { EnsaiosService } from "./../../../shared/services/ensaio/ensaios.service";
import { Component, OnInit } from "@angular/core";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";
import { Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import {
  ActionSheetController,
  ModalController,
  Platform
} from "@ionic/angular";
import { SharedHttpService } from "../../../shared/services/shared-http/shared-http.service";


@Component({
  selector: "ensaios",
  templateUrl: "./ensaios.page.html",
  styleUrls: ["./ensaios.page.scss"]
})
export class EnsaiosPage implements OnInit {

  protected ensaios: any[];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public router: Router,
    private ensaiosService: EnsaiosService,
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
    await this.ensaiosService.list().subscribe(res => {
      this.ensaios = res;
    });
  }

  async showMessageNotice() {
    await this.sharedModalService.showMessageNotice(this.ensaios);
  }

  async viewImage(src: string, title: string = "", description: string = "") {
    await this.sharedModalService.viewImage(src, title, description);
  }

  doRefresh(event, endpoint) {
    this.sharedHttpService
      .getData(endpoint)
      .subscribe(data => (this.ensaios = data));
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
