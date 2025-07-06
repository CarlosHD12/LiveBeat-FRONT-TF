import {Component, inject} from '@angular/core';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {ArtistaService} from '../../services/artista-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatCard} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {Artista} from '../../model/artista';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-artista',
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatInput,
    MatInputModule,//add
    MatNativeDateModule,//add
    MatDatepickerModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './artista.html',
  styleUrl: './artista.css'
})
export class ArtistaComponent {
  artistaForm : FormGroup;
  fb = inject(FormBuilder);
  artistaService: ArtistaService = inject(ArtistaService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  id: number = 0;
  edition = false

  constructor() {
    this.artistaForm = this.fb.group({
      idA : [''],
      nombreArtista : ['', Validators.required],
      genero : ['', Validators.required],
      biografia : ['', Validators.required],
      disponible : ['', [Validators.required]],
      canciones : ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edition = data['id']!=null;
      this.cargaForm();
    })
  }

  cargaForm() {
    if (this.edition) {
      this.artistaService.listId(this.id).subscribe((data: Artista)=>{
        console.log(data);//json de la api
        this.artistaForm.patchValue({
          nombreArtista:data.nombreArtista,
          genero:data.genero,
          biografia:data.biografia,
          disponible:data.disponible,
          canciones:data.canciones,
        })
      })
    }
  }

  public errorRegistro: string = '';

  onSubmit() {
    console.log("Enviando artista");
    this.errorRegistro = '';

    if (this.artistaForm.valid) {
      const artista: Artista = new Artista();
      artista.idA = this.id;
      artista.nombreArtista = this.artistaForm.value.nombreArtista;
      artista.genero = this.artistaForm.value.genero;
      artista.biografia = this.artistaForm.value.biografia;
      artista.disponible = this.artistaForm.value.disponible;
      artista.canciones = this.artistaForm.value.canciones;

      if (!this.edition) {
        console.log(artista);
        this.artistaService.insert(artista).subscribe({
          next: (data: Artista) => {
            this.artistaService.actualizarLista();
            console.log("Datos actualizados:", data);
            this.router.navigate(['/artista-inicio']);
          },
          error: (err) => {
            console.error("Error al registrar artista", err);
            this.errorRegistro = "Error al registrar el artista. Intenta nuevamente.";
          }
        });
      } else {
        this.artistaService.update(artista).subscribe({
          next: (data: Artista) => {
            this.artistaService.actualizarLista();
            console.log("Datos actualizados:", data);
            this.router.navigate(['/artista-inicio']);
          },
          error: (err) => {
            console.error("Error al actualizar artista", err);
            this.errorRegistro = "Error al actualizar los datos. Vuelve a intentarlo.";
          }
        });
      }

    } else {
      this.errorRegistro = "El formulario tiene campos vacíos o inválidos.";
    }
  }
}
