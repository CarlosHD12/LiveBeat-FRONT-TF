import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AC} from '../model/ac';
import {Calificacion} from '../model/calificacion';

@Injectable({
  providedIn: 'root'
})
export class AcService {
  private url: string= environment.apiUrl
  private http:HttpClient=inject(HttpClient)
  private listaCambio = new Subject<AC[]>();

  constructor() { }
  insert(ac: AC): Observable<any> {
    return this.http.post(this.url + "/artista/contratos", ac);
  }

  list(): Observable<AC[]> {
    return this.http.get<AC[]>(this.url + '/acs');
  }

  listId(id: number): Observable<AC> {
    console.log(this.url + '/ac/' + id);
    return this.http.get<AC>(this.url + '/ac/' + id);
  }
  setList(listaNueva: AC[]) {
    this.listaCambio.next(listaNueva);
  }
  getListaCambio(): Observable<AC[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
