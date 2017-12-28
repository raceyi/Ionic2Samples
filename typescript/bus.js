"use strict";
exports.__esModule = true;
var Bus = /** @class */ (function () {
    function Bus(num) {
        this.num = num;
        this.isRunning = false;
    }
    Bus.prototype.run = function () {
        if (!this.isRunning)
            this.isRunning = true;
    };
    Bus.prototype.stop = function () {
        if (this.isRunning)
            this.isRunning = false;
    };
    Bus.prototype.status = function () {
        return this.isRunning;
    };
    return Bus;
}());
exports.Bus = Bus;
