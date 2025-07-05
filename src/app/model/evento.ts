import {Organizador} from './organizador';

export class Evento {
  idE: number = 0;
  nombreEvento: string;
  fecha: Date = new Date();
  tipoEvento: string;
  descripcion: string;
  organizador: Organizador = new Organizador();
}
