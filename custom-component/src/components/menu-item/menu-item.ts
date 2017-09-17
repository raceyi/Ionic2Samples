import { Component ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent {

  @Input('menu') menu;
  @Output('select') select = new EventEmitter();  

  constructor() {
    console.log('Hello MenuItemComponent Component');
  }

  click(){
    this.select.emit(this.menu);
  }
}
