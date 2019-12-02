import { environment } from '../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Culto } from '../../../models/culto';
import { CrudService } from '../../../shared/services/crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AtualizarCultoService extends CrudService<Culto>{
  constructor(protected http: HttpClient) {
    super(http, `${environment.BASE_URL}/cultos`);
  }

  /*getCultoById(id) {
    return this.http.get(`${environment.BASE_URL}${'/cultos/admin'}/${id}`);
  }

  updateCulto(id: string, dados){
    return this.http.put(`${environment.BASE_URL}${'/cultos'}/${ id }`, dados);
  }*/
}
