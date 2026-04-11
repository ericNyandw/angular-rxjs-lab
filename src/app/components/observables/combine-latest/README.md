# ⚡ `combineLatest` : L’alarme de la maison connectée

---
✍️ Auteur : [NYERDI]
## 🧠 Introduction

Imaginez une alarme qui **ne se déclenche que si plusieurs conditions sont remplies**.  
Pour cela, elle doit **constamment vérifier le dernier état de chaque capteur**.  
C’est exactement ce que fait `combineLatest`.

- **Le système d’alarme** → c’est `combineLatest`  
- **Les capteurs** (mouvement, porte ouverte, vitre cassée) → ce sont les différents **Observables** que `combineLatest` surveille  

---

## 🔍 Comment ça marche ?

### 1. L’attente initiale
L’alarme ne peut pas prendre de décision tant qu’elle **n’a pas reçu une première information de tous ses capteurs**.  
Par exemple : il faut que le capteur de mouvement, de porte et de vitre aient tous envoyé leur premier signal (“Rien à signaler”).

### 2. La diffusion combinée
Une fois que l’alarme a reçu une première valeur de chaque capteur, **elle devient active**.  
Dès qu’un capteur envoie une nouvelle information (par exemple “mouvement détecté !”),  
`combineLatest` émet immédiatement **la dernière valeur de chaque capteur en même temps**.

### 3. La mise à jour instantanée
Si un autre capteur change de valeur, `combineLatest` renvoie à nouveau les **dernières valeurs combinées** de tous les capteurs.  
Il ne donne jamais une valeur isolée, mais toujours **un “instantané” global** de l’état du système.

> 🧩 En résumé :  
> `combineLatest` émet une nouvelle valeur **à chaque fois qu’un des Observables qu’il surveille émet**,  
> et cette valeur est **la combinaison des toutes dernières valeurs de chacun des Observables**.

## 🧩 Principe de fonctionnement (A suivre dans la logique de code) :

Le principe est simple :
1. `combineLatest` attend que **chaque**  Observable d'entrée ait émis au moins une valeur.
2. Une fois que cette condition est remplie, le nouvel Observable émet un tableau contenant la dernière valeur de chaque flux d'entrée.
3. Par la suite, chaque fois que l'un des flux d'entrée émet une nouvelle valeur, l'Observable de sortie émet immédiatement un nouveau tableau avec les dernières valeurs de tous les flux

N.B: La principale différence est que synchrone signifie "en même temps" et asynchrone signifie "pas en même temps"
## 💻 Exemple concret : tableau de bord réactif

Prenons un exemple simple : un **tableau de bord** qui affiche des informations filtrées selon deux critères (nom d’utilisateur et statut de commande).  
Les filtres sont des `Observables`, et les données sont mises à jour en fonction de leurs valeurs.

---

### 🧩 Fichier : `combine-latest.component.ts`

```typescript
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-combine-latest',
  imports: [AsyncPipe],
  templateUrl: './combine-latest.html',
  styleUrl: './combine-latest.css',
})
export class CombineLatest implements OnInit {
  // Observables pour nos filtres
  nomUtilisateur = new BehaviorSubject<string>('');
  statutCommande = new BehaviorSubject<string>('Toutes');

  resultatFiltre$!: Observable<{ nom: string; statut: string }>;

  ngOnInit() {
    // combineLatest écoute les deux Observables
    this.resultatFiltre$ = combineLatest([
      this.nomUtilisateur,
      this.statutCommande,
    ]).pipe(
      // On combine les deux dernières valeurs reçues
      map(([nom, statut]) => ({ nom, statut }))
    );
  }

  onStatutChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.statutCommande.next(target.value);
    }
  }
}
```
### 🧩 Fichier : `combine-latest.html`

```html
<h3>Tableau de bord</h3>

<p>
  Nom de l'utilisateur :
  <input type="text" (input)="nomUtilisateur.next($event.target.value)" />
</p>

<p>
  Statut de commande :
  <select (change)="onStatutChange($event)">
    <option value="Toutes">Toutes</option>
    <option value="En cours">En cours</option>
    <option value="Terminée">Terminée</option>
  </select>
</p>

@if (resultatFiltre$ | async; as resultat) {
  <div>
    <p>
      Affichage des commandes pour l'utilisateur :
      <b>{{ resultat.nom }}</b> avec le statut :
      <b>{{ resultat.statut }}</b>
    </p>
  </div>
}

```
