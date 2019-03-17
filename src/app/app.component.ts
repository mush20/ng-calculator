import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  CalculatorResetAction,
  CalculatorEquationAction,
  CalculatorKeyAction, CalculatorClearAction
} from '@app/state+/calculator/calculator.actions';
import { CalculatorState } from '@app/state+/calculator/calculator.state';
import { Observable } from 'rxjs';
import { IEquation } from '@app/models/equation.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Select(CalculatorState.display)
  display$: Observable<string>;

  constructor(protected store: Store) {
  }

  key(event$: string): void {
    this.store.dispatch(new CalculatorKeyAction(event$));
  }

  equation($event: IEquation): void {
    this.store.dispatch(new CalculatorEquationAction($event));
  }

  clear(): void {
    this.store.dispatch(new CalculatorClearAction());
  }

  reset(): void {
    this.store.dispatch(new CalculatorResetAction());
  }
}
