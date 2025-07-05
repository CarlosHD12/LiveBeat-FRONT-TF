import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Organizador} from '../model/organizador';
import {Artista} from '../model/artista';

@Injectable({
  providedIn: 'root'
})
export class OrganizadorService {
  private url: string= environment.apiUrl
  private http:HttpClient=inject(HttpClient)
  private listaCambio = new Subject<Organizador[]>();

  constructor() { }

  insert(organizador: Organizador): Observable<any> {
    return this.http.post(this.url + "/organizador", organizador);
  }

  list(): Observable<Organizador[]> {
    return this.http.get<Organizador[]>(this.url + '/organizadores');
  }

  listId(id: number): Observable<Organizador> {
    console.log(this.url + '/organizador/' + id);
    return this.http.get<Organizador>(this.url + '/organizador/' + id);
  }

  update(organizador: Organizador): Observable<any> {
    const url = `${this.url}/organizador/modificar/${organizador.idO}`;
    return this.http.put(url, organizador);
  }

  setList(listaNueva: Organizador[]) {
    this.listaCambio.next(listaNueva);
  }
  getListaCambio(): Observable<Organizador[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
