# 🔄 SwitchMap
✍️ Auteur : [NYERDI]
## 11. Sa Nature
- **Opérateur de transformation** utilisé dans le .pipe().
- **Son rôle**: 
   >permet de passer d'un flux de données à un autre,
     c-à-d Dès qu'une nouvelle donnée arrive sur la source,
     Si l'Observable précédent n'était pas terminé, il est annulé et 
     l'Observer ne reçoit ainsi que les données du tout dernier flux de données.

📺 **L'analogie de la Télécommande**
Imaginez que vous avez une télécommande entre les mains pour changer de chaîne :

- Vous appuyez sur la touche **1** pour voir TF1. La télé commence à chercher le signal → c'est le déclenchement de l'Observable.
- Mais avant que l'image n'apparaisse, vous changez d'avis et vous appuyez sur la touche 2 pour RTL.
- Le **switchMap** ordonne immédiatement à la télé d'**arrêter de chercher la chaîne 1 (annulation)**
  pour se concentrer uniquement sur la chaîne 2.
- Seule la **dernière commande** arrive jusqu'à l'écran.

📋 **Déroulement du scénario**

1. 🖱️ L'utilisateur clique sur la touche **"1"**. Le chargement commence (1 seconde).
2.  ⚡ 0.5s plus tard, l'utilisateur clique sur la touche **"2"**. 
3. 🚫 Le switchMap annule immédiatement la requête pour la chaîne "1". 
4. 📺 Après 1s, seule la chaîne **"2"** s'affiche à l'écran

💻 **Exemple pratique (Simplifié)**
💡 Note sur l'exécution : Comme les touches "1", "3", "6" sont envoyées très vite, switchMap va annuler "1" puis "3" pour ne garder que "6". Seul le libellé de la dernière touche s'affichera après le délai.
```typescript
const telecommande$ = of("1", "3", "6"); // On appuie sur 1, puis 3, puis 6
const stationsTv$ = of([
  { ref: "1", libelle: "TF1" },
  { ref: "2", libelle: "RTL-BE"},
  { ref: "3", libelle: "FRANC3" },
  // ... reste de la liste
]);

telecommande$.pipe(
  // Si on appuie sur 1, 3, 6 très vite : 1 et 3 sont annulés immédiatement
  switchMap(touche => 
    stationsTv$.pipe(
      // On cherche la chaîne qui correspond au numéro pressé
      map(liste => liste.find(chaine => chaine.ref === touche)),
      delay(1000) // Le délai permet de simuler l'attente du signal
    )
  )
).subscribe(resultat => {
  // Résultat final après 1s : "Ma télé affiche : FRANC3" (la touche 6 n'est pas dans la liste)
  console.log("Ma télé affiche :", resultat?.libelle);
});
```
⚙️ Caractéristiques principales
- 🔹 **Annule les flux en cours**
Dès qu'une nouvelle valeur est émise par la source, il se désabonne de l'observable précédent.
- 🔹 **Idéal pour l'asynchrone**
Parfait pour les requêtes HTTP où seule la réponse la plus récente nous intéresse.
- 🔹 **Évite les résultats désordonnés**
Il garantit que les données affichées correspondent toujours à la toute dernière action utilisateur.

> Pour visualiser concrètement cette analogie de la télécommande, vous pouvez tester l'exemple complet sur l'interface locale : http://localhost:4200/transformation/switch-map. 
