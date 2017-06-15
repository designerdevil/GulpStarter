(function (eu) {
    eu.utils = {
        // Global method for creating cookie
        // For creating cookie use this method ra.utils.createCookie(name, value, days, path, domain)
        // If any parameter is blank just pass blank quotes in it
        createCookie: function (name, value, days, path, domain) {

            if (name.length === 0) {
                return;
            }

            var expires, pathValue;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toGMTString();
            } else {
                expires = '';
            }

            if (path) {
                pathValue = path;
            } else {
                pathValue = '/';
            }

            if (typeof domain === "undefined" && location.host.indexOf("localhost") === -1) {
                domain = location.host;
                document.cookie = name + '=' + value + expires + '; path=' + pathValue + '; domain=' + domain;
            } else {
                document.cookie = name + '=' + value + expires + '; path=' + pathValue;
            }
        },

        // Global method for read cookie
        // For read cookie use this method ra.utils.readCookie(name)
        readCookie: function (name) {

            var expression = '(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)';
            return (name = new RegExp(expression).exec(document.cookie)) && name[1];
        },

        // Global method for eraseCookie cookie
        // For erase cookie use this method ra.utils.eraseCookie(name)
        // Here negative day is passed to remove the cookies. Negative date means cookies no more exist.

        eraseCookie: function (name) {
            eu.utils.createCookie(name, '', -1, '');
        },
        timeSince: function (date) {
            var seconds = Math.floor((new Date() - new Date(date)) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        },
        getUrlParam: function (name) {
            // Read a page's GET URL and return the query parameter value.
            var vars = [],
                hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars[name];
        },
        is_on_screen: function (elmn) {
            var win = $(window),
                viewport = {
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                },
                bounds = $(elmn).offset();

            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();

            bounds.right = bounds.left + $(elmn).outerWidth();
            bounds.bottom = bounds.top + $(elmn).outerHeight();
            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
        },
        debounce: function (func, wait, immediate) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },

        // dateFormat : function(date){
        //     var m_names = new Array("Jan", "Feb", "Mar",
        //     "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        //     "Oct", "Nov", "Dec");
        //     var today = new Date();
        //     var dd = today.getDate();
        //     var mm = today.getMonth();
        //     var yyyy = today.getFullYear();
        //     if(dd<10) { dd='0'+dd }
        //     var date= m_names[mm]+' '+dd+', '+yyyy;
        //     return date;
        // }

        gettingMonth: function (d) {
            var today = d;
            var m_names = new Array("Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                "Oct", "Nov", "Dec");
            var mm = today.split("-")[1],
                monthName = m_names[mm - 1];
            return monthName;
        },
        gettingMonthLong: function (d, type) {

            var m_names = new Array("January", "February", "March",
                "April", "May", "June", "July", "August", "September",
                "October", "November", "December"),
                m_short_names = new Array("Jan", "Feb", "Mar",
                    "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                    "Oct", "Nov", "Dec");


            if (type == 'short') {
                return m_short_names[d];
            }

            return m_names[d];
        },


        gettingDay: function (d) {
            var today = d;
            var day = today.split("-")[2].split("T")[0];
            return day;
        },
        getObjectFromString: function (str) {
            if (typeof(str) != "undefined") {
                var _objArr = str.split("."),
                    _ns = window[_objArr[0]];
                if (typeof _ns !== "undefined") {
                    for (var i = 1; i < _objArr.length; i++) {
                        _ns = _ns[_objArr[i]];
                    }
                } else {
                    console.error("something wrong with the namespace");
                }

                return _ns;
            }
            else {
                return false;
            }
        },

        unionBy: function (firstArr, secondArr, key) {

            var smallArr = [],
                bigArr = [],
                bigArrDict = {};

            //if (firstArr.length >= secondArr.length) {
            bigArr = firstArr;
            smallArr = secondArr;
            //}
            /*else {
             smallArr = firstArr;
             bigArr = secondArr;
             }*/

            for (var i = 0; i < bigArr.length; i++) {
                if (typeof bigArr[i] != 'undefined') {
                    bigArrDict[bigArr[i][key]] = i;
                }

            }

            for (var i = 0; i < smallArr.length; i++) {
                var _id = bigArrDict[smallArr[i][key]];
                if (typeof bigArr[_id] !== "undefined") {
                    this.mergeTwoObj(bigArr[_id], smallArr[i]);
                }
            }
            return bigArr;
        },

        mergeTwoObj: function (target, source) {

            for (var prop in source) {
                if (prop == 'pscore' && source[prop].hasOwnProperty('rounds') && !!source[prop].rounds.length) {
                    source[prop].rounds.forEach(function (item, index) {
                        //if (item.merge) { //commented because of ajax approach.
                            target[prop].rounds[index] = source[prop].rounds[index];
                        //}
                    });
                }
                else {
                    target[prop] = source[prop];
                }
            }
            return target;
        },
        compareJSON: function (obj1, obj2) {
            var ret = {};
            for (var i in obj2) {
                if (!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) {
                    ret[i] = obj2[i];
                }
            }
            return ret;
        },

        cloneOrder: function (source, target, key) {
            var i;
            var sortedArr = [];
            var sourceDict = {};
            var len = target.length;

            for (i = 0; i < len; i++) {
                if (typeof target[i] != 'undefined') {
                    sourceDict[target[i][key]] = target[i];
                }
            }

            for (i = 0; i < source.length; i++) {
                var _playerId = source[i][key];
                if(typeof sourceDict[_playerId] !== "undefined"){
                    sortedArr.push(sourceDict[_playerId]);
                    delete sourceDict[_playerId]; //Removing keys from object which are already pushed to array..
                }
            }

            for (var prop in sourceDict) {
                sortedArr.push(sourceDict[prop]); // Pushing remaining objects into array...
            }

            return sortedArr;
        },
        appendPositionSuffix: function(n) {
            var s=["th","st","nd","rd"],
            v=n%100;
            return n+(s[(v-20)%10]||s[v]||s[0]);
       },
       customToolTip: function (elm,event) {
            var tooltipdata = elm.data('tooltip'),
            tip = $('<span class="tooltiptext customtooltip-left">'+tooltipdata+'</span>');
            elm.hover(
              function() {
                elm.append(tip);
              }, function() {
                tip.remove();
              }
            );
       }

    }
}(eu));

