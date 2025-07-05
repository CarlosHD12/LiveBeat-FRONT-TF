import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HU07} from '../model/hu07';

@Injectable({
  providedIn: 'root'
})
export class HU07Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getListaDeGeneros(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/generos`);
  }

  getArtistasPorGenero(genero: string): Observable<HU07[]> {
    return this.http.get<HU07[]>(`${this.url}/organizador/HU07/${genero}`);
  }
}
