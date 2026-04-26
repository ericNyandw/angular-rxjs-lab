# 🌊  basic observable
✍️ Auteur : [NYERDI]
## 1. Sa Nature
- **Un Observable** est un objet issu de la **bibliothèque RxJS**.
- **Son rôle**: 
   > utilisé par Angular pour gérer des flux de données dits **Unicast**,
     Il peut être **synchrone ou asynchrone** selon la source qu’il contient,
     et il est capable d'émettre **une ou plusieurs valeurs** au fil du temps.


---
## 2. 📺 L'analogie du robinet d'eau

- L'**Observable** est la tuyauterie :elle contient le potentiel de l'eau, mais rien ne coule sans action.
- Le **Subscribe** est l'action d'ouvrir la vanne : le flux (la donnée) démarre.
- L'**Observer** est le verre : il reçoit l'eau et décide quoi en faire (traitement de la donnée)
- L'**Unicast** : Si votre voisin ouvre sa propre vanne, il reçoit un nouveau flux indépendant. La source "recommence" pour lui.

📋 **Déroulement du scénario**

1. **La Définition (Le robinet fermé)**
   **L'Observable** : C'est le robinet fermé. Le flux d'eau est **défini **(on sait qu'il peut couler), mais il n'est pas actif (Observable "froid").
     La Souscription (Ouvrir le robinet)


2. **Le.subscribe()** : C'est l'action d'ouvrir la poignée. C'est à ce moment précis que le lien est fait avec le verre (**l'Observer**).
      Sans cela, l'eau reste dans les tuyaux.


3. **Le Flux de données (L'eau qui coule)**
    1. **Synchrone** : L'eau sort instantanément dès que tu touches la poignée.
    2. **Asynchrone** : L'eau met un certain temps à arriver après l'ouverture.
    3. **Émissions multiples** : Chaque goutte d'eau est une donnée émise par l'Observable jusqu'à la fermeture de la vanne ou l'épuisement de la source.

💻 **Exemple pratique 1: (Simplifié)**

> Voici comment traduire notre analogie en code. Cet exemple démontre à la fois le côté Synchrone (gouttes 1, 2, 3) et Asynchrone (goutte 4).
```typescript
import { Observable } from 'rxjs';

// 1. Définition du robinet
const robinet$ = new Observable((subscriber) => {
  subscriber.next(1); // Goutte 1
  subscriber.next(2); // Goutte 2
  subscriber.next(3); // Goutte 3

  setTimeout(() => {
    subscriber.next(4); // Goutte 4 (après 4 seconde)
    subscriber.complete();
  }, 4000);
});

console.log('Action : Je pose mon verre...');

// 2. Souscription (Ouverture de la vanne)
robinet$.subscribe({
  next(x) { console.log('Eau reçue : ' + x); },
  error(err) { console.error('Problème de plomberie : ' + err); },
  complete() { console.log(' Termine, le réservoir est vide.'); },
});

console.log('Action : Je peux faire autre chose en attendant la dernière goutte...');
```

💻 **Exemple pratique 2:  Liste d'Hôtels (Cas réel)**

```typescript

// 1. Définition du flux dans le service
getHotels(): Observable<Hotel[]> {
  return this.http.get<Hotel[]>(this.apiUrl);
}

// 2. Utilisation manuelle dans le composant
this.subscription = this.service.getHotels().subscribe({
  next: (data) => this.hotels = data,
  error: (err) => this.errorMessage = "Oups !"
});

// 3. Nettoyage (Crucial pour éviter les fuites de mémoire)
ngOnDestroy() {
  this.subscription.unsubscribe();
}

```

🔗 [Voir l'implémentation complète](https://github.com/ericNyandw/angular-rxjs-lab/tree/master/src/app/features/observable-simple) 

---
⚙️ Caractéristiques principales
- 🔹 **Unicast** : Chaque souscription crée une nouvelle exécution de la source (ex: une nouvelle requête HTTP est lancée pour chaque abonné).
- 🔹 **Asynchrone** : Idéal pour attendre une réponse du serveur sans bloquer l'interface utilisateur.
- 🔹 **Gestion des erreurs** : L'objet Observer possède une méthode error dédiée pour attraper les problèmes réseau proprement.
- 🔹 **Memory Leaks** : Un flux ouvert doit être fermé (unsubscribe) quand le composant est détruit pour ne pas gaspiller la mémoire.

---

**⚠️ Ma note sur les limites de l'abonnement manuel**
> Lorsqu'on s'abonne manuellement dans le code (.subscribe), on observe parfois un léger saut d'affichage (clignotement). Cela est dû au délai de réponse de l'Observable : la vue s'initialise à vide, puis se met à jour brutalement quand la donnée arrive.

**💡 Testez-le** : En lançant le projet localement, vous pouvez observer ce comportement sur la route :
http://localhost:4200/observable/basic (Section Hotels).

> Pour résoudre cela, Angular propose le pipe async, mais cela fera l'objet d'un autre chapitre !



