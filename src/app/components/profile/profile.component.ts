import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');  // Eliminar el token de autenticación
    this.router.navigate(['/login']);  // Redirigir al usuario al login
  }
}
