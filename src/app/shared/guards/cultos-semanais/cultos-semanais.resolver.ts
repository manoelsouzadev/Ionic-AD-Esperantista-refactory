import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";

import { CultosSemanaisService } from "../../../pages/cadastro/secoes-cadastro/secao-cadastro-cultos/cultos-semanais/cultos-semanais.service";


@Injectable({
  providedIn: "root",
})
export class CultosSemanaisResolver implements Resolve<any> {
  constructor(private cultosSemanaisService: CultosSemanaisService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.cultosSemanaisService.loadByID(route.queryParams["id"]);
  }
}
