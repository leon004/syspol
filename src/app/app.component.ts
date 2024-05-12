import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private router: Router) {}
  title = 'syspol';
  
  private logUserData() {
    const usuario = localStorage.getItem('usuario');  // Asume que guardas el nombre de usuario como 'usuario'
    const role = localStorage.getItem('role');        // Asume que el rol está guardado como 'role'

    console.log('Datos del usuario:', { usuario, role });
  }
  
  ngOnInit() {
    this.logUserData();
    initFlowbite();
  }
  isJuezModule(): boolean {
    // Verifica si la ruta actual pertenece al módulo "juez"
    return this.router.url.includes('/juez');
    
  }
  isCarDetailModule(): boolean {
    return this.router.url.startsWith('/car-detail');
  }

  logout() {
    localStorage.removeItem('token');  // Eliminar el token de autenticación
    this.router.navigate(['/login']);  // Redirigir al usuario al login
  }

}