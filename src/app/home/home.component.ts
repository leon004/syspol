import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  search() {
    this.router.navigate(['/infraction']); // Asegúrate de que la ruta coincide con la configurada en tu archivo de rutas
  }
}
