import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EquationType } from '@app/enums/equation-type.enum';
import { IEquation } from '@app/models/equation.interface';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {

  @Input() stackDisplay: string;
  @Input() display: string;

  @Output() equation: EventEmitter<IEquation> = new EventEmitter();
  @Output() key: EventEmitter<string> = new EventEmitter();
  @Output() clear: EventEmitter<void> = new EventEmitter();
  @Output() reset: EventEmitter<void> = new EventEmitter();

  @HostBinding('class.calculator') cssClass = true;

  constructor() {
  }

  ngOnInit() {

  }

  addEquation(equation: IEquation): void {
    this.equation.next(equation);
  }

  doKey(key: string): void {
    this.key.next(key);
  }

  doCalculate(): void {
    this.addEquation({});
  }

  doAddition(): void {
    this.addEquation({type: EquationType.ADDITION, value: 0});
  }

  doSubtraction(): void {
    this.addEquation({type: EquationType.SUBTRACTION, value: 0});
  }

  doMultiplication(): void {
    this.addEquation({type: EquationType.MULTIPLICATION, value: 1});
  }

  doDivision(): void {
    this.addEquation({type: EquationType.DIVISION, value: 1});
  }

  doClear(): void {
    this.clear.next();
  }

  doReset(): void {
    this.reset.next();
  }
}
