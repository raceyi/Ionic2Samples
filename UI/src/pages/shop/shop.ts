import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import {MenuPage} from '../menu/menu';
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
    awsS3:string="https://s3.ap-northeast-2.amazonaws.com/takitkorea/";
    
    shopInfo = {"shopName":"더큰도시락", "serviceType":"도시락 / 한식"};

    categories=[{"categoryName":"정식도시락"},
                {"categoryName":"실속도시락"},
                {"categoryName":"마요도시락"},
                {"categoryName":"반반마요도시락"},
                {"categoryName":"매콤마요도시락"},
                {"categoryName":"덮밥도시락"},
                {"categoryName":"볶음밥도시락"},
                {"categoryName":"특선도시락"},
                {"categoryName":"스페셜도시락"},
                {"categoryName":"비빔밥도시락"},
                {"categoryName":"카레도시락"},
                {"categoryName":"돈부리시리즈"},
                {"categoryName":"얼큰한 국물"},
                {"categoryName":"이색BOX"},
                {"categoryName":"분식"},
                {"categoryName":"사이드메뉴"}];

      menus=[[{menuName:"데리치킨도시락",price:3600,imagePath:"데리치킨도시락",description:"달콤한 치킨 도시락", options:"[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]"},
                     {menuName:"돈까스도시락",price:3400,imagePath:"돈까스도시락",options:"[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]"},
                     {menuName:"버섯불고기도시락",price:3600,imagePath:"버섯불고기도시락",options:"[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]"},
                     {menuName:"삼식도시락",price:3600,imagePath:"삼식도시락",options:"[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]"},
                     {menuName:"삼치도시락",price:3800,imagePath:"삼치도시락",options:"[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]"},
                     {menuName:"수제등심돈까스",price:3800,imagePath:"수제등심돈까스",options:"[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]"},
                     {menuName:"양념치킨도시락",price:3800,imagePath:"양념치킨도시락",options:"[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]"},
                     {menuName:"제육볶음도시락",price:3800,imagePath:"제육볶음도시락",options:"[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]"},
                     {menuName:"치킨도시락",price:3800,imagePath:"치킨도시락",options:"[{\"name\":\"밥곱빼기\",\"price\":\"500\"},{\"name\":\"계란후라이\",\"choice\":[\"반숙\",\"완숙\"],\"default\":\"반숙\",\"price\":\"0\"}]"}],
              [{menuName:"대왕참치",price:"3600",imagePath:"대왕참치마요"},
                     {menuName:"대왕치킨",price:"3400",imagePath:"대왕치킨"},
                     {menuName:"돈까스",price:"3600",imagePath:"돈까스마요"},
                     {menuName:"참치",price:"3800",imagePath:"참치마요"},
                     {menuName:"치킨",price:"3800",imagePath:"치킨마요"},
                     {menuName:"포테이토",price:"3800",imagePath:"포테이토마요"}],       
              [{menuName:"대왕매콤참치",price:"3600",imagePath:"대왕매콤참치마요"},
                     {menuName:"대왕매콤치킨",price:"3400",imagePath:"대왕매콤치킨마요"},
                     {menuName:"매콤돈까스",price:"3600",imagePath:"매콤돈까스마요"},
                     {menuName:"매콤참치",price:"3600",imagePath:"매콤참치마요"},
                     {menuName:"매콤치킨",price:"3800",imagePath:"매콤치킨마요"},
                     {menuName:"매콤포테이토",price:"3800",imagePath:"매콤포테이토마요"}],
              [{menuName:"불고기",price:"3600",imagePath:"불고기덮밥"},
                     {menuName:"불닭갈비",price:"3400",imagePath:"불닭갈비덮밥"},
                     {menuName:"스팸김치",price:"3600",imagePath:"스팸김치덮밥"},
                     {menuName:"스팸",price:"3600",imagePath:"스팸덮밥"},
                     {menuName:"제육김치",price:"3800",imagePath:"제육김치덮밥"},
                     {menuName:"제육",price:"3800",imagePath:"제육덮밥"}]];       

    categorySelected=0;
  
    configureButtonColor(i){
      if(i==this.categorySelected)
          return 'subColor2';
      else
          return 'subColor';    
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('constructor ShopHomePage');

  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad ShopHomePage');
  }

  showShopAbout(){
  }

  back(){
     this.navCtrl.pop();
  }

  enterCart(){
  }

  categoryClick(categoryIndex){
    console.log('categoryClick:'+ categoryIndex);
    this.categorySelected=categoryIndex;
  }

  enterMenu(menu){
    this.navCtrl.push(MenuPage,{menu:menu,class:"MenuPage"});
  }
}
