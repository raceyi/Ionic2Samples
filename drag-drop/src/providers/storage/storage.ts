import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerProvider } from '../../providers/server/server';
import { NavController,AlertController,Platform ,Events} from 'ionic-angular';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  menusInput:any=[
    {"category":"기타","menu":"empty",type:"general",categorySeq:0},   // empty일 경우도 반듯이 categorySeq와 type은 들어가아만 한다!!! DB에 수동입력해주자.
    {"category":"멥떡","menu":"empty",type:"general",categorySeq:1},
    {"category":"백리향1송이","menu":"empty",categorySeq:2},
    {"category":"백리향2송이","menu":"empty",categorySeq:3},
    {"category":"백리향2송이(이티)","menu":"empty",categorySeq:4},
    {"category":"십리향1송이","menu":"empty",categorySeq:5},
    {"category":"십리향2송이","menu":"empty",categorySeq:6},
    {"category":"십리향3송이(이티)","menu":"empty",categorySeq:7},
    {"category":"십리향3송이(흑임자)","menu":"empty",categorySeq:8},
    {"category":"찰떡","menu":"empty",categorySeq:9},
    {"category":"메뉴없음(일반)","menu":"empty",type:"general",categorySeq:10},
    {"category":"메뉴없음(세트)","menu":"empty",type:"complex",categorySeq:11},
    {"category":"메뉴없음(세트-선택)","menu":"empty",type:"complex-choice",categorySeq:12},

    {"category":"기타","menu":"견과류강정","categorySeq":0,"menuSeq":0},
    {"category":"기타","menu":"멥밥","categorySeq":0,"menuSeq":1},
    {"category":"기타","menu":"미숫가루(고품격)","categorySeq":0,"menuSeq":2},
    {"category":"기타","menu":"미숫가루(오곡)","categorySeq":0,"menuSeq":3},
    {"category":"기타","menu":"미숫가루(흑임자)","categorySeq":0,"menuSeq":4},
    {"category":"기타","menu":"수수팥(2색)","categorySeq":0,"menuSeq":5},
    {"category":"기타","menu":"수수팥(카스테라)","categorySeq":0,"menuSeq":6},
    {"category":"기타","menu":"수수팥(팥)","categorySeq":0,"menuSeq":7},
    {"category":"기타","menu":"약과","categorySeq":0,"menuSeq":8},
    {"category":"기타","menu":"오곡밥","categorySeq":0,"menuSeq":9},
    {"category":"기타","menu":"오곡밥(팥만)","categorySeq":0,"menuSeq":10},
    {"category":"멥떡","menu":"가래떡","categorySeq":1,"menuSeq":0},
    {"category":"멥떡","menu":"꿀떡","categorySeq":1,"menuSeq":1},
    {"category":"멥떡","menu":"녹두호박설기","categorySeq":1,"menuSeq":2},
    {"category":"멥떡","menu":"단호박소담","categorySeq":1,"menuSeq":3},
    {"category":"멥떡","menu":"대추편","categorySeq":1,"menuSeq":4},
    {"category":"멥떡","menu":"딸기설기","categorySeq":1,"menuSeq":5},
    {"category":"멥떡","menu":"멥편 (팥)","categorySeq":1,"menuSeq":6},
    {"category":"멥떡","menu":"멥편(기피)","categorySeq":1,"menuSeq":7},
    {"category":"멥떡","menu":"멥편(녹두)","categorySeq":1,"menuSeq":8},
    {"category":"멥떡","menu":"멥편(콩)","categorySeq":1,"menuSeq":9},
    {"category":"멥떡","menu":"무지개설기","categorySeq":1,"menuSeq":10},
    {"category":"멥떡","menu":"미니설기(100)","categorySeq":1,"menuSeq":11},
    {"category":"멥떡","menu":"미니설기(무지)","categorySeq":1,"menuSeq":12},
    {"category":"멥떡","menu":"미니설기(첫돌)","categorySeq":1,"menuSeq":13},
    {"category":"멥떡","menu":"미니설기(하트)","categorySeq":1,"menuSeq":14},
    {"category":"멥떡","menu":"바람떡","categorySeq":1,"menuSeq":15},
    {"category":"멥떡","menu":"밤콩설기","categorySeq":1,"menuSeq":16},
    {"category":"멥떡","menu":"백설기","categorySeq":1,"menuSeq":17},
    {"category":"멥떡","menu":"송편","categorySeq":1,"menuSeq":18},
    {"category":"멥떡","menu":"쑥밤콩설기","categorySeq":1,"menuSeq":19},
    {"category":"멥떡","menu":"잣설기","categorySeq":1,"menuSeq":20},
    {"category":"멥떡","menu":"절편(2색)","categorySeq":1,"menuSeq":21},
    {"category":"멥떡","menu":"절편(쑥)","categorySeq":1,"menuSeq":22},
    {"category":"멥떡","menu":"절편(흰)","categorySeq":1,"menuSeq":23},
    {"category":"멥떡","menu":"초코설기","categorySeq":1,"menuSeq":24},
    {"category":"멥떡","menu":"현미설기","categorySeq":1,"menuSeq":25},
    {"category":"멥떡","menu":"흑임자설기","categorySeq":1,"menuSeq":26},
    {"category":"백리향1송이","menu":"[{\"호박(미니랩)\":3},{\"쑥밤콩(미니랩)\":3},{\"밤콩(미니랩)\":3},{\"고구마호박찰(미니랩)\":3},{\"완두(미니랩)\":3},{\"약식(미니랩)\":3},{\"콩영양(미니랩)\":3},{\"모듬(미니랩)\":3}]","categorySeq":2,"menuSeq":0},
    {"category":"백리향2송이","menu":"[{\"쑥밤콩(미니랩)\":3},{\"호박(미니랩)\":3},{\"모듬(미니랩)\":3},{\"약식(미니랩)\":3},{\"콩영양(미니랩)\":3},{\"완두(미니랩)\":3},{\"딸기(미니랩)\":9},{\"고구마호박찰(미니랩)\":12}]","categorySeq":3,"menuSeq":0},
    {"category":"백리향2송이(이티)","menu":"[{\"고구마호박찰(미니랩)\":12},{\"호박(미니랩)\":3},{\"쑥밤콩(미니랩)\":3},{\"완두(미니랩)\":3},{\"모듬(미니랩)\":3},{\"약식(미니랩)\":3},{\"콩영양(미니랩)\":3}]","categorySeq":4,"menuSeq":0},
    {"category":"십리향1송이","menu":"[{\"완두(기계)\":3},{\"호박(기계)\":3},{\"모듬(기계)\":3}]","categorySeq":5,"menuSeq":0},
   {"category":"십리향2송이","menu":"[{\"완두(기계)\":3},{\"모듬(기계)\":3},{\"밤콩(기계)\":3},{\"쑥밤콩(기계)\":3},{\"약식(기계)\":3},{\"호박(기계)\":3}]","categorySeq":6,"menuSeq":0},
    {"category":"십리향3송이(이티)","menu":"[{\"호박(기계)\":3},{\"모듬(기계)\":3},{\"약식(기계)\":3},{\"쑥밤콩(기계)\":3},{\"밤콩(기계)\":3},{\"완두(기계)\":3}]","categorySeq":7,"menuSeq":0},
    {"category":"십리향3송이(흑임자)","menu":"[{\"완두(기계)\":3},{\"호박(기계)\":3},{\"모듬(기계)\":3},{\"약식(기계)\":3},{\"밤콩(기계)\":3},{\"쑥밤콩(기계)\":3}]","categorySeq":8,"menuSeq":0},
    {"category":"찰떡","menu":"고구마호박찰","categorySeq":9,"menuSeq":0},
    {"category":"찰떡","menu":"기피인절미","categorySeq":9,"menuSeq":1},
    {"category":"찰떡","menu":"기피편","categorySeq":9,"menuSeq":2},
    {"category":"찰떡","menu":"깨편","categorySeq":9,"menuSeq":3},
    {"category":"찰떡","menu":"녹두편","categorySeq":9,"menuSeq":4},
    {"category":"찰떡","menu":"모듬영양","categorySeq":9,"menuSeq":5},
    {"category":"찰떡","menu":"시루떡","categorySeq":9,"menuSeq":6},
    {"category":"찰떡","menu":"쑥인절미","categorySeq":9,"menuSeq":7},
    {"category":"찰떡","menu":"약식","categorySeq":9,"menuSeq":8},
    {"category":"찰떡","menu":"완두시루","categorySeq":9,"menuSeq":9},
    {"category":"찰떡","menu":"이티","categorySeq":9,"menuSeq":10},
    {"category":"찰떡","menu":"콩깨편","categorySeq":9,"menuSeq":11},
    {"category":"찰떡","menu":"콩영양","categorySeq":9,"menuSeq":12},
    {"category":"찰떡","menu":"콩인절미","categorySeq":9,"menuSeq":13},
    {"category":"찰떡","menu":"콩편","categorySeq":9,"menuSeq":14},
    {"category":"찰떡","menu":"함시루","categorySeq":9,"menuSeq":15},
    {"category":"찰떡","menu":"현미모듬","categorySeq":9,"menuSeq":16},
    {"category":"찰떡","menu":"현미쑥인절미","categorySeq":9,"menuSeq":17},
    {"category":"찰떡","menu":"현미인절미","categorySeq":9,"menuSeq":18},
    {"category":"찰떡","menu":"흑임자인절미","categorySeq":9,"menuSeq":19},
  {"category":"찰떡","menu":"흰인절미","categorySeq":9,"menuSeq":20},
        {
            "category": "십리향선택",
            "menu": "[{\"모듬찰떡(기계)\":1},{\"단호박소담(기계)\":1},{\"완두시루떡(기계)\":1}]",
            "choiceNumber":2,
            "categorySeq":10,
            "menuSeq":0
        }
  ];

  menus=[];
  categorySelected;
  maxMenuId:number=0;

  constructor(public http: HttpClient,
              public events: Events, 
              public serverProvider:ServerProvider) {
    console.log('Hello StorageProvider Provider');
    this.serverProvider.post("getMenus",{}).then((res:any)=>{
        console.log("menus:"+JSON.stringify(res));
        this.convertMenuInfo(res.menus); 
        //this.convertMenuInfo([]);
    },(err)=>{

    })
  }

  convertMenuInfo(menus){
      let categories=[]; 
      menus.forEach(menu=>{
          if(categories.findIndex(function(value){
                return menu.category==value.category;
             })==-1){
               if(menu.type)
                  categories.push({category:menu.category, categorySeq:menu.categorySeq,type:menu.type});
               else 
                  categories.push({category:menu.category, categorySeq:menu.categorySeq});
          }
      })
      console.log("categories:"+JSON.stringify(categories));

      categories.sort(function(a,b){
          if(a.categorySeq<b.categorySeq)
              return -1;
          if(a.categorySeq>b.categorySeq)
              return 1;
          return 0;                
      });
      console.log("menus.sort:"+JSON.stringify(menus));


      let menuInfos=[];
      categories.forEach(category=>{
          let type;
          if(category.type)
            type=category.type;
          else
            type="general";
          menuInfos.push({type:type,category:category.category, id: "category_"+category.category, categorySeq:category.categorySeq,ids:[],menus:[],menuStrings:[]});
      })
       
        menus.forEach(menu=>{
          if(menu.menu!="empty"){
             let menuString=menu.menu;
             let type="general";
             let categoryIndex=categories.findIndex(function(value){
                  if(menu.category==value.category)
                    return true;
                  return false;  
             })
             if(menu.hasOwnProperty("choiceNumber") && menu.choiceNumber>0){
                    type="complex-choice";
                    let menuObjs=JSON.parse(menu.menu);
                    console.log("menuObj:"+JSON.stringify(menuObjs));
                    let index=0;
                    menuObjs.forEach(menuObj=>{
                        let menuString="";
                        let key:any=Object.keys(menuObj);
                        menuString+=key+menuObj[key]+" ";
                        menuInfos[categoryIndex].menuStrings.push(menuString); 
                        ++index;
                    });
                    menuInfos[categoryIndex].menus.push(menu);
                    menuInfos[categoryIndex].choiceNumber=menu.choiceNumber;
                    menuInfos[categoryIndex].type=type;
             }else if(menu.menu.indexOf("[")==0){ 
                        type="complex";  
                        let menuObjs=JSON.parse(menu.menu);
                        console.log("menuObj:"+JSON.stringify(menuObjs));
                        menuString="";
                        menuObjs.forEach(menuObj=>{
                        let key:any=Object.keys(menuObj);
                        menuString+=key+menuObj[key]+" ";
                        });
                    menuInfos[categoryIndex].type=type;
                    menuInfos[categoryIndex].menus.push(menu);
                    menuInfos[categoryIndex].menuStrings.push(menuString); 
             }else{
                    menuInfos[categoryIndex].ids.push("menu_"+this.maxMenuId++);
                    menuInfos[categoryIndex].menus.push(menu);
                    menuInfos[categoryIndex].menuStrings.push(menuString); 
                    //console.log("!!!menuids: "+JSON.stringify(menuInfos[categoryIndex]));
             }
          }
        })     
        
        menuInfos.forEach(category=>{
          category.menus.sort(function(a,b){
              if(a.menuSeq<b.menuSeq)
                  return -1;
              if(a.menuSeq>b.menuSeq)
                  return 1;
              return 0;   
            });
           // menuString도 변경되어야 한다. 순서에 영향받는 General에 대해서만 변경해주면 된다. 
           category.menuStrings=[];
           category.menus.forEach(menu=>{
              category.menuStrings.push(menu.menu);
           });
        });

       // 카테고리 정렬. 왜 두번해야 할까?
        menuInfos.sort(function(a,b){
           if(a.categorySeq<b.categorySeq)
              return -1;
          if(a.categorySeq>b.categorySeq)
              return 1;
          return 0;                
        });

      if(!this.categorySelected && categories.length>0)
          this.categorySelected=categories[0].category;

        this.menus = menuInfos;
        console.log("menus: " + JSON.stringify(this.menus));
        this.events.publish('update','menu');
  }

  removeGeneralMenu(reqbody){
        return new Promise((resolve,reject)=>{   
             this.serverProvider.post("removeMenu",reqbody).then((res:any)=>{
              if(res.result=="success"){
                  this.convertMenuInfo(res.menus);
                  resolve();
              }else{
                  if(res.error)
                      reject(res.error);
                  else 
                      reject("failure");   
              }
          },err=>{
              reject(err);
          })         
        });
  }

  addGeneralMenu(reqbody){
        return new Promise((resolve,reject)=>{   
             this.serverProvider.post("addMenu",reqbody).then((res:any)=>{
              if(res.result=="success"){
                  this.convertMenuInfo(res.menus);
                  resolve();
              }else{
                  if(res.error)
                      reject(res.error);
                  else 
                      reject("failure");   
              }
          },err=>{
              reject(err);
          })         
        });
  }

  addComplexMenu(reqbody){
        return new Promise((resolve,reject)=>{   
             this.serverProvider.post("addComplexMenu",reqbody).then((res:any)=>{
              if(res.result=="success"){
                  this.convertMenuInfo(res.menus);
                  resolve();
              }else{
                  if(res.error)
                      reject(res.error);
                  else 
                      reject("failure");   
              }
          },err=>{
              reject(err);
          })         
        });
  }
  
  removeCategory(reqbody){
        return new Promise((resolve,reject)=>{   
         this.serverProvider.post("removeCategory",reqbody).then((res:any)=>{
              if(res.result=="success"){
                  this.convertMenuInfo(res.menus);
                  resolve();
              }else{
                  if(res.error)
                      reject(res.error);
                  else 
                      reject("failure");   
              }
          },err=>{
              reject(err);
          })        
        });    
  }

  addCategory(reqbody){
        return new Promise((resolve,reject)=>{   
          this.serverProvider.post("addCategory",reqbody).then((res:any)=>{
              if(res.result=="success"){
                  this.convertMenuInfo(res.menus);
                  resolve();
              }else{
                  if(res.error)
                      reject(res.error);
                  else 
                      reject("failure");   
              }
          },err=>{
              reject(err);
          })          
        });    
  }

 changeSequence(reqbody){
        return new Promise((resolve,reject)=>{   
          this.serverProvider.post("changeSequence",reqbody).then((res:any)=>{
              console.log("res:"+JSON.stringify(res));
              if(res.result=="success"){
                  this.convertMenuInfo(res.menus);
                  resolve();
              }else{
                  if(res.error)
                      reject(res.error);
                  else 
                      reject("failure");    
              }
          },err=>{
              reject(err);
          })          
        });       
 }
}
