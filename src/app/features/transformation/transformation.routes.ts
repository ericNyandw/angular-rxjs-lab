import {Routes} from '@angular/router';

import {SwitchMap} from './switch-map/switch-map';
import {CombineLatest_} from './combine-latest/combine-latest_.component';

export const TRANSFORMATION_ROUTES:Routes = [
  //  Catégorie Transformation
  { path: 'switch-map', component: SwitchMap },
  { path: 'combine-latest', component: CombineLatest_ },
]
