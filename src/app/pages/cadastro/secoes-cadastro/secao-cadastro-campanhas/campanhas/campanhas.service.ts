import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';
import { CrudService } from '../../../../../shared/services/crud/crud.service';
import { Campanha } from '../../../../../models/campanha';

@Injectable({
  providedIn: 'root'
})
export class CampanhasService extends CrudService<Campanha>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.BASE_URL}/campanhas`);
  }
}
