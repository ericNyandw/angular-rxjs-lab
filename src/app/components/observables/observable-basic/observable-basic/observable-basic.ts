import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter,of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-observable-basic',
  imports: [],
  standalone: true,
  templateUrl: './observable-basic.html',
  styleUrl: './observable-basic.css',
})
export class ObservableBasic  implements OnInit , OnDestroy{

     public numbers$=of(1,3,4,5,8);
     public subscription =new Subscription();
    ngOnInit(): void {

      this.subscription.add(this.numbers$.pipe(map( value => value *2 ),
       filter(item=> item <= 7))
      .subscribe( (x) => {console.log(x);}));
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
