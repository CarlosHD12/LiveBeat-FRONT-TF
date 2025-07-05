import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HU23} from '../model/hu23';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HU23Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCancionesPorArtista(idArtista: number): Observable<HU23[]> {
    return this.http.get<HU23[]>(`${this.url}/artista/HU23/${idArtista}`);
  }

  getTodasLasCanciones(): Observable<HU23[]> {
    return this.http.get<HU23[]>(`${this.url}/canciones`);
  }
}
