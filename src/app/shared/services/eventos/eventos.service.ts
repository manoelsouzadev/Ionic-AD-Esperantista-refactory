import { environment } from './../../../../environments/environment.prod';
import { CrudService } from './../crud/crud.service';
import { Evento } from './../../../models/eventos';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventosService extends CrudService<Evento>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.BASE_URL}/eventos`);
  }
}
