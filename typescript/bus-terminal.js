"use strict";
exports.__esModule = true;
var bus_1 = require("./bus");
var BusTerminal = /** @class */ (function () {
    function BusTerminal() {
        this.bus_list = new Array(); //bus목록
    }
    BusTerminal.prototype.open = function () {
        //bus 운행을 시작함
        this.bus_list.push(new bus_1.Bus(1));
        this.bus_list.push(new bus_1.Bus(3));
        this.bus_list.push(new bus_1.Bus(6));
    };
    return BusTerminal;
}());
var busTerminal = new BusTerminal();
busTerminal.open();
