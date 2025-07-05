import {Artista} from './artista';

export class Cancion {
  idC: number = 0;
  titulo: string;
  duracion: number = 0;
  artista: Artista = new Artista();
}
