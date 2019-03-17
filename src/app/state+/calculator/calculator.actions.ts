import { IEquation } from '@app/models/equation.interface';

const CALCULATOR_EQUATION = '[Calculator] Add Equation';
const CALCULATOR_KEY = '[Calculator] Calculator Key';
const CALCULATOR_CLEAR = '[Calculator] Calculation Clear';
const CALCULATOR_RESET = '[Calculator] Calculation Reset';

export class CalculatorEquationAction {

  static readonly type = CALCULATOR_EQUATION;

  constructor(public payload: IEquation) {
  }
}

export class CalculatorKeyAction {

  static readonly type = CALCULATOR_KEY;

  constructor(public payload: string) {
  }
}

export class CalculatorClearAction {

  static readonly type = CALCULATOR_CLEAR;
}

export class CalculatorResetAction {

  static readonly type = CALCULATOR_RESET;
}
