import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HU09} from '../model/hu09';

@Injectable({
  providedIn: 'root'
})
export class HU09Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCalificacionesRecomendadas(): Observable<HU09[]> {
    return this.http.get<HU09[]>(`${this.url}/organizador/HU09`);
  }
}
