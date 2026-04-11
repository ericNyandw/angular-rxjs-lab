import {Component, computed, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {IUserProfile} from '../../core/utils/UserProfile';
import { Subject, Subscription} from "rxjs";



@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.css',
})
export class Signals implements OnInit {

  // 1. Déclaration
  public count = signal(12);

  //Avec un tableau (Ajout d'élément)
  public items = signal(['Tomato', "Apple", 'Banana', 'Mango', 'Watermelon']);
  public  sub = new Subscription();
  public user: WritableSignal<IUserProfile> = signal({
    id: 101,
    username: 'java_dev',
    email: 'dev@example.com',
    isActive: true
  });

  public compteur = signal(0);
  constructor() {
    effect(() => {
      if (this.compteur() > 10) {
        console.log('compteur  > 10');
      }else{
        console.log('compteur à changé  :',this.compteur());
      }
    });
  }

  ngOnInit(): void {

    const add = (a: number, b: number) => {
      return a + b;
    }
    const sub = (a: number, b: number) => {
      return a - b;
    }
    const addItems = (newIt: string) => {
      return this.items.update((newItem) => [...newItem, newIt]);
    };
    const ugradeItems = (oldItem: string, newItem: string) => {
      return this.items.update((currentValue: string[]) =>
        currentValue.map(v => v === oldItem ? newItem : v)
      )
    };

    const subItems = (item: string) => {
      return this.items.update((currentValue: string[]) =>
        currentValue.filter(v => v !== item)
      )
    };

    const totalFruits = computed(() => this.items().length);
    const itemsStartByA = computed(() => this.items().filter(x => x.startsWith('A')));

    let searchQuery: string = '';
    const filteredItems = (sQ: string) => {
      return computed(() => this.items().filter(x => x.includes(sQ)));
    }

    let monTableaufiltered = filteredItems(searchQuery);

    let prix = signal(100);
    const resultRemise = computed(() => {
      return prix() * 0.8;
    });

     const incrCompteur = (n: number) => {
       this.compteur.update(value => value +n);
    }
    incrCompteur(6);incrCompteur(3);incrCompteur(3)

    const mysubject$ =  new Subject<number>();
    mysubject$.subscribe(
      (value) => {console.log("A", value);},
    );

    mysubject$.subscribe(
      (value) => {console.log("B", value);},
    );

    mysubject$.subscribe(
      (value) => {console.log("C", value);},
    );
    mysubject$.next(2);





    console.log("*************ADD TWO NUMRBERS **************");
    console.log('1+9 = ', add(1, 9));
    console.log("*************SUB TWO NUMRBERS **************");
    console.log('10-9 = ', sub(10, 9));
    console.log("*****************************************************************");
    console.log("*************LIST ITEMS:FRUITS**************");
    console.log("Current Items:", this.items());
    console.log("*****************ADD ONE ITEM : 'Peach' ***********************");
    addItems("Peach");
    console.log(" Resultat :", this.items());
    console.log("*****************UPDATE ITEM:'Peach' TO 'Lemon' ***********************");
    ugradeItems('Peach', 'Lemon');
    console.log(" Resultat :", this.items());
    console.log("*****************SUB ITEM:'Banana' into Items ***********************");
    console.log("Current Items:", this.items());
    subItems('Banana');
    console.log(" Resultat :", this.items());
    console.log('Resultat itemsByA', itemsStartByA());
    console.log(" Resultat total Items  :", totalFruits());
    console.log(" Resultat filteredItems  :", monTableaufiltered());

    console.log(` prix: ${prix()} avec une remise 20% =`, resultRemise());
  }


  public increment(): void {
    this.count.update(value => value + 1);
  }

  public decremente(): void {
    this.count.update((value) => value - 1);
  }

  public addItem(newItem: string) {
    this.items.update(preventItem => [...preventItem, newItem])
    ;
  }

  //Avec un objet (Modification d'une propriété)
  public udapteIUserProfile(User: IUserProfile) {
    this.user.update((current: IUserProfile) => {
      return {
        ...current,
        username: 'Charles'
      };
    });
  }


}
