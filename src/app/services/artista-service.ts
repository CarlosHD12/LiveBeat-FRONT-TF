import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Artista} from '../model/artista';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  private url: string= environment.apiUrl
  private http:HttpClient=inject(HttpClient)
  private listaCambio = new Subject<Artista[]>();

  constructor() { }

  insert(artista: Artista): Observable<any> {
    return this.http.post(this.url + "/artista", artista);
  }

  list(): Observable<Artista[]> {
    return this.http.get<Artista[]>(this.url + '/artistas');
  }


  listId(id: number): Observable<Artista> {
    console.log(this.url + '/artista/' + id);
    return this.http.get<Artista>(this.url + '/artista/' + id);
  }

  update(artista: Artista): Observable<any> {
    const url = `${this.url}/artista/modificar/${artista.idA}`; //cambie la ruta
    return this.http.put(url, artista);
  }

  setList(listaNueva: Artista[]) {
    this.listaCambio.next(listaNueva);
  }

  getListaCambio(): Observable<Artista[]>{
    return this.listaCambio.asObservable();
  }

  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
