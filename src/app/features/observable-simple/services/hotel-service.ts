import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hotel} from '../../../shared/models/hotel';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private readonly baseUrl: string= 'http://localhost:3000/hotels';

  constructor(private  readonly http: HttpClient) {
  }

  /**
   * Retrieves the list of hotels from the server.
   * This is a "Simple Observable": each call triggers a new request.
   */
  getHotels() :Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}`);
  }
}
