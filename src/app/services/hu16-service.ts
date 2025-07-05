import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HU16} from '../model/hu16';

@Injectable({
  providedIn: 'root'
})
export class HU16Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCancionesPorArtista(idArtista: number): Observable<HU16[]> {
    return this.http.get<HU16[]>(`${this.url}/organizador/HU16/${idArtista}`);
  }
}
