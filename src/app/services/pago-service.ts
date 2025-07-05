import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Pago} from '../model/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url: string= environment.apiUrl
  private http:HttpClient=inject(HttpClient)
  private listaCambio = new Subject<Pago[]>();

  constructor() { }
  insert(pago: Pago): Observable<any> {
    return this.http.post(this.url + "/contrato/pagos", pago);
  }

  list(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.url + '/pagos');
  }

  listId(id: number): Observable<Pago> {
    console.log(this.url + '/pago/' + id);
    return this.http.get<Pago>(this.url + '/pago/' + id);
  }

  update(pago: Pago): Observable<any> {
    const url = `${this.url}/organizador/modificar/pago/${pago.idP}`;
    return this.http.put(url, pago);
  }

  setList(listaNueva: Pago[]) {
    this.listaCambio.next(listaNueva);
  }
  getListaCambio(): Observable<Pago[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
