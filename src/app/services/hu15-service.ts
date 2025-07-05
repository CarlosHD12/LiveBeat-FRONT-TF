import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {HU15} from '../model/hu15';

@Injectable({
  providedIn: 'root'
})
export class HU15Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContratosPorArtista(): Observable<HU15[]> {
    return this.http.get<HU15[]>(`${this.url}/organizador/HU15`);
  }
}
