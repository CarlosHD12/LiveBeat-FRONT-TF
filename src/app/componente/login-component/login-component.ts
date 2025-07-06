import {Component, inject} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {Router, RouterLink} from '@angular/router';
import {LoginService} from '../../services/login-service';
import {RequestDto} from '../../model/request-dto';
import {ResponseDto} from '../../model/response-dto';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatInput,
    RouterLink,
    NgIf,
    NgStyle
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  username: String;
  password: String;
  router: Router = inject(Router);
  loginForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);
  public errorLogin: string = '';
  public successLogin: string = '';

  constructor() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      localStorage.clear(); // Limpia tokens antiguos
      console.log("Token y otros items eliminados del localStorage...");
    }
    this.loadForm();
  }

  loadForm() {
    console.log("Formulario cargado");
  }

  onSubmit() {
    this.errorLogin = '';
    this.successLogin = '';

    if (this.loginForm.valid) {
      const requestDto = new RequestDto();
      requestDto.username = this.loginForm.controls['username'].value;
      requestDto.password = this.loginForm.controls['password'].value;

      this.loginService.login(requestDto).subscribe({
        next: (data: ResponseDto) => {
          console.log("Login Roles:", data.roles);
          const rol = data.roles[0]; // Primer rol recibido

          localStorage.setItem('token', data.jwt);
          localStorage.setItem('rol', rol);

          console.log("Token guardado:", data.jwt);

          this.successLogin = "¡Login exitoso! Redirigiendo...";

          this.triggerSplashLoginAnim();

          // Esperar a que termine la animación antes de navegar
          setTimeout(() => {
            if (rol === 'ROLE_ARTISTA') {
              this.router.navigate(['/artista-inicio']);
            } else if (rol === 'ROLE_ORGANIZADOR') {
              this.router.navigate(['/organizador-inicio']);
            } else {
              console.warn("Rol no reconocido:", rol);
              this.errorLogin = "Rol no válido.";
            }
          }, 700); // Que coincida con la animación
        },
        error: (error) => {
          console.log("Error de login:", error);
          this.errorLogin = "Usuario o contraseña incorrectos. Intenta de nuevo.";
        }
      });
    } else {
      this.errorLogin = "El formulario está incompleto. ¡Llena todos los campos!";
    }
  }

  showSplash = false;
  splashStyles: { [key: string]: string } = {};

  triggerSplashLoginAnim() {
    this.splashStyles = {
      top: '50%',
      left: '50%',
      width: '50px',
      height: '50px',
      backgroundColor: '#FF7200',
      position: 'fixed',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%) scale(1)',
      transition: 'transform 0.6s ease-in-out',
      zIndex: '9999',
      pointerEvents: 'none'
    };

    this.showSplash = true;

    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 500);
  }

  showSplash2 = false;
  splashStyles2: { [key: string]: string } = {};

  triggerSplashRegistro() {
    this.splashStyles2 = {
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      backgroundColor: '#FF7200',
      zIndex: '9999',
      transform: 'scaleX(0)',
      transformOrigin: 'left center',
      transition: 'transform 0.6s ease-in-out',
    };

    this.showSplash2 = true;

    setTimeout(() => {
      this.splashStyles2 = {
        ...this.splashStyles2,
        transform: 'scaleX(1)',
      };
    });

    setTimeout(() => {
      this.router.navigate(['/registrar']);
    }, 600);
  }
}

