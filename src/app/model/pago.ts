import {Contrato} from './contrato';

export class Pago {
  idP: number = 0;
  fechaPago: Date = new Date();
  monto: number = 0;
  estadoPago: boolean;
  metodoPago: string;
  contrato: Contrato = new Contrato();
}
