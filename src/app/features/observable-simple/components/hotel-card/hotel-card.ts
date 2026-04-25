import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Hotel} from '../../../../shared/models/hotel';
import {CurrencyPipe, NgClass, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-hotel-card',
  imports: [
    CurrencyPipe,
    NgClass,
  ],
  templateUrl: './hotel-card.html',
  styleUrl: './hotel-card.css',
})
export class HotelCard {
  @Input() hotelF!: Hotel;
  @Output() select = new EventEmitter<Hotel>();

  onSelect() {
    this.select.emit(this.hotelF);
  }
}
