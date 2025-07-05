import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RequestDto} from '../model/request-dto';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl;
  private baseUrl = 'http://localhost:8080';
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  login(requestDto: RequestDto): Observable<any> {
    console.log("Enviando:", requestDto)
    return this.http.post(this.url + "/authenticate", requestDto,
      {observe: 'response'}).pipe(map((response) => {
        const body = response.body;
        console.log("Body:", body)
        const headers = response.headers;
        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer ', '');
        console.log("Authorization:", bearerToken)
        localStorage.setItem('token', token);
        return body;
      }
    ));
  }

  crearUsuario(usuario: any) {
    return this.http.post(`${this.baseUrl}/user`, usuario);
  }

  asignarRol(userId: number, rolId: number) {
    return this.http.post(`${this.baseUrl}/save/${userId}/${rolId}`, {});
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
