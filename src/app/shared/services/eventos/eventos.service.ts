import { take } from "rxjs/operators";
import { environment } from "./../../../../environments/environment.prod";
import { CrudService } from "./../crud/crud.service";
import { Evento } from "./../../../models/evento";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EventosService extends CrudService<Evento> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.BASE_URL}/eventos`);
  }

  getEventsByType(eventType) {
    return this.http
      .get<Evento[]>(`${environment.BASE_URL}/eventos/tipo/${eventType}`)
      .pipe(take(1));
  }
}
