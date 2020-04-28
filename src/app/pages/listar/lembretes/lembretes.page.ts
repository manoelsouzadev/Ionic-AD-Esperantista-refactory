import { Component, OnInit } from "@angular/core";
import { LembretesService } from "../../../shared/services/lembretes/lembretes.service";
import { DomSanitizer } from "@angular/platform-browser";
import { markdown } from "markdown";
import { SharedHttpService } from "./../../../shared/services/shared-http/shared-http.service";

@Component({
  selector: "lembretes",
  templateUrl: "./lembretes.page.html",
  styleUrls: ["./lembretes.page.scss"],
})
export class LembretesPage implements OnInit {
  private lembretes: any[];
  private showData: boolean;
  private message: string = "Carregando...";
  private showNoData: boolean = false;

  constructor(
    private lembretesService: LembretesService,
    private sanitizer: DomSanitizer,
    private sharedHttpService: SharedHttpService
  ) {}

  ngOnInit() {
    this.lembretesService.list().subscribe((data) => {
      //(this.lembretes = data.map((element) => { return this.sanitizer.bypassSecurityTrustHtml(markdown.toHTML(element.texto))}));
      // (this.lembretes = data.map((element) => { return markdown.toHTML(element.texto)}));
      // (this.lembretes = markdown.toHTML(data));
      // console.log(this.lembretes);
      this.showData = data.length === 0 ? false : true;
      if (this.showData === false) {
        this.showData = true;
        this.sleep(1100).then((res) => (this.showNoData = true));

        this.message = "Não há lembretes para exibir no momento.";
      } else {
        this.showNoData = false;
        this.markdownToHtml(data);
      }

    });

    //   this.lembretesService
    // .list().pipe(map((value, index) => value[index]))
    // .subscribe(
    //   (data) => {
    //     (this.lembretes = data);
    //     console.log(this.lembretes);
    //   }
    // );
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  markdownToHtml(data) {
    // for(let lembrete of data) {
    //   this.lembretes = markdown.toHTML(lembrete.texto);
    // }
    this.lembretes = data.map((element) => {
      return this.sanitizer.bypassSecurityTrustHtml(
        markdown.toHTML(element.texto)
      );
    });

    console.log(this.lembretes);
  }

  doRefresh(event, endpoint) {
    this.sharedHttpService.getData(endpoint).subscribe(
      (data) =>
        (this.lembretes = data.map((element) => {
          return this.sanitizer.bypassSecurityTrustHtml(
            markdown.toHTML(element.texto)
          );
        }))
    );
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
