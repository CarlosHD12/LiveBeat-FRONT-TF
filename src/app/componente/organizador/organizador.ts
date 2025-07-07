import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {OrganizadorService} from '../../services/organizador-service';
import {Organizador} from '../../model/organizador';
import {MatCard} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-organizador',
  imports: [
    MatCard,
    MatInput,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './organizador.html',
  styleUrl: './organizador.css' //poner la s en la URL?
})
export class OrganizadorComponent {
  organizadorForm : FormGroup;
  fb = inject(FormBuilder);
  organizadorService: OrganizadorService = inject(OrganizadorService);
  route :ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  id: number = 0;
  edition = false

  constructor() {
    this.organizadorForm = this.fb.group({
      idO : [''],
      nombreOrganizador : ['', Validators.required],
      direccion : ['', Validators.required],
      organizacion : ['', Validators.required],
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
      this.organizadorService.listId(this.id).subscribe((data: Organizador)=>{
        console.log(data);
        this.organizadorForm.patchValue({
          nombreOrganizador:data.nombreOrganizador,
          direccion:data.direccion,
          organizacion:data.organizacion,
        })
      })
    }
  }

  public mostrarError = false;

  onSubmit() {
    console.log("Enviando Organizador");
    this.mostrarError = false;

    if (this.organizadorForm.valid) {
      const organizador: Organizador = new Organizador();
      organizador.idO = this.id;
      organizador.nombreOrganizador = this.organizadorForm.value.nombreOrganizador;
      organizador.direccion = this.organizadorForm.value.direccion;
      organizador.organizacion = this.organizadorForm.value.organizacion;

      if (!this.edition) {
        console.log(organizador);
        this.organizadorService.insert(organizador).subscribe((data: Organizador) => {
          this.organizadorService.actualizarLista();
          console.log("Datos actualizados:", data);
          this.router.navigate(['/organizador-inicio']);
        });
      } else {
        this.organizadorService.update(organizador).subscribe((data: Organizador) => {
          this.organizadorService.actualizarLista();
          console.log("Datos actualizados:", data);
          this.router.navigate(['/organizador-inicio']);
        });
      }
    } else {
      this.mostrarError = true;
      console.log("Formulario no válido");
    }
  }
}
