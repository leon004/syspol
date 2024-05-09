import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'http://localhost:3000/api'; // URL base de la API

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, password: string) {
    const url = `${this.baseURL}/users/login`; // Endpoint de login
    const body = { usuario, password }; // Cuerpo de la solicitud

    this.http.post<any>(url, body).subscribe(response => {
        localStorage.setItem('token', response.token); // Guardar el token
        localStorage.setItem('role', response.user.rol);  // Guardar el rol del usuario
        localStorage.setItem('usuario', JSON.stringify(response.user)); // Guardar todos los datos del usuario como una cadena JSON
        localStorage.setItem('policeId', response.user.id); // Guardar el ID del usuario

        this.router.navigate(['/home']); // Redirigir al home o a otra página según el rol
    }, error => {
        console.error('Error en el login', error);
        return throwError(() => new Error(error.error.message || 'Error desconocido al intentar iniciar sesión.'));
    });
  }
}
