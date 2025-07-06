import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {Router, RouterLink} from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {LoginService} from '../../services/login-service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-register-component',
  imports: [
    MatCard,
    MatFormField,
    MatSelect,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatOption,
    RouterLink,
  ],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {
  listaRoles = [
    { value: 'ARTISTA', label: 'Artista' },
    { value: 'ORGANIZADOR', label: 'Organizador' }
  ];

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rolId: ['', Validators.required],
    });
  }

  registrarUsuario() {
    const formData = this.registerForm.value;

    // Paso 1: Crear el usuario
    this.loginService.crearUsuario({
      username: formData.username,
      password: formData.password,
    }).subscribe({
      next: (res: any) => {
        console.log('Usuario creado:', res);

        // Paso 2: Asignar rol
        this.loginService.asignarRol(res.id, formData.rolId).subscribe({
          next: () => {
            alert('Usuario registrado correctamente');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Error asignando rol', err);
          },
        });
      },
      error: (err) => {
        console.error('Error creando usuario', err);
      }
    });
  }
}
