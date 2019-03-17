import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CalculatorState } from '@app/state+/calculator/calculator.state';
import { CalculatorEquationAction, CalculatorKeyAction } from '@app/state+/calculator/calculator.actions';
import { EquationType } from '@app/enums/equation-type.enum';

describe('Calculator', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CalculatorState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('it should add', async(() => {
    store.dispatch(new CalculatorKeyAction('1'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.ADDITION, value: 0}));
    store.dispatch(new CalculatorKeyAction('1'));
    store.dispatch(new CalculatorEquationAction({}));

    store.selectOnce(state => state.Calculator.display).subscribe(display => {
      expect(display).toBe('2');
    });
  }));

  it('it should subtract', async(() => {
    store.dispatch(new CalculatorKeyAction('2'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.SUBTRACTION, value: 0}));
    store.dispatch(new CalculatorKeyAction('1'));
    store.dispatch(new CalculatorEquationAction({}));

    store.selectOnce(state => state.Calculator.display).subscribe(display => {
      expect(display).toBe('1');
    });
  }));

  it('it should multiply', async(() => {
    store.dispatch(new CalculatorKeyAction('4'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.MULTIPLICATION, value: 1}));
    store.dispatch(new CalculatorKeyAction('2'));
    store.dispatch(new CalculatorEquationAction({}));

    store.selectOnce(state => state.Calculator.display).subscribe(display => {
      expect(display).toBe('8');
    });
  }));

  it('it should divide', async(() => {
    store.dispatch(new CalculatorKeyAction('4'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.DIVISION, value: 1}));
    store.dispatch(new CalculatorKeyAction('2'));
    store.dispatch(new CalculatorEquationAction({}));

    store.selectOnce(state => state.Calculator.display).subscribe(display => {
      expect(display).toBe('2');
    });
  }));

  it('it should calculate', async(() => {
    store.dispatch(new CalculatorKeyAction('4'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.MULTIPLICATION, value: 1}));
    store.dispatch(new CalculatorKeyAction('2'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.SUBTRACTION, value: 0}));
    store.dispatch(new CalculatorKeyAction('2'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.ADDITION, value: 1}));
    store.dispatch(new CalculatorKeyAction('1'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.MULTIPLICATION, value: 1}));
    store.dispatch(new CalculatorKeyAction('3'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.DIVISION, value: 1}));
    store.dispatch(new CalculatorKeyAction('2'));
    store.dispatch(new CalculatorEquationAction({}));

    store.selectOnce(state => state.Calculator.display).subscribe(display => {
      expect(display).toBe('10.5');
    });
  }));

  it('it should repeat equation', async(() => {
    store.dispatch(new CalculatorKeyAction('10'));
    store.dispatch(new CalculatorEquationAction({type: EquationType.ADDITION, value: 0}));
    store.dispatch(new CalculatorKeyAction('2'));
    store.dispatch(new CalculatorEquationAction({}));
    store.dispatch(new CalculatorEquationAction({}));
    store.dispatch(new CalculatorEquationAction({}));
    store.dispatch(new CalculatorEquationAction({}));

    store.selectOnce(state => state.Calculator.display).subscribe(display => {
      expect(display).toBe('18');
    });
  }));
});
