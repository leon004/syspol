import { Component } from '@angular/core';
import { InfractionService } from '../../services/infraction.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-juez',
  templateUrl: './juez.component.html',
  styleUrls: ['./juez.component.css']
})
export class JuezComponent {
  searchText: string = '';
  infractions: any[] = [];
  filteredInfractions: any[] = [];
  constructor(private infractionService: InfractionService, private router: Router) {}

  ngOnInit() {
    this.loadInfractions();
  }

  loadInfractions() {
    this.infractionService.getAllInfractions().subscribe(
      (response: any) => {
        // Al recibir la respuesta, asigna las infracciones a infractions
        this.infractions = response;
        // Aplica el filtro al cargar las infracciones
        this.applyFilter();
      },
      (error: any) => {
        console.error('Error fetching infractions:', error);
        // Maneja el error, por ejemplo, muestra un mensaje al usuario
      }
    );
  }

  applyFilter() {
    // Si no hay texto en el campo de búsqueda, muestra todas las infracciones
    if (!this.searchText) {
      this.filteredInfractions = this.infractions;
    } else {
      // Filtra las infracciones por la descripción
      this.filteredInfractions = this.infractions.filter(
        (infraction) => infraction.descripcion.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  
  filterByRecent() {
    this.filteredInfractions = this.infractions.sort((a, b) => {
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
  }

  filterByOldest() {
    this.filteredInfractions = this.infractions.sort((a, b) => {
      return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });
  }

  filterByBrand() {
    this.filteredInfractions = this.infractions.sort((a, b) => {
      return a.marca.localeCompare(b.marca);
    });
  }

  filterByArea() {
    this.filteredInfractions = this.infractions.sort((a, b) => {
      return a.ubicacion.localeCompare(b.ubicacion);
    });
  }
  viewInfractionDetails(infraction: any) {
    this.router.navigate(['/car-detail'], { state: { infraction: infraction } });
  }
}
