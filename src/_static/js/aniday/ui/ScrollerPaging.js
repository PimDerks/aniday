define(['module', 'conditioner/Observer', 'utils/Element'], function (module, Observer, ElementHelper) {

    'use strict';

    var exports = function (Scroller, ScrollerOptions) {

        if (!Scroller) {
            return;
        }

        this._options = ScrollerOptions;
        this._scroller = Scroller;
        this._items = this._scroller.getItems();
        this._number = this._items.length;
        this._indexItem = null;

        this._initialize();

    };

    exports.prototype = {

        /**
         * Create elements
         *
         * @memberof ScrollerPaging
         * @static
         * @private
         */

        _initialize: function () {

            if(!this._element){
                this._element = document.createElement('ul');
                this._element.className = 'scroller-paging';
            }

            this._buttons = [];

            var i,
                l,
                indexItem,
                button,
                f = document.createDocumentFragment(),
                visible = this._scroller.getVisibleAmount();

            // TODO: Event delegation instead of events on every button
            for (i = 0, l = this._number; i < l; i++) {

                if (i % visible === 0 && !this._options.pagingPerItem || this._options.pagingPerItem) {

                    indexItem = document.createElement('li');

                    button = document.createElement('button');
                    button.setAttribute('type', 'button');
                    button.innerHTML = '<span class="screenreader">' + (i + 1) + '</span>';
                    button.addEventListener('click', this._handleButtonClick.bind(this, i));

                    indexItem.appendChild(button);
                    f.appendChild(indexItem);
                    this._buttons.push(button);

                }

            }

            // append fragment
            this._element.appendChild(f);

        },

        /**
         * Handle clicks on button
         *
         * @memberof ScrollerPaging
         * @param {Number}
         * @static
         * @private
         */

        _handleButtonClick: function (index) {
            Observer.publish(this, 'click', index);
        },

        /**
         * Get the node containing the paging.
         *
         * @memberof ScrollerPaging
         * @return {Element}
         * @static
         * @private
         */

        getIndex: function () {
            return this._element;
        },

        /**
         * Set active index
         *
         * @memberof ScrollerPaging
         * @param {Number}
         * @static
         * @private
         */

        setIndex: function (index) {

            // remove class active from index item
            if (this._indexItem) {
                this._indexItem.classList.remove('active');
            }

            if (!this._options.pagingPerItem) {
                index = Math.floor((index / this._number) * this._buttons.length);
            }

            // set class active to index item
            var indexItem = this._buttons[index].parentNode;
            indexItem.classList.add('active');
            this._indexItem = indexItem;
            this._index = index;

        },

        /**
         * Create HTML for paging component
         *
         * @memberof ScrollerPaging
         * @static
         * @public
         */

        render:function () {

            // remove <li>'s
            var li = this._element.querySelectorAll('li'),
                l = li.length;

            for (l >= 0; l--;) {
                ElementHelper.remove(li[l]);
            }

            var _this = this;
            setTimeout(function () {

                // re-initialize
                _this._initialize();
                _this.setIndex(_this._index);

            }, 500);

        }

    };

    return exports;

});