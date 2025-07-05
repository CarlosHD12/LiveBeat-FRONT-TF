import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HU25} from '../model/hu25';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HU25Service {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEventosDisponibles(): Observable<HU25[]> {
    return this.http.get<HU25[]>(`${this.url}/artista/HU25`);
  }
}
