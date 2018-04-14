import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Events} from 'ionic-angular';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { StorageProvider } from '../../providers/storage/storage';

var gPage;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //////////////////////////
  // complex menu-begin
  newComplexMenuItems=[];
  newName;
  newAmount;
  //complex menu-end
  //////////////////////////
  newChoiceNumber:number;

  newCategory:string;
  newCategoryType:string="general";
  saveButtonHidden:boolean=true;

  scrollCategoryEnable:boolean=true; //category 영역의 scroll여부, drag가 시작되면 drop까지 scroll이 불가능해야함.
  scrollMenuEnable:boolean=true;

  currentCategoryMenus;
  
  maxMenuId:number=0;

    addComplexMenuItem(){
      if(!this.newName || this.newName.trim().length==0){
                let alert = this.alertCtrl.create({
                  title: '이름을 입력해주시기 바랍니다.',
                  buttons: ['확인']
                });
                alert.present();
                return;
      }
      if( !this.newAmount|| this.newAmount.trim().length==0){
                let alert = this.alertCtrl.create({
                  title: '수량을 입력해 주시기 바랍니다.',
                  buttons: ['확인']
                });
                alert.present();        
                return;
      }
      if(parseInt(this.newAmount)<=0){
                let alert = this.alertCtrl.create({
                  title: '수량은 0보다 커야만 합니다.',
                  buttons: ['확인']
                });
                alert.present();        
                return;
           
      }
      let object={};
      object[this.newName.trim()]=parseInt(this.newAmount);
      object["string"]=this.newName.trim()+" "+this.newAmount;
      this.newComplexMenuItems.push(object);
      /*
      this.newComplexMenuItems.sort( function(a,b){
          if(a.string <b.string) return -1;
          if(a.string>b.string) return 1;
          return 0;
      })
      */
      console.log("newComplexMenuItems:"+JSON.stringify(this.newComplexMenuItems));
      this.newName="";
      this.newAmount="";
  }

  saveComplexChoiceMenu(){
    if(this.newComplexMenuItems.length==0){
                let alert = this.alertCtrl.create({
                  title: '추가할 이름을 입력해주시기 바랍니다.',
                  buttons: ['확인']
                });
                alert.present();
                return;
    }
    
    // "menu": "[{\"모듬찰떡\":1},{\"단호박소담\":1},{\"완두시루떡\":1}]"
    let menu=[];
    let menuString="";
    this.newComplexMenuItems.forEach(item=>{
        console.log("item:"+JSON.stringify(item));
        menuString+=" "+item.string;      
        let obj=Object.assign({}, item); //deep copy
        delete obj.string;
        console.log("obj:"+JSON.stringify(obj));
        menu.push(obj);
    })
    let reqbody:any={category:this.currentCategoryMenus.category,categorySeq:this.currentCategoryMenus.categorySeq , menu:JSON.stringify(menu),menuSeq:0,choiceNumber:this.newChoiceNumber};
    let sequences=[];
    if(!this.saveButtonHidden){ //save all sequence values. humm...
        this.storageProvider.menus.forEach(category=>{
            if(category.category!=this.storageProvider.categorySelected){
                for(let i=0;i<category.menus.length;i++){
                    sequences.push( {category:category.menus[i].category,categorySeq:category.menus[i].categorySeq, menu:category.menus[i].menu,menuSeq:i});
                }
            }  
        })
    }
    this.storageProvider.addComplexMenu(reqbody).then(()=>{
        /*
        this.currentCategoryMenus.menuStrings.push(menuString);
        this.currentCategoryMenus.menus.push({category:this.currentCategoryMenus.category,categorySeq:this.currentCategoryMenus.categorySeq , menu:JSON.stringify(menu),menuSeq:0,choiceNumber:this.newChoiceNumber });
        //menuSeq 다시 계산. 메뉴 refresh도 오류를 줄일수 있는 방법이다.
        this.currentCategoryMenus.ids.push("menu_"+this.storageProvider.maxMenuId++); // id를 증가해서 넣어 줘야 한다. 우선은 맨 마지막에 저장한다.
        let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==gPage.currentCategoryMenus.category});     
        this.storageProvider.menus[categoryIndex] = this.currentCategoryMenus;// javascritp에서 reference의 저장은 어떻게 할까? menus에 currentCategoryMenus를 저장해야만 한다.
        */
        let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==gPage.currentCategoryMenus.category}); 
        this.currentCategoryMenus=this.storageProvider.menus[categoryIndex];
        this.saveButtonHidden=true;
        console.log("currentCategoryMenus:"+JSON.stringify(this.currentCategoryMenus.menus));                                        
        console.log("menus:"+JSON.stringify(this.storageProvider.menus));
            let alert = this.alertCtrl.create({
                    title: '메뉴가 저장되었습니다.',
                    buttons: ['확인']
            });
            alert.present();           
    },err=>{
            let alert = this.alertCtrl.create({
                    title: '메뉴 추가에 실패했습니다.',
                    subTitle: JSON.stringify(err),
                    buttons: ['확인']
            });
            alert.present();                
    })

  }

  saveSequence(){
        //save storageProvider.menus into server....
        let sequences=[];
        this.storageProvider.menus.forEach(category=>{
            sequences.push({category:category.category,categorySeq:category.categorySeq,menu:"empty",menuSeq:-1});
            for(let i=0;i<category.menus.length;i++)
                sequences.push({category:category.category,categorySeq:category.categorySeq,menu:category.menus[i].menu,menuSeq:i});
        })
        console.log("sequences:"+JSON.stringify(sequences));
        let reqbody={sequences:sequences};
        this.storageProvider.changeSequence(reqbody).then(()=>{
                this.saveButtonHidden=true;
        },err=>{
            let alert = this.alertCtrl.create({
                    title: '메뉴저장에 실패했습니다.',
                    subTitle: JSON.stringify(err),
                    buttons: ['확인']
            });
            alert.present();               
        })
  }

  saveComplexMenu(){
    if(this.newComplexMenuItems.length==0){
                let alert = this.alertCtrl.create({
                  title: '추가할 이름을 입력해주시기 바랍니다.',
                  buttons: ['확인']
                });
                alert.present();
                return;
    }

    // "menu": "[{\"모듬찰떡\":1},{\"단호박소담\":1},{\"완두시루떡\":1}]"
    let menu=[];
    let menuString="";
    this.newComplexMenuItems.forEach(item=>{
        console.log("item:"+JSON.stringify(item));
        menuString+=" "+item.string;      
        let obj=Object.assign({}, item); //deep copy
        delete obj.string;
        console.log("obj:"+JSON.stringify(obj));
        menu.push(obj);
    })
    let reqbody:any={category:this.currentCategoryMenus.category,categorySeq:this.currentCategoryMenus.categorySeq , menu:JSON.stringify(menu),menuSeq:0};
    let sequences=[];
    if(!this.saveButtonHidden){ //save all sequence values. humm...
        this.storageProvider.menus.forEach(category=>{
            if(category.category!=this.storageProvider.categorySelected){
                    sequences.push({category:category.category,categorySeq:category.categorySeq,menu:"empty",menuSeq:-1});
                for(let i=0;i<category.menus.length;i++){
                    sequences.push( {category:category.menus[i].category,categorySeq:category.menus[i].categorySeq, menu:category.menus[i].menu,menuSeq:i});
                }
            }  
        })
    }
    this.storageProvider.addComplexMenu(reqbody).then(()=>{
        /*
        this.currentCategoryMenus.menuStrings.push(menuString);
        this.currentCategoryMenus.menus.push({category:this.currentCategoryMenus.category,categorySeq:this.currentCategoryMenus.categorySeq , menu:JSON.stringify(menu),menuSeq:0 });
        //menuSeq 다시 계산. 메뉴 refresh도 오류를 줄일수 있는 방법이다.
        let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==gPage.currentCategoryMenus.category});     
        this.storageProvider.menus[categoryIndex] = this.currentCategoryMenus;// javascritp에서 reference의 저장은 어떻게 할까? menus에 currentCategoryMenus를 저장해야만 한다.
        */
        let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==gPage.currentCategoryMenus.category}); 
        this.currentCategoryMenus=this.storageProvider.menus[categoryIndex];        
        this.saveButtonHidden=true;
        console.log("currentCategoryMenus:"+JSON.stringify(this.currentCategoryMenus.menus));                                        
        console.log("menus:"+JSON.stringify(this.storageProvider.menus));
            let alert = this.alertCtrl.create({
                    title: '메뉴가 저장되었습니다.',
                    buttons: ['확인']
            });
            alert.present();         
    },err=>{
            let alert = this.alertCtrl.create({
                    title: '메뉴 추가에 실패했습니다.',
                    subTitle: JSON.stringify(err),
                    buttons: ['확인']
            });
            alert.present();                
    })
  }


  removeGeneralMenu(i){    
      console.log("removeGeneralMenu-currentCategoryMenus:"+JSON.stringify(this.currentCategoryMenus));
    let alert = this.alertCtrl.create({
                          title: this.currentCategoryMenus.menus[i].menu+"를 삭제합니다",
                          buttons: [
                          {
                            text: '아니오',
                            handler: () => {
                              return;
                            }
                          },
                          {
                            text: '네',
                            handler: () => {
                                  let reqbody:any={category:this.currentCategoryMenus.category, menu:this.currentCategoryMenus.menus[i].menu};
                                  let sequences=[];
                                  if(!this.saveButtonHidden){ //save all sequence values. humm...
                                    this.storageProvider.menus.forEach(category=>{
                                        if(category.category!=this.storageProvider.categorySelected){
                                                sequences.push({category:category.category,categorySeq:category.categorySeq,menu:"empty",menuSeq:-1});
                                            for(let i=0;i<category.menus.length;i++){
                                                sequences.push( {category:category.menus[i].category,categorySeq:category.menus[i].categorySeq, menu:category.menus[i].menu,menuSeq:i});
                                            }
                                        }  
                                    })
                                  }
                                  let menus=this.currentCategoryMenus.menus.slice(0); //!!!copy array!!! 중요하다.
                                  menus.splice(i,1);
                                  for(let i=0;i<menus.length;i++)
                                      sequences.push({ category:menus[i].category,categorySeq:menus[i].categorySeq, menu:menus[i].menu,menuSeq:i});
                                  reqbody.sequences=sequences;
                                  this.storageProvider.removeGeneralMenu(reqbody).then(()=>{
                                      /*
                                        // 메뉴 정보를 다시 가져오는것은 어떨까?
                                        this.currentCategoryMenus.menuStrings.splice(i,1);
                                        this.currentCategoryMenus.menus.splice(i,1);
                                        //menuSeq 다시 계산. 메뉴 refresh도 오류를 줄일수 있는 방법이다.
                                        for(let i=0;i<this.currentCategoryMenus.menus.length;i++)
                                             this.currentCategoryMenus.menus[i].menuSeq=i;
                                        this.currentCategoryMenus.ids.splice(i,1);
                                        let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==gPage.currentCategoryMenus.category});     
                                        this.storageProvider.menus[categoryIndex] = this.currentCategoryMenus;// javascritp에서 reference의 저장은 어떻게 할까? menus에 currentCategoryMenus를 저장해야만 한다.
                                        */
                                        this.saveButtonHidden=true;
                                        //console.log("currentCategoryMenus:"+JSON.stringify(this.currentCategoryMenus.menus));                                        
                                  },err=>{
                                        let alert = this.alertCtrl.create({
                                                title: '메뉴 삭제에 실패했습니다.',
                                                subTitle: JSON.stringify(err),
                                                buttons: ['확인']
                                        });
                                        alert.present();                
                                  })
                            }
                          }]});
      alert.present();                       
 }      
  

  addGeneralMenu(){
        if(!this.newName || this.newName.trim().length==0){
                    let alert = this.alertCtrl.create({
                    title: '이름을 입력해주시기 바랍니다.',
                    buttons: ['확인']
                    });
                    alert.present();
                    return;
        }
        let reqbody:any={category:this.currentCategoryMenus.category, menu:this.newName,categorySeq:this.currentCategoryMenus.categorySeq ,menuSeq:this.currentCategoryMenus.menus.length};
        let sequences=[];
        if(!this.saveButtonHidden){ //save all sequence values. humm...
            this.storageProvider.menus.forEach(category=>{
                        sequences.push({category:category.category,categorySeq:category.categorySeq,menu:"empty",menuSeq:-1});
                    for(let i=0;i<category.menus.length;i++){
                        sequences.push( {category:category.menus[i].category,categorySeq:category.menus[i].categorySeq, menu:category.menus[i].menu,menuSeq:i});
                    }
            })
        }
        reqbody.sequences=sequences;

        this.storageProvider.addGeneralMenu(reqbody).then(()=>{
            // 메뉴 정보를 다시 가져오는것은 어떨까?
            /*
            this.currentCategoryMenus.menuStrings.push(this.newName);
            this.currentCategoryMenus.menus.push({category:this.currentCategoryMenus.category,categorySeq:this.currentCategoryMenus.categorySeq, menu:this.newName,menuSeq:this.currentCategoryMenus.menus.length});
            //menuSeq 다시 계산. 메뉴 refresh도 오류를 줄일수 있는 방법이다.
            this.currentCategoryMenus.ids.push("menu_"+this.storageProvider.maxMenuId++); // id를 증가해서 넣어 줘야 한다. 우선은 맨 마지막에 저장한다.
            let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==gPage.currentCategoryMenus.category});     
            this.storageProvider.menus[categoryIndex] = this.currentCategoryMenus;// javascritp에서 reference의 저장은 어떻게 할까? menus에 currentCategoryMenus를 저장해야만 한다.
            let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==gPage.currentCategoryMenus.category}); 
            this.currentCategoryMenus=this.storageProvider.menus[categoryIndex];
            */
            this.saveButtonHidden=true;
            console.log("currentCategoryMenus:"+JSON.stringify(this.currentCategoryMenus.menus));                                        
            this.newName="";
            this.newAmount="";
            this.newComplexMenuItems=[];            
        },err=>{
            if(typeof err==="string" && err.indexOf("AlreadyExist")>=0){
                let alert = this.alertCtrl.create({
                    title: '이미 존재하는 메뉴입니다.',
                    buttons: ['확인']
                });
                alert.present();
            }else{
                let alert = this.alertCtrl.create({
                    title: '메뉴 추가에 실패했습니다.',
                    subTitle:JSON.stringify(err),
                    buttons: ['확인']
                });
                alert.present();                
                
            }
        })      
  }

  removeComplexMenuItems(i){
    this.newComplexMenuItems.splice(i,1);    
  }

  categorySelectedCheck(category){
      if(this.storageProvider.categorySelected==category)
          return true;
      return false;    
  }
  
  constructor(public navCtrl: NavController, 
              public alertCtrl:AlertController, 
              public storageProvider:StorageProvider,
               public events: Events,
               public ngZone:NgZone,
              private drag: DragulaService) {

      gPage=this;
      this.storageProvider.maxMenuId=0;
      if(this.storageProvider.menus.length>0){
          this.currentCategoryMenus=this.storageProvider.menus[0];
      }

      events.subscribe('update', (tablename) => {
            console.log("UI receive update event");
            this.ngZone.run(()=>{
                console.log("tablename:"+tablename);
                if(tablename=="menu"){
                    if(this.storageProvider.menus.length==0) return; // do nothing
                    console.log("currentCategoryMenus:"+JSON.stringify(this.currentCategoryMenus));                    
                    if(!this.currentCategoryMenus){  // initialize currentCategoryMenus
                        this.currentCategoryMenus=this.storageProvider.menus[0];
                    }else{
                        //update currentCategoryMenus
                        let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==gPage.currentCategoryMenus.category}); 
                        if(categoryIndex==-1)
                            categoryIndex=0;    
                        this.currentCategoryMenus=this.storageProvider.menus[categoryIndex];
                        console.log("menuStrings:"+JSON.stringify(this.currentCategoryMenus.menuStrings));
                    }
                    if(this.currentCategoryMenus.type.startsWith("complex")){
                                //선택옵션의 경우 newComplexMenuItems사용을 위해 초기회가 필요하다.
                            this.newComplexMenuItems=[];
                            if(this.currentCategoryMenus.type.startsWith("complex") && this.currentCategoryMenus.menus.length>0){
                                    let menuObj=JSON.parse(this.currentCategoryMenus.menus[0].menu);
                                    menuObj.forEach(menu=>{
                                        let key:any=Object.keys(menu);
                                        let object={};
                                        object[key]=menu[key];
                                        object["string"]=key+" "+menu[key];
                                        this.newComplexMenuItems.push(object);
                                    });
                                    this.newAmount=undefined;
                                    this.newName="";
                                    console.log("newComplexMenuItems:"+JSON.stringify(this.newComplexMenuItems));
                                    if(this.currentCategoryMenus.type=="complex-choice")
                                        this.newChoiceNumber=this.currentCategoryMenus.menus[0].choiceNumber;
                            }
                    }
                    console.log("currentCategoryMenus:"+JSON.stringify(this.currentCategoryMenus));
                }
            })
      });

      this.drag.drag.subscribe((val) =>
      {
         // Log the retrieved HTML element ID value
         console.log('Is dragging: ' + val[1].id);
         if(val[1].id.startsWith("category_")){
             this.scrollCategoryEnable=false;
         }else if(val[1].id.startsWith("menu_")){
              this.scrollMenuEnable=false;
         }
      });

      // Subscribe to the drop event for the list component once it has
      // been dropped into location by the user
      this.drag.drop.subscribe((val) =>
      {
         // Log the retrieved HTML ID value and the re-ordered list value
         console.log('Is dropped: ' + val[1].id);
         //this.onDrop(val[2]);
         if(val[1].id.startsWith("category_")){
             this.scrollCategoryEnable=true;
             this.restructCategories(val[2]);
         }else if(val[1].id.startsWith("menu_")){
             this.scrollMenuEnable=true;
             this.restructMenus(val[2]);
         }
      });
  }

  restructCategories(val:any){
     let newMenus=[];
      val.childNodes.forEach((item)=>{
          console.log("item.id"+item.id);
          if(item.id && item.id.startsWith("category_")){
              let category=this.storageProvider.menus.findIndex(function(category){return category.id==item.id});
              newMenus.push(this.storageProvider.menus[category]);
          }
      })

      //compute categorySeq again.
      let index=0;
      newMenus.forEach(category=>{
        category.categorySeq=index;
        index++;
      });
      //change categorySeq in all menus.
      newMenus.forEach(category=>{
        console.log("category:"+category.category+ "seq:"+ category.categorySeq);
        category.menus.forEach(menu=>{
            menu.categorySeq=category.categorySeq;
        })
      });
      this.storageProvider.menus=newMenus;
      this.saveButtonHidden=false;
      console.log("menus:"+JSON.stringify(this.storageProvider.menus));
  }

  restructMenus(val:any){
      console.log("restructMenus");
      let menus=[];
      let menuStrings=[];
      let ids=[];
      val.childNodes.forEach((item)=>{
          //console.log("item.id"+item.id+ "ids:"+JSON.stringify(this.currentCategoryMenus.ids));
          if(item.id && item.id.startsWith("menu_")){
              let menuIndex=this.currentCategoryMenus.ids.findIndex(function(id){return id==item.id});
              menus.push(this.currentCategoryMenus.menus[menuIndex]);
              menuStrings.push(this.currentCategoryMenus.menuStrings[menuIndex]);
              ids.push(this.currentCategoryMenus.ids[menuIndex]);
          }
      })
      console.log("menus: "+JSON.stringify(menus));
      // menuSeq를 변경한단.
      for(let i=0;i<menus.length;i++){
           menus[i].menuSeq=i;
      }
      this.currentCategoryMenus.menus=menus;
      this.currentCategoryMenus.menuStrings=menuStrings;
      this.currentCategoryMenus.ids=ids;      
      //apply it into this.menus. 처리하자....  this를 넘기질 못한다. 그냥 global 변수를 사용하자.
      let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==gPage.currentCategoryMenus.category});     
      this.storageProvider.menus[categoryIndex]=this.currentCategoryMenus;
      this.saveButtonHidden=false;
      console.log("menus:"+JSON.stringify(this.storageProvider.menus[categoryIndex]));
  }

   selectCategory(category){
      console.log("selectCategory:"+category);
	  this.storageProvider.categorySelected=category;
      let categoryIndex=this.storageProvider.menus.findIndex(function(val){return val.category==category});     
      this.currentCategoryMenus=this.storageProvider.menus[categoryIndex];
      //선택옵션의 경우 newComplexMenuItems사용을 위해 초기회가 필요하다.
      this.newComplexMenuItems=[];
      if(this.currentCategoryMenus.type.startsWith("complex") && this.currentCategoryMenus.menus.length>0){
            let menuObj=JSON.parse(this.currentCategoryMenus.menus[0].menu);
            menuObj.forEach(menu=>{
                let key:any=Object.keys(menu);
                let object={};
                object[key]=menu[key];
                object["string"]=key+" "+menu[key];
                this.newComplexMenuItems.push(object);
            });
            this.newAmount=undefined;
            this.newName="";
            console.log("newComplexMenuItems:"+JSON.stringify(this.newComplexMenuItems));
            if(this.currentCategoryMenus.type=="complex-choice")
                this.newChoiceNumber=this.currentCategoryMenus.menus[0].choiceNumber;
      }
      this.newAmount=undefined;
      this.newName="";
      console.log("newComplexMenuItems:"+JSON.stringify(this.newComplexMenuItems));

      console.log("currentCategoryMenus:"+JSON.stringify(this.currentCategoryMenus));
   }


   reconfigureSeq(menus){
        //compute categorySeq again.
        let index=0;
        menus.forEach(category=>{
            category.categorySeq=index;
            index++;
        });
        menus.forEach(category=>{
            for(let i=0;i<category.menus.length;i++){
                category.menus[i].categorySeq=category.categorySeq;
                category.menus[i].menuSeq=i;
            }
        })
        
        let sequences=[];
        for(let j=0;j<menus.length;j++){
            let category=menus[j];
            sequences.push({category:category.category,categorySeq:category.categorySeq,menu:"empty",menuSeq:-1});                                        
            for(let i=0;i<category.menus.length;i++){
                sequences.push( {category:category.category,categorySeq:category.categorySeq, menu:category.menus[i].menu,menuSeq:i});
            }
        }
        return sequences;
   }

   addCategory(){
       if(!this.newCategory || this.newCategory.trim().length==0){
            let alert = this.alertCtrl.create({
                title: '카테고리 이름을 입력해주시기 바랍니다.',
                buttons: ['확인']
                });
                alert.present();
            return;
       }
        let sequences=[];
        // category 추가는 맨 마지막에 들어감으로 기존 메뉴의 sequence에는 영향을 주지 않는다.
        if(!this.saveButtonHidden){
            this.storageProvider.menus.forEach(category=>{
                sequences.push({category:category.category,categorySeq:category.categorySeq,menu:"empty",menuSeq:-1});
                for(let i=0;i<category.menus.length;i++)
                    sequences.push({category:category.category,categorySeq:category.categorySeq,menu:category.menus[i].menu,menuSeq:i});
            })
        }
        let reqBody={category:this.newCategory, type:this.newCategoryType, categorySeq:this.storageProvider.menus.length ,sequences:sequences};    
        this.storageProvider.addCategory(reqBody).then(()=>{
            // server로 부터 최신 정보를 받아오자.
            let alert = this.alertCtrl.create({
                    title: this.newCategory+'가 추가되었습니다.',
                    buttons: ['확인']
            });
            alert.present();
            this.newCategory="";  
            this.saveButtonHidden=true;
        },err=>{
            let alert = this.alertCtrl.create({
                    title: '카테고리 추가에 실패했습니다.',
                    subTitle: JSON.stringify(err),
                    buttons: ['확인']
            });
            alert.present();                
        })
   }


   removeCategory(category){
    console.log("removeCategory:"+category.category);
    let alert = this.alertCtrl.create({
                          title: category.category+"를 삭제합니다",
                          buttons: [
                          {
                            text: '아니오',
                            handler: () => {
                              return;
                            }
                          },
                          {
                            text: '네',
                            handler: () => {
                                let menus=this.storageProvider.menus.slice(0);
                                let categoryIndex=menus.findIndex(function(val){return val.category==category.category});     
                                console.log("categoryIndex:"+categoryIndex);      
                                menus.splice(categoryIndex,1);
                                let sequences=this.reconfigureSeq(menus);
                                let reqBody={category:category.category,sequences:sequences,type:category.type};
                                this.storageProvider.removeCategory(reqBody).then(()=>{
                                        // console.log(" "+ (this.categorySelected==category.category));
                                        if(this.storageProvider.categorySelected==category.category && this.storageProvider.menus.length>0){ //선택된 카테고리의 삭제라면 0번째를 선택함.
                                            this.storageProvider.categorySelected=this.storageProvider.menus[0].category;
                                            //this.currentCategoryMenus=this.storageProvider.menus[0].menus;
                                            console.log("this.categorySelected"+this.storageProvider.categorySelected);
                                        }else if(this.storageProvider.menus.length==0){
                                            this.storageProvider.categorySelected="";
                                            this.currentCategoryMenus={type:"general",menuStrings:[]};
                                        }  
                                        this.saveButtonHidden=true;
                                },err=>{
                                        let alert = this.alertCtrl.create({
                                                title: '카테고리 삭제에 실패했습니다.',
                                                subTitle: JSON.stringify(err),
                                                buttons: ['확인']
                                        });
                                        alert.present();                
                                })
                            }
                        }]});
          alert.present();              
   }

   categoyTypeSelect(type){
        this.newCategoryType=type;
        console.log("categoyTypeSelect "+this.newCategoryType);
   }

  close(){
      if(!this.saveButtonHidden){
          let alert = this.alertCtrl.create({
                          title: "메뉴 변경사항을 저장합니다.",
                          buttons: [
                          {
                            text: '아니오',
                            handler: () => {
                              //Please refresh menus from server !!!
                              return;
                            }
                          },
                          {
                            text: '네',
                            handler: () => {
                                  this.saveSequence(); //?? call serverAPI with promise return value
                                  return;
                            }
                          }]});
                    alert.present();       
      }
  }
}
