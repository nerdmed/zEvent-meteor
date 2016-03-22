/*------------------------------------------------------------------------------
 * JavaScript zEvents Library
 * Version 1.1
 * by Nicholas C. Zakas, http://www.nczonline.net/
 * Copyright (c) 2004-2005 Nicholas C. Zakas. All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307 USA
 *------------------------------------------------------------------------------
 */

/**
 * Encapsulates information about an event.
 * @scope public
 * @class
 */
 zEvent = function zEvent() {

     /**
      * The type of event.
      * @scope public
      */
     this.type /*: String */   = null;

     /**
      * The object that caused the event.
      * @scope public
      */
     this.target /*: zEventTarget */ = null;

     /**
      * A secondary object related to the event.
      * @scope public
      */
     this.relatedTarget /*: zEventTarget */ = null;

     /**
      * Indicates whether or not the event can be canceled.
      * @scope public
      */
     this.cancelable /*: boolean */ = false;

     /**
      * The time that the event occurred.
      * @scope public
      */
     this.timeStamp /*: long */ = null;

     /*
      * Set to false to cancel event.
      * @scope public
      */
     this.returnValue /*: boolean */ = true;
 }

/**
 * Initializes the event object with information for the event.
 * @scope public
 * @param sType The type of event encapsulated by the object.
 * @param bCancelable True if the event can be cancelled.
 */
zEvent.prototype.initEvent = function(sType /*: String */,
                                       bCancelable /*: boolean */) {
    this.type = sType;
    this.cancelable = bCancelable;
    this.timeStamp = (new Date()).getTime();
};

/**
 * Prevents the default behavior for an event.
 * @scope public
 */
zEvent.prototype.preventDefault = function() {
    if (this.cancelable) {
        this.returnValue = false;
    }
};

/**
 * Any class that wants to support events should inherit from this.
 * @class
 * @scope public
 */
zEventTarget = function zEventTarget() {

    /**
     * Array of event handlers.
     * @scope private
     */
    this.eventhandlers /*: Object */ = new Object();
}

/**
 * Adds an event listener function to handle the type of event.
 * @scope public
 * @param sType The type of event to handle (i.e., 'mousemove', not 'onmousemove').
 * @param fnListener The listener function for the event.
 */
zEventTarget.prototype.addEventListener = function(sType /*: String */,
                                                    fnListener /*: Function */) {
    if (typeof this.eventhandlers[sType] == 'undefined') {
        this.eventhandlers[sType] = new Array;
    }

    this.eventhandlers[sType][this.eventhandlers[sType].length] = fnListener;
};

/**
 * Causes an event to fire.
 * @scope public
 * @param oEvent The event object containing information about the event to fire.
 * @return True if the event should continue, false if not.
 */
zEventTarget.prototype.dispatchEvent = function(oEvent /*: zEvent */) /*: boolean */ {

    /*
     * Set the target of the event.
     */
    oEvent.target = this;

    /*
     * Call each event handler and pass in the event object.
     */
    if (typeof this.eventhandlers[oEvent.type] != 'undefined') {
        for (var i = 0; i < this.eventhandlers[oEvent.type].length; i++) {
            try {
                this.eventhandlers[oEvent.type][i](oEvent);
            }catch (e) {
                if (typeof console !== 'undefined' && console.error) {
                  console.error('[zEvents] Error in event listner ' + oEvent.type);
                  console.error(e);
                }
            }
        }
    }

    /*
     * Return the value of returnValue, which is changed to false
     * when preventDefault() is called.
     */

};

/**
 * Removes an event listener function from handling the type of event.
 * @scope public
 * @param sType The type of event to remove from (i.e., 'mousemove', not 'onmousemove').
 * @param fnListener The listener function to remove.
 */
zEventTarget.prototype.removeEventListener = function(sType /*: String */,
                                                       fnListener /*: Function */) {
    if (typeof this.eventhandlers[sType] != 'undefined') {
        var arrTemp = new Array;
        for (var i = 0; i < this.eventhandlers[sType].length; i++) {
            if (this.eventhandlers[sType][i] != fnListener) {
                arrTemp[arrTemp.length] = this.eventhandlers[sType][i];
            }
        }

        this.eventhandlers[sType] = arrTemp;
    }

};
