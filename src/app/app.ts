import { Component, signal } from '@angular/core';
import {Dashboard} from './layout/dashboard/dashboard';


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
