import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shopInfo;
  categories=[];
  categorySelected;

  menus=[];
  remoteStorage:string="https://s3.ap-northeast-2.amazonaws.com/takitkorea/";

  constructor(public navCtrl: NavController) {

  }
  
 ionViewDidLoad(){ 
  this.shopInfo=[
           {"category":"정식도시락",
            "menus":[{"menuName":"데리치킨도시락","price":"3600","imagePath":"데리치킨도시락"},
                     {"menuName":"돈까스도시락","price":"3400","imagePath":"돈까스도시락"},
                     {"menuName":"버섯불고기도시락","price":"3600","imagePath":"버섯불고기도시락"},
                     {"menuName":"삼식도시락","price":"3600","imagePath":"삼식도시락"},
                     {"menuName":"삼치도시락","price":"3800","imagePath":"삼치도시락"},
                     {"menuName":"수제등심돈까스","price":"3800","imagePath":"수제등심돈까스"},
                     {"menuName":"양념치킨도시락","price":"3800","imagePath":"양념치킨도시락"},
                     {"menuName":"제육볶음도시락","price":"3800","imagePath":"제육볶음도시락"},
                     {"menuName":"치킨도시락","price":"3800","imagePath":"치킨도시락"},
                     {"menuName":"칠리탕수육도시락","price":"3600","imagePath":"칠리탕수육도시락"},
                     {"menuName":"칠리포크도시락","price":"3800","imagePath":"칠리포크도시락"}]},  
            {"category":"마요도시락",
            "menus":[{"menuName":"대왕참치","price":"3600","imagePath":"대왕참치마요"},
                     {"menuName":"대왕치킨","price":"3400","imagePath":"대왕치킨마요"},
                     {"menuName":"돈까스","price":"3600","imagePath":"돈까스마요"},
                     {"menuName":"참치","price":"3800","imagePath":"참치마요"},
                     {"menuName":"치킨","price":"3800","imagePath":"치킨마요"},
                     {"menuName":"포테이토","price":"3800","imagePath":"포테이토마요"}]},
            {"category":"반반마요도시락",
            "menus":[{"menuName":"새우+치킨","price":"3600","imagePath":"세치마요"},
                     {"menuName":"새우+포테이토","price":"3400","imagePath":"세포마요"},
                     {"menuName":"소세지+치킨","price":"3600","imagePath":"소치마요"},
                     {"menuName":"소세지+포테이토","price":"3600","imagePath":"소포마요"}]},
            {"category":"매콤마요도시락",
            "menus":[{"menuName":"대왕매콤참치","price":"3600","imagePath":"대왕매콤참치마요"},
                     {"menuName":"대왕매콤치킨","price":"3400","imagePath":"대왕매콤치킨마요"},
                     {"menuName":"매콤돈까스","price":"3600","imagePath":"매콤돈까스마요"},
                     {"menuName":"매콤참치","price":"3600","imagePath":"매콤참치마요"},
                     {"menuName":"매콤치킨","price":"3800","imagePath":"매콤치킨마요"},
                     {"menuName":"매콤포테이토","price":"3800","imagePath":"매콤포테이토마요"}]},
            {"category":"덮밥도시락",
            "menus":[{"menuName":"불고기","price":"3600","imagePath":"불고기덮밥"},
                     {"menuName":"불닭갈비","price":"3400","imagePath":"불닭갈비덮밥"},
                     {"menuName":"스팸김치","price":"3600","imagePath":"스팸김치덮밥"},
                     {"menuName":"스팸","price":"3600","imagePath":"스팸덮밥"},
                     {"menuName":"제육김치","price":"3800","imagePath":"제육김치덮밥"},
                     {"menuName":"제육","price":"3800","imagePath":"제육덮밥"},
                     {"menuName":"참치김치","price":"3800","imagePath":"참치김치덮밥"}]}];
      for(var i=0;i<this.shopInfo.length;i++){
          for(var j=0;j<this.shopInfo[i].menus.length;j++)
              this.shopInfo[i].menus[j].fullpath=this.remoteStorage+this.shopInfo[i].menus[j].imagePath; 
          this.categories.push(this.shopInfo[i].category);
      }
      console.log("categories:"+JSON.stringify(this.categories));
      this.categorySelected=this.categories[0];
      this.menus=this.shopInfo[0].menus;

      console.log("this.menus:"+JSON.stringify(this.menus));
 }

 categoryChange(category){
    let idx=this.categories.indexOf(category);
    this.menus=this.shopInfo[idx].menus;
    this.categorySelected=this.categories[idx];
 }

  swipeCategory(event){
        console.log("event.direction:"+event.direction+ "categories.length:"+this.categories.length);
        let idx=this.categories.indexOf(this.categorySelected);
        if(event.direction==4){ //DIRECTION_LEFT = 2
            if(idx>=1){
                this.categoryChange(this.categories[idx-1]);
            }
        }else if(event.direction==2){//DIRECTION_RIGHT = 4
            if(idx<this.categories.length-1){
                this.categoryChange(this.categories[idx+1]);
            }
        }  
  }

}
