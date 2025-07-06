import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {CalificacionService} from '../../services/calificacion-service';
import {OrganizadorService} from '../../services/organizador-service';
import {Organizador} from '../../model/organizador';
import {ArtistaService} from '../../services/artista-service';
import {Artista} from '../../model/artista';
import {Calificacion} from '../../model/calificacion';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-calificacion',
  imports: [
    FormsModule,
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './calificacion.html',
  styleUrl: './calificacion.css'
})
export class CalificacionComponent {
  calificacionForm: FormGroup;
  fb = inject(FormBuilder);
  calificacionService = inject(CalificacionService);
  organizadorService = inject(OrganizadorService);
  artistaService = inject(ArtistaService);
  router = inject(Router);

  public listaO: Organizador[] = [];
  public listaA: Artista[] = [];
  public calificacion = new Calificacion();

  constructor() {
    this.calificacionForm = this.fb.group({
      idCa: [''],
      comentario: ['', Validators.required],
      recomendacion: ['', Validators.required],
      valoracion: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      organizador: ['', Validators.required],
      artista: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadListaO();
    this.loadListaA();
  }

  loadListaO() {
    this.organizadorService.list().subscribe({
      next: data => {
        this.listaO = data;
      },
      error: err => {
        console.error('Error al cargar organizadores', err);
      }
    });
  }

  loadListaA() {
    this.artistaService.list().subscribe({
      next: data => {
        this.listaA = data;
      },
      error: err => {
        console.error('Error al cargar artistas', err);
      }
    });
  }

  public mostrarError = false;

  onSubmit() {
    this.mostrarError = false;

    if (this.calificacionForm.valid) {
      const calificacion = new Calificacion();

      calificacion.comentario = this.calificacionForm.value.comentario;
      calificacion.recomendacion = this.calificacionForm.value.recomendacion;
      calificacion.valoracion = this.calificacionForm.value.valoracion;

      const organizadorId = this.calificacionForm.get('organizador')?.value;
      calificacion.organizador = new Organizador();
      calificacion.organizador.idO = organizadorId;

      const artistaId = this.calificacionForm.get('artista')?.value;
      calificacion.artista = new Artista();
      calificacion.artista.idA = artistaId;

      console.log("Calificación leída del Form:", calificacion);

      this.calificacionService.insert(calificacion).subscribe({
        next: data => {
          alert("¡Calificación registrada con éxito!");
          this.calificacionService.actualizarLista();
          this.router.navigate(['/organizador-inicio']);
        },
        error: err => {
          console.error("Error al registrar calificación", err);
          alert("Hubo un error al guardar la calificación");
        }
      });
    } else {
      this.mostrarError = true;
      console.log("Formulario no válido");
    }
  }
}
