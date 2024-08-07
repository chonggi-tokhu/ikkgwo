(function (gTh, CGRshorter) { "object" == typeof exports && "undefined" != typeof module ? module.exports = CGRshorter() : "function" == typeof define && define.amd ? define(CGRshorter) : (gTh = "undefined" != typeof globalThis ? globalThis : gTh || self).ColourgreyShorterJS = CGRshorter() })(this, function () {
    function returnAllInOneArr(arr) {
        var rtv = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length > 0 && Array.isArray(arr[i])) {
                var aderr = returnAllInOneArr(arr[i]);
                for (var ijk = 0; ijk < aderr.length; ijk++) {
                    rtv[rtv.length] = aderr[ijk];
                };
            } else {
                if (!Array.isArray(arr[i])) {
                    rtv[rtv.length] = arr[i];
                }


            };
        };
        return rtv;
    };
    function checkObj(param0) {
        if (typeof param0 == 'object' && param0 != null) {
            return true;
        } else {
            return false;
        }
    };
    function checkNumber(param0) {
        if (typeof param0 == 'number' && !isNaN(param0)) {
            return true;
        } else {
            return false;
        }
    };
    function checkNumberNotNaNandNaN(param0) {
        return (typeof param0 == 'number');
    }
    function checkString(param0) {
        if (typeof param0 == 'string') {
            return true;
        } else {
            return false;
        }
    };
    function checkInteger(param0) {
        if (checkNumber(param0)) {
            if (parseInt(param0) == param0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    function checkArr(param0) {
        if (Array.isArray(param0)) {
            return true;
        } else {
            return false;
        }
    };
    function checkObjNotArr(param0) {
        if (checkObj(param0) && !checkArr(param0)) {
            return true;
        } else {
            return false;
        }
    };
    function checkBool(param0) {
        return (typeof param0 == 'boolean');
    };
    function checkFunc(param0) {
        return (typeof param0 == 'function');
    };
    function checkUndefined(param0) {
        return (typeof param0 == 'undefined');
    };
    function checkNull(param0) {
        return (typeof param0 == 'object' && param0 == null);
    };
    function checkObjnotaNullandObjtobeNull(param0) {
        if (typeof param0 == 'object') {
            return true;
        } else {
            return false;
        }
    };
    function checkHTMLElement(param0) {
        if (param0 instanceof HTMLElement) {
            return true;
        } else {
            return false;
        }
    };
    function checkObjandItsProperty(param0, propname, condition) {
        if (checkObj(param0)) {
            if (checkFunc(condition)) {
                return condition(param0[propname]);
            } else if (checkObj(condition)) {
                if (condition.checkingType == true) {
                    if (typeof param0[propname] == condition.dataTypetoMatch) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return (param0[propname] == condition);
            }
        }
        return false;
    };
    function checkObjandItsProperties(param0, [...propname], condition) {
        var rtv = true;
        for (var i = 0; i < propname.length; i++) {
            if (!checkObjandItsProperty(param0, propname[i], condition)) {
                rtv = false;
            }
        }
        return rtv;
    };
    function checkStringandifItisnotanEmptyStr(param0) {
        return (checkString(param0) && param0 != '');
    };
    Math.custom_round_dec = function (param0, significant) {
        if (checkNumber(param0) && typeof significant === 'undefined') {
            return Math.round(param0);
        }
        if (isNaN(param0) || isNaN(significant)) {
            return NaN;
        }
        if (!(typeof param0 == 'number' && typeof significant == 'number')) {
            return NaN;
        }
        return Math.round(param0 * (10 ** significant)) / (10 ** significant);
    };
    Math.custom_round_bigNumb = function (param0, significant) {
        if (checkNumber(param0) && typeof significant === 'undefined') {
            return Math.round(param0 / (10 ** (new String(param0).split('.')[0].length - 1))) * (10 ** (new String(param0).split('.')[0].length - 1));
        }
        if (isNaN(param0) || isNaN(significant)) {
            return NaN;
        }
        if (!(typeof param0 == 'number' && typeof significant == 'number')) {
            return NaN;
        }
        return Math.round(param0 / (10 ** significant)) * (10 ** significant);
    };
    Math.custom_floor_dec = function (param0, significant) {
        if (isNaN(param0) || isNaN(significant)) {
            return NaN;
        }
        if (!(typeof param0 == 'number' && typeof significant == 'number')) {
            return NaN;
        }
        return Math.floor(param0 * (10 ** significant)) / (10 ** significant);
    };
    Math.custom_floor_bigNumb = function (param0, significant) {
        if (checkNumber(param0) && typeof significant === 'undefined') {
            return Math.floor(param0 / (10 ** (new String(param0).split('.')[0].length - 1))) * (10 ** (new String(param0).split('.')[0].length - 1));
        }
        if (isNaN(param0) || isNaN(significant)) {
            return NaN;
        }
        if (!(typeof param0 == 'number' && typeof significant == 'number')) {
            return NaN;
        }
        return Math.floor(param0 / (10 ** significant)) * (10 ** significant);
    };
    Math.divide_andGet_inInteger = function (param0, param1) {
        return (param0 - (param0 % param1)) / param1;
    };
    Array.prototype.returnAllInOneArr = function () {
        var rtv = [];
        for (var i = 0; i < this.length; i++) {
            if (this[i].length > 0) {
                var aderr = returnAllInOneArr(this[i]);
                for (var ijk = 0; ijk < aderr.length; ijk++) {
                    rtv[rtv.length] = aderr[ijk];
                };
            } else {
                if (!Array.isArray(this[i])) {
                    rtv[rtv.length] = this[i];
                }

            };
        };
        return rtv;
    };
    String.prototype.splitByIdx = function (idx) {
        if (typeof idx == 'number' && !isNaN(idx)) {
            var rtv = [
                this.slice(0, idx),
                this.slice(idx, this.length - 1),
            ];
            return rtv;
        };
        return this;
    };
    String.prototype.insertOn = function (texttoinsert, idx) {
        if (typeof idx == 'number' && !isNaN(idx)) {
            var rtv = this.slice(0, idx) + texttoinsert + this.slice(idx, this.length);
            return rtv;
        };
    };
    String.prototype.toIntegerNumber = function () {
        var thisstring = new String(this);
        for (var i = 0; i < this.length; i++) {
            if (isNaN(parseInt(thisstring[i])) && thisstring[i] != `.`) {
                thisstring = thisstring.replace(thisstring[i], '');
            }
        }
        return Number(thisstring);
    }
    NodeList.prototype.toArray = function () {
        var rtv = [];
        for (var i = 0; i < this.length; i++) {
            rtv[rtv.length] = this.item(i);
        };
        return rtv;
    };
    HTMLCollection.prototype.toArray = function () {
        var rtv = [];
        for (var i = 0; i < this.length; i++) {
            rtv[rtv.length] = this.item(i);
        };
        return rtv;
    };
    function getElementsByAttrValue(thisobj, attr, value) {
        if (!(thisobj instanceof HTMLElement)) {
            return false;
        }
        var rtv = [];
        for (var i = 0; i < thisobj.children.length; i++) {
            if (thisobj.children.item(i).getAttribute(attr) == value) {
                rtv[rtv.length] = thisobj.children.item(i);

            };
            if (thisobj.children.item(i).children.length > 0) {
                rtv[rtv.length] = getElementsByAttrValue(thisobj.children.item(i), attr, value);
            };
        };
        var rtv2 = returnAllInOneArr(rtv);
        return rtv2;
    }
    HTMLElement.prototype.getElementsByAttrValue = function (attr, value) {
        var rtv = [];
        for (var i = 0; i < this.children.length; i++) {
            if (this.children.item(i).getAttribute(attr) == value) {
                rtv[rtv.length] = this.children.item(i);
            };
            if (this.children.item(i).children.length > 0) {
                if (!checkFunc(this.children.item(i).getElementsByAttrValue)) {
                    rtv[rtv.length] = getElementsByAttrValue(this.children.item(i), attr, value);
                } else {
                    rtv[rtv.length] = this.children.item(i).getElementsByAttrValue(attr, value);
                }
            };
        };
        var rtv2 = returnAllInOneArr(rtv);
        return rtv2;
    };
    Document.prototype.getElementsByAttrValue = function (attr, value) {
        var rtv = [];
        for (var i = 0; i < this.children.length; i++) {
            if (this.children.item(i).getAttribute(attr) == value) {
                rtv[rtv.length] = this.children.item(i);

            };
            if (this.children.item(i).children.length > 0) {
                rtv[rtv.length] = this.children.item(i).getElementsByAttrValue(attr, value);
            };
        };
        var rtv2 = returnAllInOneArr(rtv);
        return rtv2;
    };
    HTMLElement.prototype.getElementById = function (IdParam) {
        if (typeof IdParam == 'string') {
            return this.getElementsByAttrValue("id", IdParam);
        } else {
            return null;
        };
    };
    HTMLElement.prototype.getEl_Id = function (IdParam) {
        var id = (typeof IdParam == 'string') ? IdParam : false;
        return (id != false) ? this.getElementById(IdParam) : null;
    };
    Document.prototype.getEl_Id = function (IdParam) {
        var id = (typeof IdParam == 'string') ? IdParam : false;
        return (id != false) ? this.getElementById(IdParam) : null;
    };
    HTMLElement.prototype.getEl_Class = function (classNameParam) {
        var className = (typeof classNameParam == 'string') ? classNameParam : false;
        return (className != false) ? this.getElementsByClassName(className) : null;
    };
    Document.prototype.getEl_Class = function (classNameParam) {
        var className = (typeof classNameParam == 'string') ? classNameParam : false;
        return (className != false) ? this.getElementsByClassName(className) : null;
    };
    HTMLElement.prototype.getEl_Class_Arr = function (cname, optionparam) {
        var rtv = [];
        if (checkStringandifItisnotanEmptyStr(cname) && document.getEl_Class(cname) instanceof HTMLElement && document.getEl_Class(cname) != null) {
            var list0 = document.getEl_Class(cname);
            var options = {
                parentElement: document,
                otherClassNames: [],
            }
            if (checkObj(optionparam)) {
                if (checkArr(optionparam.otherClassNames)) {
                    options.otherClassNames = optionparam.otherClassNames;
                }
                if (checkHTMLElement(optionparam.parentElement)) {
                    options.parentElement = optionparam.parentElement;
                    list0 = options.parentElement.getElementsByClassName(cname);
                }
            }
            if (options.otherClassNames.length > 0) {
                for (var i = 0; i < list0.length; i++) {
                    if (checkObjandItsProperty(list0[i], 'classList', function (param2) {
                        return (checkObj(param2));
                    })) {
                        options.otherClassNames.forEach(function (val, idx, arr) {
                            if (list0[i].classList.contains(val)) {
                                rtv[rtv.length] = list0[i];
                            }
                        });
                    }
                }
            } else {
                for (var i = 0; i < list0.length; i++) {
                    if (list0[i].classList.contains(val)) {
                        rtv[rtv.length] = list0[i];
                    }
                }
            }
            return rtv;
        }
    };
    HTMLElement.prototype.getEl_TagName = function (tagNameParam) {
        var tagName = (typeof tagNameParam == 'string') ? tagNameParam : false;
        return (tagName != false) ? this.getElementsByTagName(tagName) : null;
    };
    Document.prototype.getEl_TagName = function (tagNameParam) {
        var tagName = (typeof tagNameParam == 'string') ? tagNameParam : false;
        return (tagName != false) ? this.getElementsByTagName(tagName) : null;
    };
    HTMLElement.prototype.getEl_CSS_Selector = function (selectorParam) {
        var selector = (typeof selectorParam == 'string') ? selectorParam : false;
        return (selector != false) ? this.querySelectorAll(selectorParam) : null;
    };
    Document.prototype.getEl_CSS_Selector = function (selectorParam) {
        var selector = (typeof selectorParam == 'string') ? selectorParam : false;
        return (selector != false) ? this.querySelectorAll(selectorParam) : null;
    };
    HTMLElement.prototype.stylehidden = false;
    HTMLElement.prototype.show_hide = function (displaymodeparam) {
        var displaymode = (checkString(displaymodeparam)) ? displaymodeparam : "";
        if (this.stylehidden) {
            this.style.display = displaymode;
            this.stylehidden = false;
        } else {
            this.style.display = "none";
            this.stylehidden = true;
        };
        return true;
    };
    HTMLButtonElement.prototype.let_anEl_shown_hidden = function (elparam, option) {
        if (checkHTMLElement(elparam)) {
            if (checkObj(option)) {
                if (checkObjandItsProperty(option, 'display', { checkingType: true, dataTypetoMatch: 'string' })) {
                    var rtBool = elparam.show_hide(option.display);
                    return rtBool;
                } else {
                    var rtBool = elparam.show_hide();
                    return rtBool;
                };
            } else {
                var rtBool = elparam.show_hide();
                return rtBool;
            };
        } else {
            return false;
        };
    };
    HTMLElement.prototype.getEl_CSS = function (selectorParam) {
        var newnodelist = (typeof selectorParam == 'string') ? this.getEl_CSS_Selector(selectorParam) : null;
        if (newnodelist != null) {
            var convertedFromNodeListToHTMLCollection = {
                length: newnodelist.length,
                item: function (idx) {
                    if (typeof idx == 'number' && !isNaN(idx)) {
                        return newnodelist.item(idx);
                    } else {
                        return null;
                    };
                },
                namedItem: function (idorname) {
                    for (var i = 0; i < newnodelist.length; i++) {
                        if (newnodelist.item(i).id == idorname) {
                            return newnodelist.item(i);
                        };
                        if (newnodelist.item(i).name == idorname) {
                            return newnodelist.item(i);
                        };
                    };
                    return null;
                },
            };
            return convertedFromNodeListToHTMLCollection;
        } else {
            return null;
        };
    };
    Document.prototype.getEl_CSS = function (selectorParam) {
        var newnodelist = (typeof selectorParam == 'string') ? this.getEl_CSS_Selector(selectorParam) : null;
        if (newnodelist != null) {
            var convertedFromNodeListToHTMLCollection = {
                length: newnodelist.length,
                item: function (idx) {
                    if (typeof idx == 'number' && !isNaN(idx)) {
                        return newnodelist.item(idx);
                    } else {
                        return null;
                    };
                },
                namedItem: function (idorname) {
                    for (var i = 0; i < newnodelist.length; i++) {
                        if (newnodelist.item(i).id == idorname) {
                            return newnodelist.item(i);
                        };
                        if (newnodelist.item(i).name == idorname) {
                            return newnodelist.item(i);
                        };
                    };
                    return null;
                },
                toArray: function () {
                    var rtv = [];
                    for (var i = 0; i < this.length; i++) {
                        rtv[rtv.length] = this.item(i);
                    };
                    return rtv;
                },
            };
            return convertedFromNodeListToHTMLCollection;
        } else {
            return null;
        };
    };
    HTMLButtonElement.prototype.show_hide_onClick = function () {
        var thistargetId = this.getAttribute("target-id");
        var thistargetClass = this.getAttribute("target-class");
        var thisobj = this;
        if (!checkStringandifItisnotanEmptyStr(thistargetId)) {
            thistargetId = '';
        };
        if (!checkStringandifItisnotanEmptyStr(thistargetClass)) {
            thistargetClass = '';
        };
        if (thistargetId != '') {
            this.addEventListener("click", function (ev) {
                thisobj.let_anEl_shown_hidden(document.getElementById(thistargetId), { display: "" });
            });

        } else if (thistargetClass != '') {
            this.addEventListener("click", function (ev) {
                thisobj.parentElement.getElementsByClassName(thistargetClass)[0].show_hide("");
            });

        }
    };
    HTMLElement.prototype.getEl_Attr = function (attrname, attrvalue) {
        return this.getElementsByAttrValue(attrname, attrvalue);
    };

    Document.prototype.getEl_Attr = function (attrname, attrvalue) {
        return this.getElementsByAttrValue(attrname, attrvalue);
    };
    Document.prototype.getCookie = function (cookie_name) {
        var cookie_value = this.cookie.split(';').find(function (row) { return (row.startsWith(cookie_name + '=')) })?.split('=')[1];
        return cookie_value;
    }
    function setCookie(cookieStr, newvals) {
        cookieStr = newvals;
        return cookieStr;
    }
    Document.prototype.setCookie = function (...cookies) {
        for (var i = 0; i < cookies.length; i++) {
            cookies[i] = (checkObjandItsProperty(cookies[i], 'cookie_name', function (checkingstrparam) { return (typeof checkingstrparam === 'string') }) && checkObjandItsProperty(cookies[i], 'cookie_value', function (checkingstrparam) { return (typeof checkingstrparam === 'string') })) ? cookies[i] : null;
        }
        for (var i1 = 0; i1 < cookies.length; i1++) {
            if (cookies[i1] != null) {
                this.cookie = setCookie(this.cookie, cookies[i1].cookie_name + '=' + cookies[i1].cookie_value);
                console.log(setCookie(this.cookie, cookies[i1].cookie_name + '=' + cookies[i1].cookie_value));
            }
        }
    }
    Document.prototype.resetCookie = function (nameofcookiereset) {
        if (!checkString(nameofcookiereset)) {
            return;
        }
        this.cookie = setCookie(this.cookie, nameofcookiereset + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    }
    /*if (!window['glowing']) {
        class glowing extends HTMLElement {
            constructor() {
                super();
            }
            glow(textcolour, { shadowcolour, shadow, shadowblur }) {
                this.style.textShadow = `${shadow}px ${shadow}px ${shadowblur}px ${shadowcolour},-${shadow}px -${shadow}px ${shadowblur}px ${shadowcolour},-${shadow}px ${shadow}px ${shadowblur}px ${shadowcolour},${shadow}px -${shadow}px ${shadowblur}px ${shadowcolour}`;
                this.style.color = textcolour;
            }
        }
        customElements.define('my-glowing', glowing);
    }*/

    function get_data(url, path, { a_endidx, charset }) {
        this.url = checkString(url) ? url : null;
        this.path = checkString(path) ? path : '';
        this.data = [];
        this.options = { a_endidx: 100, charset: 'utf-8' };
        if (checkInteger(a_endidx)) {
            this.options['a_endidx'] = a_endidx;
        }
        if (checkString(charset)) {
            this.options['charset'] = charset;
        }
    }
    get_data.prototype = {
        change_url: function (n_url, cbfunc) {
            var rtbool = true;
            this.url = checkString(n_url) ? n_url : (() => { rtbool = false; return this.url; })();
            (checkFunc(cbfunc)) ? cbfunc(this) : {};
            return this.url || rtbool;
        },
        change_path: function (n_path, cbfunc) {
            var rtbool = true;
            this.path = checkString(n_path) ? n_path : (() => { rtbool = false; return this.path; })();
            (checkFunc(cbfunc)) ? cbfunc(this) : {};
            return this.path || rtbool;
        },
        change_option: function ({ charset, a_endidx }) {
            if (checkInteger(a_endidx)) {
                this.options['a_endidx'] = a_endidx;
            }
            if (checkString(charset)) {
                this.options['charset'] = charset;
            }
        },
        use_data_using_fetch: function (cbfunc) {
            if (!checkString(this.url)) {
                return;
            }
            fetch(this.url + this.path, { headers: { "Content-Type": "text/html;charset=" + this.options.charset, } }).then((data) => data.body,).then((rb) => {
                if (!(rb instanceof ReadableStream)) {
                    return new ReadableStream({
                        start(controller) {
                            // The following function handles each data chunk
                            function push() {
                                // "done" is a Boolean and value a "Uint8Array"
                                new Response("-", { headers: { "Content-Type": "text/html;charset=" + this.options.charset, } }).body.getReader.read().then(({ done, value }) => {
                                    // If there is no more data to read
                                    if (done) {
                                        //console.log("done", done);
                                        controller.close();
                                        return;
                                    }
                                    // Get the data and send it to the browser via the controller
                                    controller.enqueue(value);
                                    // Check chunks by logging to the console
                                    //console.log(done, value);
                                    push();
                                });
                            }

                            push();
                        },
                    });
                }
                var reader = rb.getReader();

                return new ReadableStream({
                    start(controller) {
                        // The following function handles each data chunk
                        function push() {
                            // "done" is a Boolean and value a "Uint8Array"
                            reader.read().then(({ done, value }) => {
                                // If there is no more data to read
                                if (done) {
                                    //console.log("done", done);
                                    controller.close();
                                    return;
                                }
                                // Get the data and send it to the browser via the controller
                                controller.enqueue(value);
                                // Check chunks by logging to the console
                                //console.log(done, value);
                                push();
                            });
                        }

                        push();
                    },
                });
            })
                .then((stream) =>
                    // Respond with our stream
                    new Response(stream, { headers: { "Content-Type": "text/html;charset=" + this.options.charset, } }).arrayBuffer(),
                )
                .then((data0) => {
                    var decoder = new TextDecoder(this.options.charset);
                    return decoder.decode(data0)
                }
                )
                .then((result) => {
                    // Do things with result
                    //console.log(result);
                    if (checkFunc(cbfunc)) {
                        cbfunc(result);
                    }
                });
        },
        get_data_using_fetch: function (n_url, infos, cbfunc) {
            if (checkString(n_url)) {
                this.change_url(n_url);
            }
            this.use_data_using_fetch((res) => {
                if (!checkString(res)) {
                    return;
                }
                var objtobepushed = {};
                if (checkObj(infos)) {
                    Object.keys(infos).forEach((val, idx, arr) => {
                        objtobepushed[val] = infos[val];
                    });
                }
                objtobepushed['data'] = res;
                this.data.push(objtobepushed);
                if (checkFunc(cbfunc)) {
                    cbfunc(objtobepushed);
                }
            });
        },
        get_data_loop: function (n_url, n_path, n_startidx, n_endidx, numbfunc, cbfunc) {
            var url = checkString(n_url) ? n_url : null;
            var path = checkString(n_path) ? n_path : '';
            var startidx = checkInteger(n_startidx) ? n_startidx : 0;
            var endidx = checkInteger(n_endidx) ? n_endidx : this.options.a_endidx;
            for (var i = startidx; i < endidx; i++) {
                if (checkFunc(numbfunc)) {
                    this.path = numbfunc(path, i.toString());
                } else {
                    this.path = path + i.toString();
                }
                this.get_data_using_fetch(url, { idx: i, comment: this.url + path + '에서' + (i + 1).toString() + '번째입니다.(' + this.url + this.path + '에 있습니다)', url: this.url + this.path, }, cbfunc);
            }
        },
        get_data_arr: function () {
            return this.data;
        },
        search: function (n_keyword) {
            if (!checkString(n_keyword)) {
                return false || (() => { console.error('ERROR:the data type of n_keyword parameter is not string'); return 'ERROR:the data type of n_keyword parameter is not string' })();
            }
            var keyword = (n_keyword.match(/\/(.*?)\/(.*)/gmi) != null) ? new RegExp(('_' + n_keyword).replace(/(.*?)\/(.*?)\/(.*)/gmi, `$2`), ('_' + n_keyword).replace(/(.*?)\/(.*?)\/(.*)/gmi, `$3`)) : n_keyword;
            //var mydata = this.get_data_arr();
            var rtarr = [];
            this.data.forEach((val, idx, arr) => {
                if (val.data.match(keyword) != null) {
                    rtarr.push({ obj: val, idx: idx, url: val.url });
                }
            });
            return rtarr;
        },
    }
    return (function () {
        var _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, a, a_0, a_1, a_2, a_3, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
        class ColourgreyShorterJSPR {
            constructor(instantUsing) {
                if (instantUsing) {
                    var newdoc = this.makeAllwithoutCallback();
                    for (var key in newdoc.body) {
                        this[key] = newdoc.body[key];
                    }
                }
            };
            makeAll(cbf) {
                var newdoc = document;
                for (var key in newdoc.body) {
                    this[key] = newdoc.body[key];
                }
                cbf(this);
            };
            makeAllwithoutCallback() {
                var newdoc = document;
                for (var key in newdoc.body) {
                    this[key] = newdoc.body[key];
                }
                return this;
            };
        };
        var cssBasicUnits = ['px', '%', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'ex', 'ch', 'in', 'cm', 'mm', 'pt', 'pc'];
        var ColourgreyShorterJS = {
            ColourgreyShorterCSS: class extends ColourgreyShorterJSPR {
                constructor(instantUsing) {
                    super(instantUsing);
                    if (instantUsing) { this.makeAllwithoutCallback(); }
                    this.tabmenus = [];
                    this.popovers = [];
                    this.btnsdropdowns = [];
                    this.foldable_paragraphs = [];
                    this.foldings = [];
                    this.tables = [];
                    this.cssBasicUnits = cssBasicUnits;
                };
                tab = class {
                    constructor(eltostyle, options) {
                        this.el = (typeof eltostyle == 'string') ? document.getElementById(eltostyle) : (eltostyle instanceof HTMLElement) ? eltostyle : null;
                        this.options = options;
                        this.oneofthemisshownalways = (checkObj(this.options)) ? (typeof this.options.onemustbeshown == 'boolean') ? this.options.mustonebeshown : false : false;
                        if (this.el != null) {
                            var tabs_group = this.el.getEl_Class("tabs_group").toArray()[0];
                            var tab_select_group = this.el.getEl_Class("tab_select").toArray()[0];
                            /*if (typeof this.options == 'object' && 'undefined' != typeof this.options){
                                if (this.options){}
                            }*/
                            var tabs = [];
                            var tabselects = [];
                            var tabs_and_tabselects = [];
                            this.tabs_group = tabs_group;
                            this.tab_select_group = tab_select_group;
                            this.tabs = [];
                            this.tabselects = [];
                            this.tabs_and_tabselects = [];
                            if (this.tabs_group instanceof HTMLElement && this.tab_select_group instanceof HTMLElement) {
                                this.tabs = this.tabs_group.getEl_Class("tab").toArray();
                                this.tabselects = this.tab_select_group.getEl_Class("select").toArray();
                                if (Array.isArray(this.tabs) && Array.isArray(this.tabselects)) {
                                    if (this.tabs.length > 0 && this.tabselects.length > 0) {
                                        var thisobj = this;
                                        var shorterarr = (this.tabs.length > this.tabselects.length) ? this.tabselects : (this.tabs.length < this.tabselects.length) ? this.tabs : this.tabs;
                                        this.shorterarr = shorterarr;
                                        this.shorterarr.forEach(function (val, idx, arr) {
                                            thisobj.tabs_and_tabselects.push({ tab: thisobj.tabs[idx], tabselect: thisobj.tabselects[idx], shown: false });
                                        });
                                        this.tabs_and_tabselects.forEach(function (val, idx, arr) {
                                            val.tabselect.addEventListener("click", function (ev) { var index = (!val.tabselect.getAttribute("data-tabselect-number") || val.tabselect.getAttribute("data-tabselect-number") == '' || val.tab_select_group.getAttribute("data-tabselect-number") == null) ? idx : new String(val.tabselect.getAttribute("data-tabselect-number")); thisobj.showtab(index); });
                                        });
                                    }
                                }
                            }
                        }
                    };
                    pr = {
                        showtab(elp, elpselect, thisobj) {
                            if (elp instanceof HTMLElement && elpselect instanceof HTMLElement) {
                                elp.classList.add("showntab");
                                elpselect.classList.add("showntabselect");

                            }
                        },
                        hidetab(elp, elpselect, thisobj) {
                            if (elp instanceof HTMLElement && elpselect instanceof HTMLElement) {
                                elp.classList.remove("showntab");
                                elpselect.classList.remove("showntabselect");

                            }
                        },
                    };
                    showtab(index) {
                        console.log("show");
                        var thisobj = this;
                        if (this.tabs_and_tabselects) {
                            if (Array.isArray(this.tabs_and_tabselects)) {
                                this.tabs_and_tabselects.forEach(function (val, idx, arr) {
                                    if (checkObj(val)) {

                                        if (val.tab instanceof HTMLElement && val.tabselect instanceof HTMLElement && typeof val.shown == 'boolean') {

                                            console.log(index);
                                            if (checkNumber(index)) {
                                                if (idx == index) {
                                                    if (val.tab.classList.contains("showntab") && val.tabselect.classList.contains("showntabselect")) {
                                                        if (!thisobj.oneofthemisshownalways) {
                                                            thisobj.pr.hidetab(val.tab, val.tabselect, thisobj);
                                                            arr[idx].shown = false;
                                                            val.shown = false;
                                                            thisobj.shorterarr[idx].shown = false;
                                                        }
                                                    } else {
                                                        thisobj.pr.showtab(val.tab, val.tabselect, thisobj);
                                                        arr[idx].shown = true;
                                                        val.shown = true;
                                                        thisobj.shorterarr[idx].shown = true;
                                                    }
                                                } else {
                                                    thisobj.pr.hidetab(val.tab, val.tabselect, thisobj);
                                                    arr[idx].shown = false;
                                                    val.shown = false;
                                                    thisobj.shorterarr[idx].shown = false;
                                                }
                                            } else if (typeof index == 'string') {
                                                if (val.tab.getAttribute("data-tab-number") == index) {
                                                    if (val.tab.classList.contains("showntab") && val.tabselect.classList.contains("showntabselect")) {
                                                        if (!thisobj.oneofthemisshownalways) {
                                                            thisobj.pr.hidetab(val.tab, val.tabselect, thisobj);
                                                            arr[idx].shown = false;
                                                            val.shown = false;
                                                            thisobj.shorterarr[idx].shown = false;
                                                        }
                                                    } else {
                                                        thisobj.pr.showtab(val.tab, val.tabselect, t);
                                                        arr[idx].shown = true;
                                                        val.shown = true;
                                                        thisobj.shorterarr[idx].shown = true;
                                                    }
                                                } else {
                                                    thisobj.pr.hidetab(val.tab, val.tabselect, thisobj);
                                                    arr[idx].shown = false;
                                                    val.shown = false;
                                                    thisobj.shorterarr[idx].shown = false;
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    };
                };
                popover = class {
                    constructor(eltostyle, options) {
                        this.el = (typeof eltostyle == 'string') ? document.getElementById(eltostyle) : (eltostyle instanceof HTMLElement) ? eltostyle : null;
                        this.options = options;
                        this.textpopover = (checkObj(options)) ? (typeof options.textpopover == 'boolean') ? options.textpopover : false : false;
                        this.bodyEl = (checkObj(options)) ? (options.bodyEl instanceof HTMLElement) ? options.bodyEl : (typeof options.bodyEl == 'string') ? document.getElementById(options.bodyEl) : null : null;
                        this.instantUsing = (checkObj(options)) ? (typeof options.instantUsing == 'boolean') ? options.instantUsing : false : false;
                        if (this.bodyEl instanceof HTMLElement) {
                            if (!this.bodyEl.classList.contains('body')) {
                                this.bodyEl.classList.add('body');
                            }
                        } else {
                            if (this.instantUsing) {
                                var new_shadow_body_div_pr = document.createElement('div');
                                var new_shadow_body_div = document.body.appendChild(new_shadow_body_div_pr);
                                this.bodyEl = new_shadow_body_div;
                                this.bodyEl.classList.add('body');
                            }
                        }
                        if (this.el != null) {
                            var thisobj = this;
                            this.targetels = this.el.getEl_Attr("data-cgrshorter-action", "popover");
                            this.newpopovers = [];
                            this.targetels.forEach(function (val, idx, arr) {
                                val.addEventListener("click", function (ev) {
                                    if (val.getEl_Class("popover-box") != null && val.getEl_Class("popover-box").length > 0) {
                                        if (thisobj.newpopovers[idx] != null || document.querySelector('.body').classList.contains("shadowbody")) {
                                            document.querySelector('.body').classList.remove("shadowbody");
                                            thisobj.newpopovers[idx].remove();
                                        }
                                    } else { thisobj.newpopovers[idx] = thisobj.show(val, val.getAttribute("data-popover-text")); };
                                });
                                thisobj.newpopovers[idx] = thisobj.show(val, val.getAttribute("data-popover-text"));
                                thisobj.newpopovers[idx].remove();
                                document.querySelector('.body').classList.remove("shadowbody");
                            });
                        }
                    };
                    show(el, content) {
                        var newc = new String(content);
                        var newc2 = '';
                        var i43 = 0;
                        for (var i = 0; i < newc.length; i++) {
                            if (newc[i] == `|` && newc[i - 1] != `\\`) {
                                if (newc[i - 2] + newc[i - 1] == 'br') {
                                    i43 += 2;
                                }
                                if (i43 % 4 == 0) {
                                    newc2 += `<`;
                                } else if (i43 % 4 == 1) {
                                    newc2 += `>`;
                                } else if (i43 % 4 == 2) {
                                    newc2 += '</';
                                } else if (i43 % 4 == 3) {
                                    newc2 += `>`
                                } else if (i43 % 4 == 4) {
                                    newc2 += '<';
                                }
                                i43++
                            } else {
                                newc2 += newc[i];
                            }
                        }
                        console.log(newc2);
                        newc2 = newc2.replaceAll(`&quot;`, `"`);
                        newc2 = newc2.replaceAll(`&apos;`, `'`);
                        newc2 = newc2.replaceAll(`&lt;`, `<`);
                        newc2 = newc2.replaceAll(`&gt;`, `>`);
                        if (el instanceof HTMLElement) {
                            var newEl = document.createElement("div");
                            newEl.setAttribute("class", "popover-box");
                            newEl.innerHTML = `<p onclick="this.parentElement.remove();document.querySelector('.body').classList.remove('shadowbody')" style="position:absolute;right:0px;width:1.2rem" role="button">&times;</p>` + newc2;
                            if (this.textpopover) {
                                newEl.innerHTML = `<p class="popver-para"><span onclick="this.parentElement.remove();document.querySelector('.body').classList.remove('shadowbody')" style="position:absolute;right:0px;">&times;</span><br><span class="popover-text" role="button">${newc2}</span></p>`;
                            }
                            var newEla = document.body.appendChild(newEl);
                            document.querySelector('.body').classList.add("shadowbody");
                            return newEla;
                        } else {
                            return null;
                        }
                    };
                };
                dropDownList = class {
                    constructor(el, options) {
                        this.el = (typeof el == 'string') ? document.getElementById(el) : (el instanceof HTMLElement) ? el : document.body;
                        this.options = options;
                        if (this.el instanceof HTMLElement) {

                            var dropdown_buttons = this.el.getEl_Class("dropdown_btn").toArray();
                            var dropdown_lists = this.el.getEl_Class("dropdown_list").toArray();
                            this.dropdown_lists = dropdown_lists;
                            this.dropdown_buttons = dropdown_buttons;
                            var shorterarr = (this.dropdown_buttons.length > this.dropdown_lists.length) ? this.dropdown_lists : (this.dropdown_buttons.length < this.dropdown_lists.length) ? this.dropdown_buttons : this.dropdown_buttons;
                            this.shorterarr = shorterarr;
                            this.btn_list = [];
                            var thisobj = this;

                            this.shorterarr.forEach(function (val, idx, arr) {
                                thisobj.btn_list.push({ btn: thisobj.dropdown_buttons[idx], list: thisobj.dropdown_lists[idx] });
                            });

                            this.btn_list.forEach(function (val, idx, arr) {
                                if (checkObj(thisobj.options)) {
                                    if (typeof thisobj.options.animation == 'boolean') {
                                        if (thisobj.options.animation == true) {
                                            val.list.style.transition = `height 0.5s ease-in-out`;
                                        }
                                    }
                                }
                                val.btn.addEventListener("click", function (ev) {
                                    if (!val.list.classList.contains("shown_dropdown")) {
                                        if (checkObj(thisobj.options)) {
                                            if (typeof thisobj.options.animation == 'boolean') {
                                                if (thisobj.options.animation == true) {
                                                    val.list.animate([{ height: '0px', display: 'none', }, { height: 'auto', display: 'block', }]);

                                                } else {
                                                    thisobj.show(val.list);
                                                }
                                            } else { thisobj.show(val.list); }
                                        } else { thisobj.show(val.list); }
                                    } else {
                                        thisobj.hide(val.list);
                                    }
                                });
                            });
                        }
                    };
                    show(el) { if (el instanceof HTMLElement) { el.classList.add("shown_dropdown"); } };
                    hide(el) { if (el instanceof HTMLElement) { el.classList.remove("shown_dropdown"); } };
                };
                folding_paragraph = class {
                    constructor(elarg, options) {
                        this.el = (typeof elarg == 'string') ? document.getElementById(elarg) : (elarg instanceof HTMLElement) ? elarg : document.getElementById(elarg);
                        this.options = (checkObj(options) && !Array.isArray(options)) ? options : {};
                        var thisobj = this;
                        if (this.el != null) {

                            var paragraphspr = this.el.querySelectorAll('div.para');
                            this.paragraphspr = paragraphspr;
                            var paragraphs = [];
                            paragraphspr.forEach(function (val, idx, arr) {
                                if (val.querySelector('div.paracontent') != null && val.querySelector('h1 .parafolder,h2 .parafolder,h3 .parafolder,h4 .parafolder,h5 .parafolder,h6 .parafolder') != null) {
                                    var folded = val.getAttribute("data-folded");
                                    var folded2 = (typeof folded == 'string') ? (folded == 'true') ? true : false : false;
                                    if (thisobj.options.folded == true) {
                                        folded2 = true;
                                    }
                                    var id0 = val.id;
                                    var id = (typeof id0 == 'string') ? (id0 != '') ? id0 : idx : idx;
                                    paragraphs.push({ contentel: val.querySelector('div.paracontent'), folderel: val.querySelector('h1 .parafolder,h2 .parafolder,h3 .parafolder,h4 .parafolder,h5 .parafolder,h6 .parafolder'), paragraph: val, folded: folded2, id: id });
                                }
                            });
                            this.paragraphs = paragraphs;
                            thisobj = this;
                            this.paragraphs.forEach(function (val, idx, arr) {
                                val.folderel.addEventListener("click", function (ev) {
                                    var id = (typeof val.paragraph.id == 'string') ? (val.paragraph.id != '') ? val.paragraph.id : idx : idx;
                                    thisobj.showandhide(id);
                                });
                            });
                        }
                    };
                    showandhide(id) {
                        var element;
                        var thisobj = this;
                        if (typeof id == 'string') {
                            this.paragraphs.forEach(function (val, idx, arr) {
                                if (val.id == id) {
                                    element = val;
                                    return;
                                }
                            });
                            if (!checkObj(element)) {
                                return false;
                            }
                        } else if (checkNumber(id)) {
                            element = this.paragraphs[id];
                        } else {
                            return false;
                        }
                        if (element.folded == true) {
                            element.contentel.classList.remove("hiddenparacontent");
                            element.folderel.innerHTML = `&#65088;`;
                            this.paragraphs.forEach(function (val, idx, arr) {
                                if (val.id == id) {
                                    val.folded = false;
                                    arr[idx].folded = false;
                                    thisobj.paragraphs[idx].folded = false;
                                    return;
                                }
                            });
                            return 0;
                        } else {
                            element.contentel.classList.add("hiddenparacontent");
                            element.folderel.innerHTML = `&gt;`;
                            this.paragraphs.forEach(function (val, idx, arr) {
                                if (val.id == id) {
                                    val.folded = true;
                                    arr[idx].folded = true;
                                    thisobj.paragraphs[idx].folded = true;
                                    return;
                                }
                            });
                            return 1;
                        }
                    }
                };
                folding_content = class {
                    constructor(elarg, options) {
                        this.el = (typeof elarg == 'string') ? document.getElementById(elarg) : (elarg instanceof HTMLElement) ? elarg : document.getElementById(elarg);
                        this.options = (checkObj(options)) ? options : { folded: true };
                        if (typeof this.options['folded'] != 'boolean') {
                            this.options.folded = true;
                        }

                        this.foldingEls = [];
                        var thisobj = this;
                        if (this.el != null && this.el != undefined && this.el instanceof HTMLElement) {
                            var foldingElsinfoldersWrap = this.el.querySelectorAll(`.wiki.folding`);
                            if (foldingElsinfoldersWrap != null) {
                                if (foldingElsinfoldersWrap.length > 0) {
                                    foldingElsinfoldersWrap.forEach(function (el, key, par) {
                                        var alreadyfolded = thisobj.options.folded;
                                        if (el.hasAttribute("not-folded")) {
                                            alreadyfolded = false;
                                            if (el.getAttribute("not-folded") == 'false' || el.getAttribute("not-folded") == '0' || el.getAttribute("not-folded") == 'no') {
                                                alreadyfolded = true;
                                            } else {
                                                el.classList.add("shown_folder_content");
                                            }
                                        }
                                        var foldercontrol = el.querySelector(`.folding_control`);
                                        var foldercontent = el.querySelector(`.folding_content`);
                                        if ((foldercontrol != null && foldercontrol != undefined && foldercontrol instanceof HTMLElement) && (foldercontent != null && foldercontent != undefined && foldercontent instanceof HTMLElement)) {
                                            thisobj.foldingEls.push({ control: foldercontrol, content: foldercontent, folded: alreadyfolded });
                                        }
                                    });
                                }
                            }
                        }
                        this.foldingEls.forEach(function (val, idx, arr) {
                            val.control.addEventListener("click", function (ev) {
                                thisobj.show_hide(idx);
                            });
                        });
                    };
                    show_hide(folderidx) {
                        if (typeof folderidx === 'number' && parseInt(folderidx) == folderidx && checkObj(this.foldingEls[folderidx])) {
                            if (this.foldingEls[folderidx].control instanceof HTMLElement && this.foldingEls[folderidx].content instanceof HTMLElement && typeof this.foldingEls[folderidx].folded === 'boolean') {
                                if (this.foldingEls[folderidx].folded == true) {
                                    this.foldingEls[folderidx].content.classList.add("shown_folder_content");
                                    this.foldingEls[folderidx].folded = false;
                                    return true;
                                } else {
                                    this.foldingEls[folderidx].content.classList.remove("shown_folder_content");
                                    this.foldingEls[folderidx].folded = true;
                                    return true;
                                }
                            }
                            return false;
                        }
                        return false;
                    };
                };
                styleAll() {
                    var elthatwrapstab = document.querySelectorAll(`.tabs_wrapper`);
                    var thisobj = this;
                    elthatwrapstab.forEach(function (val, idx, arr) {
                        thisobj.tabmenus.push(new thisobj.tab(val, { mustonebeshown: true }));
                    });
                    var elthatisparentofpopovertexts = document.querySelectorAll(`.enablepopover`);
                    elthatisparentofpopovertexts.forEach(function (val, idx, arr) {
                        thisobj.popovers.push(new thisobj.popover(val, { textpopover: false }));
                    });
                    var elthatwrapsbtns = document.querySelectorAll(`.btn-group-nobs`);
                    elthatwrapsbtns.forEach(function (val, idx, arr) {
                        thisobj.btnsdropdowns.push(new thisobj.dropDownList(val, { animation: true, }));
                    });
                    var elthatwrapsparagraphs = document.getEl_Attr("data-paraparent", "true");
                    elthatwrapsparagraphs.forEach(function (val, idx, arr) {
                        thisobj.foldable_paragraphs.push(new thisobj.folding_paragraph(val, { folded: false }));
                    });
                    var elthatwrapsfoldingels = document.querySelectorAll(`.foldings_wrapper`);
                    elthatwrapsfoldingels.forEach(function (val, idx, arr) {
                        thisobj.foldings.push(new thisobj.folding_content(val, { folded: true }));
                    });
                    window.addEventListener("load", function (ev) {
                        var parsedhashtext = new URL(decodeURI(window.location.href)).hash.replace('#', '');
                        if (parsedhashtext != undefined && parsedhashtext != null && parsedhashtext != "") {
                            thisobj.tabmenus.forEach(function (val, idx, arr) {
                                val.tabs_and_tabselects.forEach(function (val1, idx1, arr1) {
                                    if (parsedhashtext == val1.tab.id) {
                                        val.showtab(idx1);
                                    }
                                });
                            });
                        }
                    });
                };
            },
            ColourgreyShorterJS: class extends ColourgreyShorterJSPR {
                constructor(instantUsing) {
                    super(instantUsing);
                    this.makeAll();
                    this.arr = Arry;
                    this.str = String;
                    this.doc = Document;
                }
            },
            checkArr: checkArr,
            checkBool: checkBool,
            checkFunc: checkFunc,
            checkHTMLElement: checkHTMLElement,
            checkInteger: checkInteger,
            checkNull: checkNull,
            checkNumber: checkNumber,
            checkObj: checkObj,
            checkObjNotArr: checkObjNotArr,
            checkObjandItsProperty: checkObjandItsProperty,
            checkObjnotaNullandObjtobeNull: checkObjnotaNullandObjtobeNull,
            checkString: checkString,
            checkStringandifItisnotanEmptyStr: checkStringandifItisnotanEmptyStr,
            checkUndefined: checkUndefined,
            checkNumberNotNaNandNaN: checkNumberNotNaNandNaN,
            setCookie: setCookie,
            checkObjandItsProperties: checkObjandItsProperties,
            get_data: get_data,
        };
        return ColourgreyShorterJS;
    })();
});