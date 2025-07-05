import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Evento} from '../../model/evento';
import {EventoService} from '../../services/evento-service';
import {OrganizadorService} from '../../services/organizador-service';
import {Organizador} from '../../model/organizador';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatNativeDateModule, MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';

@Component({
  selector: 'app-evento',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
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
    MatButton,
    RouterLink
  ],
  templateUrl: './evento.html',
  styleUrl: './evento.css'
})
export class EventoComponent {
  eventoForm : FormGroup;
  fb = inject(FormBuilder);
  eventoService: EventoService = inject(EventoService);
  organizadorService: OrganizadorService =  inject(OrganizadorService);
  router = inject(Router);
  public idOrganizadorSeleccionado:number = 0;
  lista: Organizador[] = [];
  organizador: Organizador = new Organizador();

  constructor() {
    this.eventoForm = this.fb.group({
      idE : [''],
      nombreEvento : ['', Validators.required],
      fecha : ['', Validators.required],
      tipoEvento : ['', Validators.required],
      descripcion : ['', Validators.required],
      organizador : ['', Validators.required],
    })
  }

  ngOnInit() {
    this.loadLista();
  }

  loadLista() {
    this.organizadorService.list().subscribe({
      next: data => {
        this.lista = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onSubmit() {
    if (this.eventoForm.valid) {
      const evento = new Evento();

      evento.idE = this.eventoForm.value.idE;
      evento.nombreEvento = this.eventoForm.value.nombreEvento;
      evento.fecha = this.eventoForm.value.fecha;
      evento.tipoEvento = this.eventoForm.value.tipoEvento;
      evento.descripcion = this.eventoForm.value.descripcion;

      const organizadorId = this.eventoForm.value.organizador;
      evento.organizador = new Organizador();
      evento.organizador.idO = organizadorId;

      console.log("Evento leído del Form:", evento);

      this.eventoService.insert(evento).subscribe({
        next: data => {
          alert("Evento registrado!");
          this.eventoService.actualizarLista();
          this.router.navigate(['']);
        },
        error: err => {
          console.error("Error al registrar evento", err);
          alert("Hubo un error al guardar la evento");
        }
      });
    } else {
      alert("Formulario no válido!");
      console.log("Formulario no válido!");
    }
  }
}
