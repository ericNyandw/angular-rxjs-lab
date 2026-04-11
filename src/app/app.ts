import { Component, signal } from '@angular/core';
import { CombineLatest_ } from './components/observables/combine-latest/combine-latest_.component';
import {Header} from './components/observables/behavior-subject/header/header';
import {Login} from './components/observables/behavior-subject/login/login';
import {ObservableBasic} from './components/observables/observable-basic/observable-basic/observable-basic';
import {Signals} from './components/signals/signals';
import {Dashboard} from './components/layout/dashboard/dashboard';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    Dashboard
  ],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lean-rxjs');
}
