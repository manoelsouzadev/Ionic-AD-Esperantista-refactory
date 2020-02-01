import { OnInit, Component } from '@angular/core';
import { CampanhasService } from './../../cadastro/secoes-cadastro/secao-cadastro-campanhas/campanhas/campanhas.service';
import { SharedModalService } from '../../../shared/services/shared-modal/shared-modal.service';

@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.page.html',
  styleUrls: ['./campanhas.page.scss']
})
export class CampanhasPage implements OnInit {
  protected campanhas: any[];

  constructor(private campanhasService: CampanhasService,
    private sharedModalService: SharedModalService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.campanhasService.list().subscribe(res => {
      this.campanhas = res;
      console.log("cultos this: " + this.campanhas);
      this.sharedModalService.showMessageNotice(this.campanhas);
    });

  }

  async viewImage(src: string, title: string = "", description: string = "") {
    await this.sharedModalService.viewImage(src, title, description);
  }
}
