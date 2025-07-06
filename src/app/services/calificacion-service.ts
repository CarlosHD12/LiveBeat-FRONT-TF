import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Calificacion} from '../model/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private url: string= environment.apiUrl
  private http:HttpClient=inject(HttpClient)
  private listaCambio = new Subject<Calificacion[]>();

  constructor() { }

  insert(calificacion: Calificacion): Observable<any> {
    return this.http.post(this.url + "/organizador/calificar", calificacion);
  }

  list(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.url + '/calificaciones');
  }

  listId(id: number): Observable<Calificacion> {
    console.log(this.url + '/calificacion/' + id);
    return this.http.get<Calificacion>(this.url + '/calificacion/' + id);
  }
  setList(listaNueva: Calificacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getListaCambio(): Observable<Calificacion[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
