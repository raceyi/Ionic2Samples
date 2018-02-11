import { Component,Input } from '@angular/core';

/**
 * Generated class for the AmountDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'amount-display',
  templateUrl: 'amount-display.html'
})
export class AmountDisplayComponent {
  @Input('amount') amount;

  constructor() {
    console.log('Hello AmountDisplayComponent Component '+this.amount);    
  }
}
