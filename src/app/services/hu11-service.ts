import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HU11} from '../model/hu11';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HU11Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContratosPendientes(idOrganizador: number): Observable<HU11[]> {
    return this.http.get<HU11[]>(`${this.url}/organizador/HU11/${idOrganizador}`);
  }
}
