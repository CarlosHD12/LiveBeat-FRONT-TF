import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HU22} from '../model/hu22';

@Injectable({
  providedIn: 'root'
})
export class HU22Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEventosContratados(idArtista: number): Observable<HU22[]> {
    return this.http.get<HU22[]>(`${this.url}/artista/HU22/${idArtista}`);
  }
}
