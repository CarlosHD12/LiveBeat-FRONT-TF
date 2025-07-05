import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ArtistaService} from '../../services/artista-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Artista} from '../../model/artista';
import {AcService} from '../../services/ac-service';
import {ContratoService} from '../../services/contrato-service';
import {Contrato} from '../../model/contrato';
import {AC} from '../../model/ac';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-ac',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './ac.html',
  styleUrl: './ac.css'
})
export class AcComponent {
  acForm: FormGroup;
  fb = inject(FormBuilder);
  acService = inject(AcService);
  contratoService = inject(ContratoService);
  artistaService = inject(ArtistaService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  public mostrarError = false;
  public listaC: Contrato[] = [];
  public listaA: Artista[] = [];

  constructor() {
    this.acForm = this.fb.group({
      idAC: [''],
      artista: ['', Validators.required],
      contrato: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadListaA();
    this.route.queryParams.subscribe(params => {
      const contratoId = params['contratoId'];
      this.loadListaC(+contratoId);
    });
  }

  loadListaC(preseleccionadoId?: number) {
    this.contratoService.list().subscribe({
      next: data => {
        this.listaC = data;

        // Si viene un ID, lo seleccionamos en el formulario
        if (preseleccionadoId) {
          const contratoExistente = data.find(c => c.idCo === preseleccionadoId);
          if (contratoExistente) {
            this.acForm.patchValue({ contrato: preseleccionadoId });
          }
        }
      },
      error: err => {
        console.error('Error al cargar contratos', err);
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

  onSubmit() {
    this.mostrarError = false; // Reinicia error

    if (this.acForm.valid) {
      const ac = new AC();

      const contratoId = this.acForm.get('contrato')?.value;
      ac.contrato = new Contrato();
      ac.contrato.idCo = contratoId;

      const artistaId = this.acForm.get('artista')?.value;
      ac.artista = new Artista();
      ac.artista.idA = artistaId;

      this.acService.insert(ac).subscribe({
        next: data => {
          alert("¡Contrato registrado exitosamente!");
          this.acService.actualizarLista();
          this.router.navigate(['/artista-inicio']);
        },
        error: err => {
          console.error("Error al registrar AC", err);
          alert("Hubo un error al guardar el contrato.");
        }
      });
    } else {
      this.mostrarError = true;
    }
  }
}
