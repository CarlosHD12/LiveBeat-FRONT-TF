import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HU13} from '../model/hu13';

@Injectable({
  providedIn: 'root'
})
export class HU13Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPagosPorEvento(idEvento: number): Observable<HU13[]> {
    return this.http.get<HU13[]>(`${this.url}/organizador/HU13/${idEvento}`);
  }
}
