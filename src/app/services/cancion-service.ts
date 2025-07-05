import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Cancion} from '../model/cancion';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
  private url: string= environment.apiUrl
  private http:HttpClient=inject(HttpClient)
  private listaCambio = new Subject<Cancion[]>();

  constructor() { }

  insert(cancion: Cancion): Observable<any> {
    return this.http.post(this.url + "/artista/canciones", cancion);
  }

  list(): Observable<Cancion[]> {
    return this.http.get<Cancion[]>(this.url + '/canciones');
  }

  listId(id: number): Observable<Cancion> {
    console.log(this.url + '/cancion/' + id);
    return this.http.get<Cancion>(this.url + '/cancion/' + id);
  }

  update(cancion: Cancion): Observable<any> {
    const url = `${this.url}/artista/modificar/cancion/${cancion.idC}`; //cambie la ruta
    return this.http.put(url, cancion);
  }

  setList(listaNueva: Cancion[]) {
    this.listaCambio.next(listaNueva);
  }
  getListaCambio(): Observable<Cancion[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
