import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

import { CrudService } from '../crud/crud.service';
import { Lembrete } from '../../../models/lembrete';


@Injectable({
  providedIn: 'root'
})
export class LembretesService extends CrudService<Lembrete> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.BASE_URL}/lembretes`);
  }
}
