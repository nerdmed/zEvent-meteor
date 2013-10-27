//sample class
function Car() {

    //inherit properties from zEventTarget
    zEventTarget.apply(this);

    //property indicating if the car is running
    this.running = false;
}

//inherit methods from zEventTarget
Car.prototype = new zEventTarget();

//method to start engine
Car.prototype.start = function () {

    //create event object
    var oEvent = new zEvent();

    //the event is called "start" and is cancelable
    oEvent.initEvent("start", true);

    //fire the event
    if (this.dispatchEvent(oEvent)) {

       //if dispatchEvent() returns true, set the flag
       this.running = true;
    }

};

//method to stop engine
Car.prototype.stop = function () {

    //create event object
    var oEvent = new zEvent();

    //the event is called "stop" and is cancelable
    oEvent.initEvent("stop", true);

    //fire the event
    if (this.dispatchEvent(oEvent)) {

        //if dispatchEvent() returns true, set the flag
        this.running = false;
    }

};     