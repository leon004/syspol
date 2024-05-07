import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Infraction {
  folio?: string; // Generado automáticamente
  policiaId: number; // ID del policía que registró la infracción
  placas: string; // Placas del vehículo infraccionado
  pais?: string; // País del vehículo
  estado?: string; // Estado de registro del vehículo
  marca: string; // Marca del vehículo
  modelo: string; // Modelo del vehículo
  year?: number; // Año de fabricación
  color?: string; // Color del vehículo
  motivoDeMulta: string; // Razón por la que se emite la infracción
  articuloFraccion: string; // Artículo o fracción infringida
  ubicacion: string; // Lugar donde se emitió la infracción
  nombreInfractor: string; // Nombre del conductor infraccionado
  fecha?: Date; // Fecha de la infracción
  hora?: Date; // Hora de la infracción
  imagenes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfractionService {
  private baseUrl = 'http://localhost:3000/api/infractions';

  constructor(private http: HttpClient) {}

  // Método helper para crear headers con autorización
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Manejo de errores en las solicitudes HTTP
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(
        `Código de error ${error.status}, ` +
        `Error: ${error.message}`
      );
    }
    // Retornar un observable con un mensaje de error
    return throwError('Ocurrió un error; por favor intenta nuevamente más tarde.');
  }

  // Función para crear una nueva infracción
  createInfraction(infraction: any): Observable<any> {
    return this.http.post(this.baseUrl, infraction, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Función para obtener una infracción por ID
  getInfractionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Función para actualizar una infracción por ID
  updateInfraction(id: number, infraction: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, infraction, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Función para eliminar una infracción por ID
  deleteInfraction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }
}
