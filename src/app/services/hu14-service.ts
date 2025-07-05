import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HU14} from '../model/hu14';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HU14Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMontoTotal(idContrato: number): Observable<HU14[]> {
    return this.http.get<HU14[]>(`${this.url}/organizador/HU14/${idContrato}`);
  }
}
