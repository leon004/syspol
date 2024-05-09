import { Component } from '@angular/core';

@Component({
  selector: 'app-juez',
  templateUrl: './juez.component.html',
  styleUrl: './juez.component.css'
})
export class JuezComponent {
  searchText: string = '';
  cards = [
    { title: 'PFC-449-S', description: 'Nissan Sentra', additional: '2024-03-05 09:43:33' },
    // Más cards
  ];

  get filteredCards() {
    return this.cards.filter(card => card.title.toLowerCase().includes(this.searchText.toLowerCase()));
  }


}
