import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../crud/crud.service';
import { Ensaio } from '../../../models/ensaio';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnsaiosService extends CrudService<Ensaio> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.BASE_URL}/ensaios`);
  }
}
