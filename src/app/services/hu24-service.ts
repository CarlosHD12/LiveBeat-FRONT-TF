import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HU24} from '../model/hu24';

@Injectable({
  providedIn: 'root'
})
export class HU24Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCalificaciones(idArtista: number): Observable<HU24[]> {
    return this.http.get<HU24[]>(`${this.url}/artista/HU24/${idArtista}`);
  }
}
