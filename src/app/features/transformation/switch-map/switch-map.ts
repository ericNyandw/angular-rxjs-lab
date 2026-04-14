import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Observable, of, startWith, Subject, switchMap} from 'rxjs';
import {StationService} from './services/station-service';
import {Station} from './models/station';

@Component({
  selector: 'app-switch-map',
  imports: [CommonModule],
  templateUrl: './switch-map.html',
  styleUrl: './switch-map.css',
})
export class SwitchMap implements  OnInit{
  // 1. La source (Action)
  telecommande$ =  new Subject<string>();

  // 2. Le résultat (Flux de données typé)
  // On utilise Station | undefined car le find peut ne rien trouver
  stationTv$!: Observable<Station | undefined>;

  protected remoteControle: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  constructor(private readonly stationService : StationService) {
  }

  ngOnInit(): void {
      // 3. Transformation avec switchMap
     this.stationTv$ = this.telecommande$.pipe(
       startWith("1"),
       switchMap( toucheRemoteC => this.stationService.getStationByRef(toucheRemoteC))
     )
    }

  protected onZapping(n: string) {
    this.telecommande$.next(n);
  }
}
