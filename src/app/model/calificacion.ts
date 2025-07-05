import {Artista} from './artista';
import {Organizador} from './organizador';

export class Calificacion {
  idCa: number = 0;
  comentario: string;
  recomendacion: boolean;
  valoracion: number = 0;
  organizador: Organizador = new Organizador();
  artista: Artista = new Artista();
}
