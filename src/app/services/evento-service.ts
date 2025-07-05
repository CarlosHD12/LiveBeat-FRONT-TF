import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Evento} from '../model/evento';
import {Cancion} from '../model/cancion';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private url: string= environment.apiUrl
  private http:HttpClient=inject(HttpClient)
  private listaCambio = new Subject<Evento[]>();

  constructor() { }

  insert(evento: Evento): Observable<any> {
    return this.http.post(this.url + "/organizador/eventos", evento);
  }

  list(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.url + '/eventos');
  }

  listId(id: number): Observable<Evento> {
    console.log(this.url + '/evento/' + id);
    return this.http.get<Evento>(this.url + '/evento/' + id);
  }

  update(evento: Evento): Observable<any> {
    const url = `${this.url}/organizador/modificar/evento/${evento.idE}`;
    return this.http.put(url, evento);
  }

  setList(listaNueva: Evento[]) {
    this.listaCambio.next(listaNueva);
  }
  getListaCambio(): Observable<Evento[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
