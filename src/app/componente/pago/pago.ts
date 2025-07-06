import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {PagoService} from '../../services/pago-service';
import {ContratoService} from '../../services/contrato-service';
import {Contrato} from '../../model/contrato';
import {Pago} from '../../model/pago';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-pago',
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatFormField,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatFormField,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelect,
    MatOption,
    RouterLink,
    NgIf,
  ],
  templateUrl: './pago.html',
  styleUrl: './pago.css'
})
export class PagoComponent {
  pagoForm: FormGroup;
  fb = inject(FormBuilder);
  pagoService: PagoService = inject(PagoService);
  contratoService: ContratoService = inject(ContratoService);
  router = inject(Router);
  public idContratoSeleccionado: number = 0;
  lista: Contrato[] = [];
  contrato: Contrato = new Contrato();

  metodoPago = [
    {value:'Efectivo', nombre:'Efectivo'},
    {value:'Yape', nombre:'Yape'},
    {value:'Plin', nombre:'Plin'},
    {value:'Tarjeta', nombre:'Tarjeta'},
  ];
  constructor() {
    this.pagoForm = this.fb.group({
      idP : [''],
      fechaPago : ['', Validators.required],
      monto : ['', Validators.required],
      estadoPago : ['', Validators.required],
      metodoPago : [null, [Validators.required]],
      contrato : ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.loadLista();
  }

  loadLista() {
    this.contratoService.list().subscribe({
      next: data => {
        this.lista = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  public mostrarError = false;

  onSubmit() {
    this.mostrarError = false;

    if (this.pagoForm.valid) {
      const pago = new Pago();

      pago.idP = this.pagoForm.value.idP;
      pago.fechaPago = this.pagoForm.value.fechaPago;
      pago.monto = this.pagoForm.value.monto;
      pago.estadoPago = this.pagoForm.value.estadoPago;
      pago.metodoPago = this.pagoForm.value.metodoPago;

      const contratoId = this.pagoForm.value.contrato;
      pago.contrato = new Contrato();
      pago.contrato.idCo = contratoId;

      console.log("Pago leído del Form:", pago);

      this.pagoService.insert(pago).subscribe({
        next: data => {
          alert("¡Pago registrado con éxito!");
          this.pagoService.actualizarLista();
          this.router.navigate(['/organizador-inicio']);
        },
        error: err => {
          console.error("Error al registrar Pago", err);
          alert("Hubo un error al guardar el Pago");
        }
      });
    } else {
      this.mostrarError = true;
      console.log("Formulario no válido");
    }
  }

}
