import { Routes } from '@angular/router';
import {LandingPage} from './componente/landing-page/landing-page';
import {OrganizadorComponent} from './componente/organizador/organizador';
import {SobreNosotros} from './componente/sobre-nosotros/sobre-nosotros';
import {ArtistaListaComponent } from './componente/artista-lista/artista-lista';
import {LoginComponent} from './componente/login-component/login-component';
import {Ayuda} from './componente/ayuda/ayuda';
import {OrganizadorListaComponent} from './componente/organizador-lista/organizador-lista';
import {CancionComponent} from './componente/cancion/cancion';
import {EventoComponent} from './componente/evento/evento';
import {ContratoComponent} from './componente/contrato/contrato';
import {CalificacionComponent} from './componente/calificacion/calificacion';
import {AcComponent} from './componente/ac/ac';
import {PagoComponent} from './componente/pago/pago';
import {HU22Component} from './componente/hu22/hu22';
import {HU24Component} from './componente/hu24/hu24';
import {HU09Component} from './componente/hu09/hu09';
import {HU10Component} from './componente/hu10/hu10';
import {HU12Component} from './componente/hu12/hu12';
import {HU13Component} from './componente/hu13/hu13';
import {HU14Component} from './componente/hu14/hu14';
import {HU15Component} from './componente/hu15/hu15';
import {HU11Component} from './componente/hu11/hu11';
import {ArtistaLanding} from './componente/artista-landing/artista-landing';
import {ArtistaComponent} from './componente/artista/artista';
import {RegisterComponent} from './componente/register-component/register-component';
import {OrganizadorLanding} from './componente/organizador-landing/organizador-landing';
import {ReportesARTLanding} from './componente/reportes-art-landing/reportes-art-landing';
import {ReportesORGLanding} from './componente/reportes-org-landing/reportes-org-landing';

export const routes: Routes = [
  {path: '', component: LandingPage, pathMatch: 'full'},
  {path: 'artista', component: ArtistaComponent},
  {path: 'artista-inicio', component: ArtistaLanding},
  {path: 'organizador-inicio', component: OrganizadorLanding},
  {path: 'reportesART-inicio', component: ReportesARTLanding},
  {path: 'reportesORG-inicio', component: ReportesORGLanding},
  {path: 'cancion', component: CancionComponent},
  {path: 'evento', component: EventoComponent},
  {path: 'contrato', component: ContratoComponent},
  {path: 'hu09', component: HU09Component},
  {path: 'hu10', component: HU10Component},
  {path: 'hu11', component: HU11Component},
  {path: 'hu12', component: HU12Component},
  {path: 'hu13', component: HU13Component},
  {path: 'hu14', component: HU14Component},
  {path: 'hu15', component: HU15Component},
  {path: 'hu22', component: HU22Component},
  {path: 'hu24', component: HU24Component},
  {path: 'pago', component: PagoComponent},
  {path: 'calificacion', component: CalificacionComponent},
  {path: 'ac', component: AcComponent},
  {path: 'Cnuevo-edit/:id', component: CancionComponent },
  {path: 'organizador', component: OrganizadorComponent},
  {path: 'Anuevo-edit/:id', component: ArtistaComponent},
  {path: 'Onuevo-edit/:id', component: OrganizadorComponent},
  {path: 'sobre-nosotros', component: SobreNosotros},
  {path: 'ayuda', component: Ayuda},
  {path: 'artistas', component: ArtistaListaComponent},
  {path: 'organizadores', component: OrganizadorListaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegisterComponent},
];
