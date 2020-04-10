import { OnInit, Component } from "@angular/core";
import { CampanhasService } from "./../../cadastro/secoes-cadastro/secao-cadastro-campanhas/campanhas/campanhas.service";
import { SharedModalService } from "../../../shared/services/shared-modal/shared-modal.service";
import { SharedHttpService } from "../../../shared/services/shared-http/shared-http.service";

@Component({
  selector: "app-campanhas",
  templateUrl: "./campanhas.page.html",
  styleUrls: ["./campanhas.page.scss"]
})
export class CampanhasPage implements OnInit {
  private campanhas: any[];
  private showData: boolean;
  private message: string = "Carregando...";
  private showNoData: boolean = false;

  constructor(
    private campanhasService: CampanhasService,
    private sharedModalService: SharedModalService,
    private sharedHttpService: SharedHttpService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.campanhasService.list().subscribe(res => {
      this.campanhas = res;
      this.showData = res.length === 0 ? false : true;
      if (this.showData === false){
        this.showData = true;
         this.sleep(1100).then(res => this.showNoData = true);

        this.message = "Não há campanhas para exibir no momento.";
      }else {
        this.showNoData = false;
      }
      this.sharedModalService.showMessageNotice(this.campanhas);
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async viewImage(src: string, title: string = "", description: string = "") {
    await this.sharedModalService.viewImage(src, title, description);
  }

  doRefresh(event, endpoint) {
    this.sharedHttpService
      .getData(endpoint)
      .subscribe(data => (this.campanhas = data));
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
