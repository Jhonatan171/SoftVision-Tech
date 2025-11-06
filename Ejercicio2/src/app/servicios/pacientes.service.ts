import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string; 
}

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private pacientesSubject = new BehaviorSubject<Paciente[]>([]);
  public pacientes$: Observable<Paciente[]> = this.pacientesSubject.asObservable();

  private nextId: number = 1;

  constructor() {
    this.loadPacientes();
  }

  private loadPacientes(): void {
    const pacientes = localStorage.getItem('pacientes');
    if (pacientes) {
      const parsedPacientes: Paciente[] = JSON.parse(pacientes);
      this.pacientesSubject.next(parsedPacientes);
      this.nextId = parsedPacientes.length > 0 ? Math.max(...parsedPacientes.map(p => p.id)) + 1 : 1;
    }
  }

  private savePacientes(): void {
    localStorage.setItem('pacientes', JSON.stringify(this.pacientesSubject.getValue()));
  }

  addPaciente(paciente: Omit<Paciente, 'id'>): Paciente {
    const newPaciente: Paciente = { id: this.nextId++, ...paciente };
    const currentPacientes = this.pacientesSubject.getValue();
    this.pacientesSubject.next([...currentPacientes, newPaciente]);
    this.savePacientes();
    return newPaciente;
  }

  getPacientes(): Observable<Paciente[]> {
    return this.pacientes$;
  }
}