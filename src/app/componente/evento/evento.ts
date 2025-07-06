import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Evento} from '../../model/evento';
import {EventoService} from '../../services/evento-service';
import {OrganizadorService} from '../../services/organizador-service';
import {Organizador} from '../../model/organizador';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-evento',
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
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;
  edicion = false;

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
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = this.id != null;
      if (this.edicion) {
        this.loadForm();
      }
    });
  }


  loadForm() {
    this.eventoService.listId(this.id).subscribe(data => {
      this.eventoForm.patchValue({
        idE: data.idE,
        nombreEvento: data.nombreEvento,
        fecha: data.fecha,
        tipoEvento: data.tipoEvento,
        descripcion: data.descripcion,
        organizador: data.organizador?.idO
      });
    });
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

  public mostrarError = false;

  onSubmit() {
    this.mostrarError = false;

    if (this.eventoForm.valid) {
      const evento = new Evento();

      evento.idE = this.id; // Usamos el id si estamos editando
      evento.nombreEvento = this.eventoForm.value.nombreEvento;
      evento.fecha = this.eventoForm.value.fecha;
      evento.tipoEvento = this.eventoForm.value.tipoEvento;
      evento.descripcion = this.eventoForm.value.descripcion;

      const organizadorId = this.eventoForm.value.organizador;
      evento.organizador = new Organizador();
      evento.organizador.idO = organizadorId;

      console.log("Evento leído del Form:", evento);

      if (this.edicion) {
        this.eventoService.update(evento).subscribe({
          next: () => {
            alert("¡Evento actualizado con éxito!");
            this.eventoService.actualizarLista();
            this.router.navigate(['/organizador-inicio']);
          },
          error: err => {
            console.error("Error al actualizar el evento", err);
            alert("Hubo un error al actualizar el evento");
          }
        });
      } else {
        this.eventoService.insert(evento).subscribe({
          next: () => {
            alert("¡Evento registrado con éxito!");
            this.eventoService.actualizarLista();
            this.router.navigate(['/organizador-inicio']);
          },
          error: err => {
            console.error("Error al registrar el evento", err);
            alert("Hubo un error al guardar el evento");
          }
        });
      }
    } else {
      this.mostrarError = true;
      console.log("Formulario no válido");
    }
  }
}
