import {HttpInterceptorFn, HttpStatusCode} from '@angular/common/http';
import {catchError, EMPTY, throwError} from 'rxjs';

export const loginInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Interceptor!");
  const token = localStorage.getItem("token");
  console.log("Token recuperado:", token);
  let authReq = req;
  //Clona la solicitud y añade el header de Authorization
  if(token){
    console.log("Hay token!");
    authReq = req.clone({
      withCredentials: true,
      headers: req.headers.set('Authorization', "Bearer " +
        localStorage.getItem("token")?.toString())

    });
    console.log("Se clono la solicitud");
  }
  return next(authReq).pipe(
    catchError(error => {
      if(error.status === HttpStatusCode.Forbidden){
        alert("NO TIENES PERMISOS!")
        return EMPTY;
      }else{
        return throwError(error);
      }
    }),
  );
};
