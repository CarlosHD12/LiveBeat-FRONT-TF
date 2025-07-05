import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HU12} from '../model/hu12';

@Injectable({
  providedIn: 'root'
})
export class HU12Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContratosPorRangoFechas(startDate: string, endDate: string): Observable<HU12[]> {
    return this.http.get<HU12[]>(`${this.url}/organizador/HU12`, {
      params: { startDate, endDate }
    });
  }
}
