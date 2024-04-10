import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<any[]> {
    return this.http.get<any[]>('../assets/marcas.json');
  }
  getModelosPorMarca(marca: string): Observable<string[]> {
    return this.http.get<{[key: string]: string[]}>('../assets/modelos.json').pipe(
      map(modelos => modelos[marca] || [])
    );
  }
  getEstados(): Observable<any[]> {
    return this.http.get<any[]>('../assets/estados.json');
  }
  getYears(): Observable<any[]> {
    return this.http.get<any[]>('/assets/years.json');
  }

  getColores(): Observable<any[]> {
    return this.http.get<any[]>('/assets/colors.json');
  }

  getMotivosByArticulo(articulo: string) {
    return this.http.get<any[]>('/assets/infraccion_motivos.json').pipe(
      map(motivos => motivos.filter(m => m.articulo === articulo))
    );
  }

  getFraccionesByTipo(tipo: number) {
    return this.http.get<any[]>('/assets/infraccion_fraccion.json').pipe(
      map(fracciones => fracciones.filter(f => f.tipo === tipo))
    );
  }

  getIncisosByFraccion(fraccionId: string) {
    return this.http.get<any[]>('/assets/infraccion_inciso.json').pipe(
      map(incisos => incisos.filter(i => i.fraccion === fraccionId))
    );
  }
}
