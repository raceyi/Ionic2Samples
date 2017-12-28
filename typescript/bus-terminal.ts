import {Bus} from './bus';

class BusTerminal{

    private bus_list=new Array<Bus>(); //bus목록
    
    constructor(){

    }

    open(){
        //bus 운행을 시작함
        this.bus_list.push(new Bus(1));
        this.bus_list.push(new Bus(3));
        this.bus_list.push(new Bus(6));        
    }
}

let busTerminal=new BusTerminal();
busTerminal.open();
