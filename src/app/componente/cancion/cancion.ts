import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ArtistaService} from '../../services/artista-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CancionService} from '../../services/cancion-service';
import {Artista} from '../../model/artista';
import {Cancion} from '../../model/cancion';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-cancion',
  imports: [
    MatCardTitle,
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    MatSelect,
    MatButton,
    MatOption,
    RouterLink
  ],
  templateUrl: './cancion.html',
  styleUrl: './cancion.css'
})
export class CancionComponent {
  cancionForm : FormGroup;
  fb = inject(FormBuilder);
  cancionService: CancionService = inject(CancionService);
  artistaService: ArtistaService =  inject(ArtistaService);
  router = inject(Router);
  public idArtistaSeleccionado:number = 0;
  lista: Artista[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  artista: Artista = new Artista();
  id: number = 0;
  edicion = false;

  constructor() {
  this.cancionForm = this.fb.group({
    idC : [''],
    titulo : ['', Validators.required],
    duracion : ['', Validators.required],
    artista : ['', Validators.required],
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

  loadLista() {
    this.artistaService.list().subscribe({
      next: data => {
        this.lista = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onSubmit() {
    if (this.cancionForm.valid) {
      const cancion = new Cancion();
      cancion.idC = this.id;
      cancion.titulo = this.cancionForm.value.titulo;
      cancion.duracion = this.cancionForm.value.duracion;
      cancion.artista = new Artista();
      cancion.artista.idA = this.cancionForm.value.artista;

      if (this.edicion) {
        this.cancionService.update(cancion).subscribe(() => {
          alert("Canción actualizada!");
          this.cancionService.actualizarLista();
          this.router.navigate(['/artista-inicio']);
        });
      } else {
        this.cancionService.insert(cancion).subscribe(() => {
          alert("Canción registrada!");
          this.cancionService.actualizarLista();
          this.router.navigate(['/artista-inicio']);
        });
      }
    }
  }

  loadForm() {
    this.cancionService.listId(this.id).subscribe(data => {
      this.cancionForm.patchValue({
        idC: data.idC,
        titulo: data.titulo,
        duracion: data.duracion,
        artista: data.artista?.idA
      });
    });
  }
}
