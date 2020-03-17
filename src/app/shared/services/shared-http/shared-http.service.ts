import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.prod";
import { take, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SharedHttpService {
  constructor(private http: HttpClient) {}

   getData(endpoint) {
    return  this.http
      .get<any[]>(`${environment.BASE_URL}${ endpoint }`)
      .pipe(take(1));
  }

  // postCulto(dados){
  //   return this.http.post(`${environment.BASE_URL}${'/cultos'}`, dados).pipe(take(1), map((res: any) => res.message));
  // }
}
