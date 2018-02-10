import { NgModule } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [MenuItemComponent],
	imports: [IonicModule],
	exports: [MenuItemComponent]
})
export class ComponentsModule {}
