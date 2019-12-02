import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';
import { take } from 'rxjs/operators';
import { CrudService } from '../../../../../shared/services/crud/crud.service';
import { Culto } from '../../../../../models/culto';

@Injectable({
  providedIn: 'root'
})
export class CultosSemanaisService extends CrudService<Culto>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.BASE_URL}/cultos`);
  }

 /* deletarCulto(id) {
    console.log(id);
    return this.http.delete(`${environment.BASE_URL}${'/cultos'}/${id}`).pipe(take(1));
  }*/
}
