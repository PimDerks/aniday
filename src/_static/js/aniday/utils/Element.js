/**
 * Generic methods for adding/removing elements to the DOM.
 */
define(function(){

    'use strict';

    return {

        matches:(function(){

            var _method = null,el = document ? document.body : null;
            if (!el || el.matches) {
                _method = 'matches';
            }
            else if (el.webkitMatchesSelector) {
                _method = 'webkitMatchesSelector';
            }
            else if (el.mozMatchesSelector) {
                _method = 'mozMatchesSelector';
            }
            else if (el.msMatchesSelector) {
                _method = 'msMatchesSelector';
            }
            else if (el.oMatchesSelector) {
                _method = 'oMatchesSelector';
            }

            // if method found use native matchesSelector
            if (_method) {
                return function(element,selector) {
                    return element[_method](selector);
                };
            }

            // check if an element matches a CSS selector
            // https://gist.github.com/louisremi/2851541
            return function(element,selector) {

                // We'll use querySelectorAll to find all element matching the selector,
                // then check if the given element is included in that list.
                // Executing the query on the parentNode reduces the resulting nodeList,
                // document doesn't have a parentNode, though.
                var nodeList = (element.parentNode || document).querySelectorAll(selector) || [],
                    i = nodeList.length;

                // loop through nodeList
                while (i--) {
                    if (nodeList[i] == element) {return true;}
                }
                return false;
            };

        }()),

        parent:function(element,selector) {
            var parent = element;
            do {

                if (parent == document.documentElement) {
                    break;
                }

                if (parent && this.matches(parent,selector)) {
                    return parent;
                }
                // jshint -W084
            } while(parent = parent.parentNode);
            return null;
        },

        /**
         * Insert element inside another element at the top.
         * @memberof ElementHelper
         * @param {Element} The element to insert.
         * @param {Element} The element to insert the element to.
         * @static
         * @public
         */

        prepend: function (element, target) {
            return this.insertBefore(element,target.childNodes[0]);
        },

        /**
         * Insert element before another element.
         * @memberof ElementHelper
         * @param {Element} The element to insert.
         * @param {Element} The element to insert the element before.
         * @static
         * @public
         */

        insertBefore: function (element, target) {
            return target.parentNode.insertBefore(element,target);
        },

        /**
         * Insert element after another element.
         * @memberof ElementHelper
         * @param {Element} The element to insert.
         * @param {Element} The element to insert the element after.
         * @static
         * @public
         */

        insertAfter: function(element,target) {
            var parent = target.parentNode;
            if(parent.lastchild === target) {
                parent.appendChild(element);
            } else {
                parent.insertBefore(element, target.nextSibling);
            }
        },

        /**
         * Remove element.
         * @memberof ElementHelper
         * @param {Element}
         * @static
         * @public
         */

        remove: function (element) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        },

        /**
         * Get the x and y coordinates of an element.
         * @memberof ElementHelper
         * @param {Element}
         * @return {Object}
         * @static
         * @public
         */

        getPosition: function (element) {
            var pos = {x:0,y:0};
            if (element.offsetParent) {
                do {
                    pos.x += element.offsetLeft;
                    pos.y += element.offsetTop;
                    // jshint -W084
                } while (element = element.offsetParent);
            }
            return pos;
        },

        /**
         * Get the height of an element.
         * @memberof ElementHelper
         * @param {Element}
         * @return {Number}
         * @static
         * @public
         */

        getHeight: function (element) {

            // get size
            if (element.offsetHeight) {
                return element.offsetHeight;
            }

            return 0;

        },

        /**
         * Get the width of an element.
         * @memberof ElementHelper
         * @param {Element}
         * @return {Number}
         * @static
         * @public
         */

        getWidth: function (element) {

            // get size
            if (element.offsetWidth) {
                return element.offsetWidth;
            }

            return 0;

        },

        /**
         * Get the height and width of an element.
         * @memberof ElementHelper
         * @param {Element}
         * @return {Object}
         * @static
         * @public
         */

        getSize: function(element) {
            return {
                x:this.getWidth(element),
                y:this.getHeight(element)
            };
        }

    };

});