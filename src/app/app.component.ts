import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'syspol';
  private logUserData() {
    const usuario = localStorage.getItem('usuario');  // Asume que guardas el nombre de usuario como 'usuario'
    const role = localStorage.getItem('role');        // Asume que el rol está guardado como 'role'

    console.log('Datos del usuario:', { usuario, role });
  }
  ngOnInit() {
    this.logUserData();
  }

}
