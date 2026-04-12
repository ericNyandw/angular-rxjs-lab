import {AsyncPipe, CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {combineLatest, BehaviorSubject, Observable, of, interval, take} from 'rxjs';
import { map } from 'rxjs/operators';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-combine-latest',
  imports: [AsyncPipe,CommonModule, ReactiveFormsModule],
  templateUrl: './combine-latest_.component.html',
  styleUrl: './combine-latest_.component.css',
})
export class CombineLatest_ implements OnInit {

  //(Ex1)
  /**
   *  Observables pour nos filtres
   */
  nomUtilisateur = new BehaviorSubject<string>('');
  statutCommande = new BehaviorSubject<string>('Toutes');

  resultatFiltre$!: Observable<{ nom: string; statut: string; }>;



  //Ex2
  /**
   * Exemple simple : Combinaison d'une personne et d'un âge
   * Imaginons que nous ayons deux sources de données asynchrones :
   *  -  l'une qui émet des noms et
   *  -  l'autre qui émet des âges.
   */
  // Observable N°1 qui émet des noms immédiatement(In a synchronous manner)
  names$ = of('Alice', 'Bob', 'Charlie');
// Observable N°2 qui émet des âges à intervalles réguliers (In an asynchronous manner)
   ages$ = interval(4000).pipe(
    map(i => i + 20), // Émet 20, 21, 22...
    take(3)           // Ne prend que 3 valeurs
  );


  myList:{ name: string; age: number;}[] = [];

  ngOnInit() {
    // combineLatest écoute les deux Observables
    this.resultatFiltre$ = this.initFilter();
    this.chronologicalResultOfEvents().subscribe(
      (result) => {
        console.log(`Nom: ${result.name}, Âge: ${result.age}`);
        this.myList.push(result);
      });
  }

  onStatutChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) { // Une vérification de sécurité supplémentaire
      this.statutCommande.next(target.value);
    }
  }

  private initFilter() :  Observable<{ nom: string; statut: string; }>{
     return combineLatest([this.nomUtilisateur, this.statutCommande]).pipe(
       // On combine les deux dernières valeurs reçues
       map(([nom, statut]) => {
         return { nom, statut };
       })
     );

  }
  private chronologicalResultOfEvents () {
    return combineLatest([this.names$, this.ages$]).pipe(
      map(([name, age]) => {
        return { name, age };
      })
    )

  }

}
