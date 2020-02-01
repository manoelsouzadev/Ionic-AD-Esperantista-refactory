import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';
import { CrudService } from '../../../../../shared/services/crud/crud.service';
import { Oracao } from '../../../../../models/oracao';

@Injectable({
  providedIn: 'root'
})
export class OracoesService extends CrudService<Oracao>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.BASE_URL}/oracoes`);
  }

 /* deletarCulto(id) {
    console.log(id);
    return this.http.delete(`${environment.BASE_URL}${'/cultos'}/${id}`).pipe(take(1));
  }*/
}
