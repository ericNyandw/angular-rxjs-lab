import { Routes } from '@angular/router';
import { Dashboard } from './layout/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { path: 'creation/basic',
       loadComponent:()=>import('./features/creation/observable-basic/observable-basic').then(m=>m.ObservableBasic),},
      {
        path: 'transformation',
        loadChildren: () => import('./features/transformation/transformation.routes').then(m => m.TRANSFORMATION_ROUTES)
      },
      { path: 'subjects/behavior',
       loadComponent:()=>import('./features/subjects/login/login').then(m => m.Login)
      },
      { path: 'signals',
        loadComponent:()=>import('./features/signals/signals').then(m => m.Signals)
      },
      { path: '', redirectTo: 'creation/basic', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];

