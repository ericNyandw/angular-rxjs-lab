import { Injectable } from '@angular/core';
import {Station} from '../models/station';
import {delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  // Ton catalogue de chaînes (obB$)
  private readonly stations: Station[] = [
    { ref: "1", libelle: "TF1" },
    { ref: "2", libelle: "RTL-BE" },
    { ref: "3", libelle: "FRANC3" },
    { ref: "4", libelle: "FRANC5" },
    { ref: "5", libelle: "TV5" },
    { ref: "6", libelle: "CANAL+" },
    { ref: "7", libelle: "AB3" },
    { ref: "8", libelle: "CNN" },
    { ref: "9", libelle: "BBC" }
  ];
  getStationByRef(ref: string): Observable<Station| undefined>  {
    const station = this.stations.find(e => e.ref === ref);
    return of(station).pipe(delay(1000));
  }

}
