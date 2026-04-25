import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HotelService} from '../../services/hotel-service';
import {Hotel} from '../../../../shared/models/hotel';
import {Subscription} from 'rxjs';
import {HotelCard} from '../../components/hotel-card/hotel-card';


@Component({
  selector: 'app-hotel-list',
  imports: [
    HotelCard
  ],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css',
})
export class HotelList implements OnInit, OnDestroy {

  hotels: Hotel[] = [];
  loading: boolean = false;
  error: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private readonly serviceHotel: HotelService ,  private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadHotels();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

 loadHotels() {
    this.loading = true;
   this.cdr.markForCheck();
    this.error = null;
    this.subscription.add(this.serviceHotel.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        console.log('Mes data hotels :',this.hotels);
        this.loading = false;
        this.cdr.markForCheck(); //  FORCE le rafraîchissement de l'écran
      },
      error: (err) => {
        console.error('Error loading hotels', err);
        this.error = 'Failed to load hotels.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    }));
  }

  onSelectHotel(hotel: Hotel): void {
    console.log('Selected hotel', hotel);
    // Plus tard: naviguer vers une page de détail, ouvrir un modal, etc.
  }
}
