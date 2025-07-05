import {Evento} from './evento';

export class Contrato {
  idCo: number = 0;
  estado: boolean;
  montoTotal: number;
  fechaContrato: Date = new Date();
  evento: Evento = new Evento();
}
