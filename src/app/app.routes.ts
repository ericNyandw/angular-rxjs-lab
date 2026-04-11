import { Routes } from '@angular/router';

import { Dashboard } from './components/layout/dashboard/dashboard';
import { ObservableBasic } from './components/observables/observable-basic/observable-basic/observable-basic';
import { CombineLatest_ } from './components/observables/combine-latest/combine-latest_.component';
import { Login } from './components/observables/behavior-subject/login/login';
import { Signals } from './components/signals/signals';
import {SwitchMap} from './components/observables/switch-map/switch-map';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      // 1. Catégorie Création
      { path: 'creation/basic', component: ObservableBasic },

      // 2. Catégorie Transformation
      { path: 'transformation/switch-map', component: SwitchMap },
      { path: 'transformation/combine-latest', component: CombineLatest_ },

      // 3. Catégorie État & Sujets
      { path: 'subjects/behavior', component: Login },

      // 4. Modern Angular
      { path: 'signals', component: Signals },

      // Redirection par défaut (quand on arrive sur le site)
      { path: '', redirectTo: 'creation/basic', pathMatch: 'full' }
    ]
  },
  // Si l'utilisateur tape n'importe quoi dans l'URL, on le ramène à l'accueil
  { path: '**', redirectTo: '' }
];
