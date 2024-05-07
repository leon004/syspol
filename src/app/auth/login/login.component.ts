import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string  = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}  // Inyecta Router aquí

  // Función para manejar el evento de login
  onLogin() {
    this.apiService.login(this.usuario, this.password);
  }

}
