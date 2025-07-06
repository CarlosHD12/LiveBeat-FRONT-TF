import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {ContratoService} from '../../services/contrato-service';
import {EventoService} from '../../services/evento-service';
import {Evento} from '../../model/evento';
import {Contrato} from '../../model/contrato';
import {MatCard} from '@angular/material/card';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel, MatSuffix} from '@angular/material/input';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-contrato',
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
    NgIf
  ],
  templateUrl: './contrato.html',
  styleUrl: './contrato.css'
})
export class ContratoComponent {
  contratoForm : FormGroup;
  fb = inject(FormBuilder);
  contratoService: ContratoService = inject(ContratoService);
  eventoService: EventoService =  inject(EventoService);
  router = inject(Router);
  public idEventoSeleccionado:number = 0;
  lista: Evento[] = [];
  evento: Evento = new Evento();

  constructor() {
    this.contratoForm = this.fb.group({
      idCo : [''],
      estado : ['', Validators.required],
      montoTotal : ['', Validators.required],
      fechaContrato : ['', Validators.required],
      evento : ['', Validators.required],
    })
  }

  ngOnInit() {
    this.loadLista();
  }

  loadLista() {
    this.eventoService.list().subscribe({
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

    if (this.contratoForm.valid) {
      const contrato = new Contrato();

      contrato.idCo = this.contratoForm.value.idCo;
      contrato.estado = this.contratoForm.value.estado;
      contrato.montoTotal = this.contratoForm.value.montoTotal;
      contrato.fechaContrato = this.contratoForm.value.fechaContrato;

      const eventoId = this.contratoForm.value.evento;
      contrato.evento = new Evento();
      contrato.evento.idE = eventoId;

      console.log("Contrato leído del Form:", contrato);

      this.contratoService.insert(contrato).subscribe({
        next: data => {
          alert("¡Contrato registrado con éxito!");
          this.contratoService.actualizarLista();
          this.router.navigate(['/organizador-inicio']);
        },
        error: err => {
          console.error("Error al registrar contrato", err);
          alert("Hubo un error al guardar el contrato");
        }
      });
    } else {
      this.mostrarError = true;
      console.log("Formulario no válido");
    }
  }

}
