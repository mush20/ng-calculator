import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  CalculatorEquationAction,
  CalculatorKeyAction,
  CalculatorClearAction,
  CalculatorResetAction
} from '@app/state+/calculator/calculator.actions';
import { IEquation } from '@app/models/equation.interface';
import { EquationType } from '@app/enums/equation-type.enum';
import numbro from 'numbro';

export interface CalculatorStateModel {
  display: string;
  stack: IEquation[];
  newNumber: boolean;
}

const name = 'Calculator';

const defaults: CalculatorStateModel = {
  display: '0',
  stack: [{}],
  newNumber: true
};

@State<CalculatorStateModel>({
  name,
  defaults
})
export class CalculatorState {

  @Selector()
  static display(state: CalculatorStateModel): string {
    return state.display;
  }

  @Action(CalculatorKeyAction)
  calculatorKeyAction(ctx: StateContext<CalculatorStateModel>, {payload}: CalculatorKeyAction) {

    const state = ctx.getState();
    let newNumber = state.newNumber;
    let display = state.display;

    if (payload === '.' && display.includes('.')) {
      return; // prevents multiple decimal points;
    }

    if (newNumber) {
      if (payload !== '.') {
        display = payload;
      } else {
        if (display === '0' && payload !== '.') {
          display = payload;
        } else {
          display += payload;
        }
      }
      newNumber = false;
    } else {
      display += payload;
    }

    ctx.patchState({display, newNumber});
  }

  @Action(CalculatorEquationAction)
  addEquationAction(ctx: StateContext<CalculatorStateModel>, {payload}: CalculatorEquationAction) {

    const newNumber = true;
    const stack = Array.from(ctx.getState().stack);
    const lastIndex = stack.length - 1;
    const last = stack[lastIndex];

    const value = numbro.unformat(ctx.getState().display);


    if (payload.type === undefined && last.type === undefined) {
      stack[lastIndex] = stack[lastIndex - 1]; // repeat last equation
    } else {
      stack[lastIndex] = {type: last.type, value};
    }
    stack.push(payload);

    const display = this.calculate(stack);
    ctx.patchState({stack, newNumber, display});
  }

  @Action(CalculatorClearAction)
  calculatorClearAction(ctx: StateContext<CalculatorStateModel>) {
    const display = '0';
    const newNumber = true;
    ctx.patchState({display, newNumber});
  }

  @Action(CalculatorResetAction)
  calculatorResetAction(ctx: StateContext<CalculatorStateModel>) {
    ctx.setState(defaults);
  }

  protected calculate(stack: IEquation[]): string {
    return stack.reduce((p, c) => {
      if (c.type === undefined) {
        if (c.value !== undefined) {
          return c.value;
        }
        return p;
      }
      switch (c.type) {
        case EquationType.ADDITION:
          return p + c.value;
        case EquationType.SUBTRACTION:
          return p - c.value;
        case EquationType.MULTIPLICATION:
          return p * c.value;
        case EquationType.DIVISION:
          return p / c.value;
      }
    }, 0).toString();
  }
}
