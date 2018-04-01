import { Component ,Input,Output,EventEmitter,OnInit} from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent implements OnInit {

  @Input('menu') menuIn;
  @Output('select') select = new EventEmitter();  

  menu;

  constructor() {
    console.log('Hello MenuItemComponent Component');
  }
  
  ngOnInit(){
    this.menu = Object.assign({}, this.menuIn);    
    console.log("menu:"+JSON.stringify(this.menu));
 
 }

  click(){
    this.select.emit(this.menu);
  }
}
