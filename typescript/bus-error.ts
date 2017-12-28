class Bus{
    public num:number; //field,버스 번호
    private isRunning:boolean//field, 운행여부

    constructor(num:number){ // constructor로 노선번호를  num에 저장한다.
        this.num=num;
        this.isRunning=false;
    }
   
    run(){
        if(!this.isRunning)
            this.isRunning=true;

    }

    stop(){
        if(this.isRunning)
            this.isRunning=false;
    }

    status(){
        return this.isRunning;
    }
}

var bus = new Bus(11);
bus.run();
console.log(bus.status());
bus.stop();
console.log(bus.status());

console.log(bus.isRunning); //compile error

