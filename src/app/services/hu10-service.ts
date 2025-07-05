import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HU10} from '../model/hu10';

@Injectable({
  providedIn: 'root'
})
export class HU10Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEventosPorFecha(fecha: string): Observable<HU10[]> {
    return this.http.get<HU10[]>(`${this.url}/organizador/HU10/${fecha}`);
  }
}
