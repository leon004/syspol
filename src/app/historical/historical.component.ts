import { Component, OnInit } from '@angular/core';

interface HistoricalEntry {
  folio: string;
  code: string;
  date: string;
}

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.css'
})
export class HistoricalComponent implements OnInit {
  historicalData: HistoricalEntry[] = [
    { folio: 'Folio 0428360', code: 'PMT107 (PLACAS)', date: '2024-03-05 09:43:33' },
    // Repeticion de datos para ejemplo
    { folio: 'Folio 0428360', code: 'PMT107 (PLACAS)', date: '2024-03-05 09:43:33' },
    { folio: 'Folio 0428360', code: 'PMT107 (PLACAS)', date: '2024-03-05 09:43:33' },
  ];
    constructor (){}
    ngOnInit(): void {

    }
}

