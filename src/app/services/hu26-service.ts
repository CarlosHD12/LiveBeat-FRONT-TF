import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HU26} from '../model/hu26';

@Injectable({
  providedIn: 'root'
})
export class HU26Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTotalPagadoPorArtista(idArtista: number): Observable<HU26[]> {
    return this.http.get<HU26[]>(`${this.url}/artista/HU26/${idArtista}`);
  }
}
