import { Component ,Input,Output,EventEmitter,OnInit} from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent implements OnInit {

  @Input('menu') menu;
  @Output('select') select = new EventEmitter();  

  constructor() {
    console.log('Hello MenuItemComponent Component');
  }
  
  ngOnInit(){
    console.log("menu:"+JSON.stringify(this.menu));
  }

  click(){
    this.select.emit(this.menu);
  }
}
