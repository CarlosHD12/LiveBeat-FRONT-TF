import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Contrato} from '../model/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private url: string= environment.apiUrl
  private http:HttpClient=inject(HttpClient)
  private listaCambio = new Subject<Contrato[]>();

  constructor() { }

  insert(contrato: Contrato): Observable<any> {
    return this.http.post(this.url + "/eventos/contrato", contrato);
  }

  list(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.url + '/contratos');
  }

  listId(id: number): Observable<Contrato> {
    console.log(this.url + '/contrato/' + id);
    return this.http.get<Contrato>(this.url + '/contrato/' + id);
  }

  update(contrato: Contrato): Observable<any> {
    const url = `${this.url}/organizador/modificar/contrato/${contrato.idCo}`;
    return this.http.put(url, contrato);
  }

  setList(listaNueva: Contrato[]) {
    this.listaCambio.next(listaNueva);
  }
  getListaCambio(): Observable<Contrato[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
