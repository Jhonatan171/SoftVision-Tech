import { Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pacientes', pathMatch: 'full' }, 
  { path: 'pacientes', component: PacientesComponent },
  { path: 'especialidades', component: EspecialidadesComponent },
  { path: '**', redirectTo: '/pacientes' } 
];