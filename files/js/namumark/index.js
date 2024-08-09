function definefunc(a, [...b], c) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = c(b) : "function" == typeof define && define.amd ? define(c) : (gTh = "undefined" != typeof globalThis ? globalThis : gTh || self)[a] = c(b)
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
definefunc("rules", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lists = exports.videos = exports.textRules = void 0;
    var rules = [
        "##",
        "'''", "''", "__", "~~", "--", "^^", ",,", "{{{#!folding", "{{{#!html", "{{{#!syntax ", "}}}",
        "[[", "[[파일:", "[[분류:", "|", "=", "&", "]]",
        "[youtube(", "[kakaotv(", "[nicovideo(", "[vimeo(", "[navertv(", "[include(", "[age(", "[dday(", "[pagecount(", "[ruby(", "[math(", ",", ")]",
        "[date]", "[datetime]", "[목차]", "[tableofcontents]", "[각주]", "[footnote]",
        "[br]", "[clearfix]", "[pagecount]",
        "[*", "[^", " ", "]", ">",
        "<math>", "</math>",
        "||", '<-', '<:>', '<width=', '<height=', '<|', '<(>', '<)>', '<^|', '<v|', '<nopad>',
        '<tablewidth=', '<table width=', '<bgcolor=', '<colbgcolor=', '<rowbgcolor=', '<tablebgcolor=', '<table bgcolor=',
        '<color=', '<color', '<colcolor=', '<rowcolor=', '<tablecolor=', '<table color=', '<tablebordercolor=', '<table bordercolor=',
        '<tablealign=left>', '<table align=left>', '<tablealign=center>', '<table align=center>', '<tablealign=right>', '<table align=right>',
        "*", "1.", "a.", "A.", "i.", 'I.', '#',
        '@'
    ];
    rules.sort(function (a, b) { return b.length - a.length; });
    exports.textRules = { "'''": 'Bold', "''": 'Italic', "__": 'Underscore', "~~": 'Strikethrough', "--": 'Strikethrough', "^^": 'SuperScript', ",,": 'SubScript' };
    exports.videos = ["[youtube(", "[kakaotv(", "[nicovideo(", "[vimeo(", "[navertv("];
    exports.lists = ["*", "1.", "a.", "A.", "i.", 'I.'];
    exports.default = rules;
});
definefunc("tokenizer", ["require", "exports", "rules"], function (require, exports, rules_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tokenizer = exports.Token = void 0;
    rules_1 = __importDefault(rules_1);
    var Token = /** @class */ (function () {
        function Token(value, type, _a) {
            var heading = _a.heading, style = _a.style, size = _a.size, color = _a.color;
            var _this = this;
            this.heading = null;
            this.style = null;
            this.size = null;
            this.color = null;
            this.value = value;
            this.type = type;
            this.toString = function () { return _this.value; };
            if (heading) {
                this.heading = heading;
            }
            else if (style) {
                this.style = style;
            }
            else if (size) {
                this.size = size;
            }
            else if (color) {
                this.color = color;
            }
        }
        return Token;
    }());
    exports.Token = Token;
    var Tokenizer = /** @class */ (function () {
        function Tokenizer() {
            this.cursor = 0;
            this.token = '';
            this.tokens = [];
            this.newLine = true;
            this.heading = null;
        }
        Tokenizer.prototype.previousTokenPush = function () {
            if (this.token !== '') {
                this.tokens.push(new Token(this.token, 'string', {}));
                this.token = '';
            }
        };
        Tokenizer.prototype.isHeadingStart = function (str) {
            var start = str.startsWith('======# ') ? { depth: 6, folding: true } :
                str.startsWith('====== ') ? { depth: 6, folding: false } :
                    str.startsWith('=====# ') ? { depth: 5, folding: true } :
                        str.startsWith('===== ') ? { depth: 5, folding: false } :
                            str.startsWith('====# ') ? { depth: 4, folding: true } :
                                str.startsWith('==== ') ? { depth: 4, folding: false } :
                                    str.startsWith('===# ') ? { depth: 3, folding: true } :
                                        str.startsWith('=== ') ? { depth: 3, folding: false } :
                                            str.startsWith('==# ') ? { depth: 2, folding: true } :
                                                str.startsWith('== ') ? { depth: 2, folding: false } :
                                                    str.startsWith('=# ') ? { depth: 1, folding: true } :
                                                        str.startsWith('= ') ? { depth: 1, folding: false } :
                                                            null;
            return start;
        };
        Tokenizer.prototype.isHeadingEnd = function (str) {
            var end = str === ' #======' ? { depth: 6, folding: true } :
                str === ' ======' ? { depth: 6, folding: false } :
                    str === ' #=====' ? { depth: 5, folding: true } :
                        str === ' =====' ? { depth: 5, folding: false } :
                            str === ' #====' ? { depth: 4, folding: true } :
                                str === ' ====' ? { depth: 4, folding: false } :
                                    str === ' #===' ? { depth: 3, folding: true } :
                                        str === ' ===' ? { depth: 3, folding: false } :
                                            str === ' #==' ? { depth: 2, folding: true } :
                                                str === ' ==' ? { depth: 2, folding: false } :
                                                    str === ' #=' ? { depth: 1, folding: true } :
                                                        str === ' =' ? { depth: 1, folding: false } :
                                                            null;
            return end;
        };
        Tokenizer.prototype.isHorizontalLine = function (str) {
            var match = str.match(/^-{4,9}$/);
            return match ? match[0].length : null;
        };
        Tokenizer.prototype.run = function (input) {
            this.cursor = 0;
            this.token = '';
            this.tokens = [];
            this.newLine = true;
            this.heading = null;
            root: for (; input.length > this.cursor; this.cursor++) {
                if (input[this.cursor] === '\n') {
                    while (input[this.cursor] === '\n') {
                        this.previousTokenPush();
                        this.tokens.push(new Token('\n', 'rule', {}));
                        this.newLine = true;
                        this.cursor++;
                    }
                }
                else if (this.cursor > 0)
                    this.newLine = false;
                if (input.length <= this.cursor)
                    break;
                var char = input[this.cursor];
                if (char === '\\') {
                    this.token += input[this.cursor];
                    continue;
                }
                var heading = void 0;
                var horizontalLine = void 0;
                var str = void 0;
                var line = input.slice(this.cursor).split('\n')[0];
                if (this.newLine && (heading = this.isHeadingStart(line))) {
                    var len = heading.depth + (heading.folding ? 2 : 1);
                    this.cursor += len - 1;
                    this.heading = heading;
                    this.previousTokenPush();
                    this.tokens.push(new Token(line.slice(0, len), 'rule', { heading: heading }));
                    continue;
                }
                else if (this.newLine && (horizontalLine = this.isHorizontalLine(line))) {
                    this.cursor += horizontalLine - 1;
                    this.previousTokenPush();
                    this.tokens.push(new Token('-'.repeat(horizontalLine), 'rule', {}));
                    continue;
                }
                if (this.heading && (heading = this.isHeadingEnd(line)) && heading.depth === this.heading.depth && heading.folding === this.heading.folding) {
                    this.cursor += line.length - 1;
                    this.heading = null;
                    this.previousTokenPush();
                    this.tokens.push(new Token(line, 'rule', { heading: heading }));
                    continue;
                }
                for (var _i = 0, rules_2 = rules_1.default; _i < rules_2.length; _i++) {
                    var rule = rules_2[_i];
                    if (rule.length > 0 && input.slice(this.cursor, this.cursor + rule.length) === rule) {
                        this.previousTokenPush();
                        this.tokens.push(new Token(rule, 'rule', {}));
                        this.cursor += rule.length - 1;
                        continue root;
                    }
                }
                if (line.startsWith('{{{#!wiki')) {
                    var style = "";
                    if (line.startsWith('{{{#!wiki style="')) {
                        style = line.slice(17).split('"')[0];
                        str = line.slice(0, 17 + style.length);
                        this.cursor += 17 + style.length;
                    }
                    else {
                        this.cursor += 9;
                        str = '{{{#!wiki';
                    }
                    this.previousTokenPush();
                    this.tokens.push(new Token(str, 'rule', { style: style }));
                    continue;
                }
                var size = void 0;
                var plus = void 0;
                if (((plus = (str = input.slice(this.cursor, this.cursor + 6)).startsWith('{{{+')) || str.startsWith('{{{-')) && str.endsWith(' ') && !isNaN(+(size = str.slice(4, 5)))) {
                    this.previousTokenPush();
                    this.tokens.push(new Token(str + ' ', 'rule', { size: parseInt((!plus ? '-' : '+') + size, 10) }));
                    this.cursor += 5;
                    continue;
                }
                var color = void 0;
                if ((str = input.slice(this.cursor, this.cursor + 21).split(' ')[0]).startsWith('{{{#') && (color = str.slice(4))) {
                    this.previousTokenPush();
                    this.tokens.push(new Token(str + ' ', 'rule', { color: (color.match(/^(?:[0-9a-f]{3}){1,2}$/i) ? '#' + color : color) }));
                    this.cursor += str.length;
                    continue;
                }
                if (input.slice(this.cursor, this.cursor + 3) === '{{{') {
                    this.previousTokenPush();
                    this.tokens.push(new Token('{{{', 'rule', {}));
                    this.cursor += 2;
                    continue;
                }
                this.token += char;
            }
            this.previousTokenPush();
            return this.tokens;
        };
        return Tokenizer;
    }());
    exports.Tokenizer = Tokenizer;
});
definefunc("parser", ["require", "exports", "rules"], function (require, exports, rules_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = exports.Node = void 0;
    var Node = /** @class */ (function () {
        function Node(type, _a) {
            var items = _a.items, value = _a.value, depth = _a.depth, folding = _a.folding, style = _a.style, color = _a.color, size = _a.size, link = _a.link, param = _a.param, name = _a.name, names = _a.names, code = _a.code, date = _a.date;
            this.items = [];
            this.type = 'Node';
            this.value = '';
            this.depth = 0;
            this.style = '';
            this.color = '';
            this.size = 0;
            this.folding = false;
            this.link = '';
            this.param = {};
            this.name = '';
            this.names = [];
            this.code = '';
            this.date = '';
            this.type = type;
            if (items)
                this.items = items;
            if (value)
                this.value = value;
            if (depth)
                this.depth = depth;
            if (folding)
                this.folding = folding;
            if (style)
                this.color = style;
            if (color)
                this.color = color;
            if (size)
                this.size = size;
            if (link)
                this.link = link;
            if (param)
                this.param = param;
            if (name)
                this.name = name;
            if (names)
                this.names = names;
            if (code)
                this.code = code;
            if (date)
                this.date = date;
        }
        return Node;
    }());
    exports.Node = Node;
    var Parser = /** @class */ (function () {
        function Parser() {
            this.tokens = [];
            this.cursor = 0;
        }
        Parser.prototype.getParam = function (separator, end) {
            var _a, _b;
            var param = {};
            while (this.tokens[this.cursor]) {
                var key = '';
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === '=' || this.tokens[this.cursor].value === separator || this.tokens[this.cursor].value === end))) {
                    key += this.tokens[this.cursor].value;
                    this.cursor++;
                }
                key = key.trim();
                this.cursor++;
                param[key] = '';
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === separator || this.tokens[this.cursor].value === end))) {
                    param[key] += this.tokens[this.cursor].value;
                    this.cursor++;
                }
                if (((_a = this.tokens[this.cursor]) === null || _a === void 0 ? void 0 : _a.type) === 'rule' && this.tokens[this.cursor].value === separator)
                    this.cursor++;
                if (((_b = this.tokens[this.cursor]) === null || _b === void 0 ? void 0 : _b.type) === 'rule' && this.tokens[this.cursor].value === end)
                    break;
            }
            return param;
        };
        Parser.prototype.tableParam = function () {
            var param = '';
            this.cursor++;
            while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '>')) {
                param += this.tokens[this.cursor];
                this.cursor++;
            }
            this.cursor++;
            return param;
        };
        Parser.prototype.table = function () {
            var _a, _b;
            var node = new Node('Table', { items: [], param: {}, names: [] });
            var currentRow = new Node('TableRow', { items: [], param: {} });
            while (this.tokens[this.cursor]) {
                var currentCell = new Node('TableCell', { items: [], param: {} });
                param: while (this.tokens[this.cursor] && this.tokens[this.cursor].type === "rule") {
                    switch (this.tokens[this.cursor].value) {
                        case '<-':
                            currentCell.param['colspan'] = this.tableParam();
                            break;
                        case '<^|':
                        case '<|':
                        case '<v|':
                            currentCell.param['vertical-align'] = this.tokens[this.cursor].value === '<^|' ? 'top' :
                                this.tokens[this.cursor].value === '<|' ? 'middle' :
                                    'bottom';
                            currentCell.param['rowspan'] = this.tableParam();
                            break;
                        case '<width=':
                            currentCell.param['width'] = this.tableParam();
                            break;
                        case '<height=':
                            currentCell.param['height'] = this.tableParam();
                            break;
                        case '<(>':
                        case '<:>':
                        case '<)>':
                            this.cursor++;
                            currentCell.param['align'] = this.tokens[this.cursor].value === '<(>' ? 'left' :
                                this.tokens[this.cursor].value === '<|>' ? 'center' :
                                    'right';
                            break;
                        case '<nopad>':
                            this.cursor++;
                            currentCell.param['nopad'] = 'true';
                            break;
                        case '<tablewidth=':
                        case '<table width=':
                            node.param['width'] = this.tableParam();
                            break;
                        case '<bgcolor=':
                            currentCell.param['bgcolor'] = this.tableParam();
                            break;
                        case '<colbgcolor=':
                            currentCell.param['colbgcolor'] = this.tableParam();
                            break;
                        case '<rowbgcolor=':
                            currentRow.param['bgcolor'] = this.tableParam();
                            break;
                        case '<tablebgcolor=':
                        case '<table bgcolor=':
                            node.param['bgcolor'] = this.tableParam();
                            break;
                        case '<color=':
                        case '<color':
                            currentCell.param['color'] = this.tableParam();
                            break;
                        case '<colcolor=':
                            currentCell.param['colcolor'] = this.tableParam();
                            break;
                        case '<rowcolor=':
                            currentRow.param['color'] = this.tableParam();
                            break;
                        case '<tablecolor=':
                        case '<table color=':
                            node.param['color'] = this.tableParam();
                            break;
                        case '<tablebordercolor=':
                        case '<table bordercolor=':
                            node.param['bordercolor'] = this.tableParam();
                            break;
                        case '<tablealign=left>':
                        case '<table align=left>':
                        case '<tablealign=center>':
                        case '<table align=center>':
                        case '<tablealign=right>':
                        case '<table align=right>':
                            this.cursor++;
                            node.param['align'] = this.tokens[this.cursor].value.endsWith('left>') ? 'left' :
                                this.tokens[this.cursor].value.endsWith('center>') ? 'center' :
                                    'right';
                            break;
                        default:
                            break param;
                    }
                }
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '||')) {
                    currentCell.items.push(this.walk());
                }
                this.cursor++;
                currentRow.items.push(currentCell);
                if (((_a = this.tokens[this.cursor]) === null || _a === void 0 ? void 0 : _a.value) === '\n') {
                    node.items.push(currentRow);
                    currentRow = new Node('TableRow', { items: [] });
                    this.cursor++;
                    if (((_b = this.tokens[this.cursor]) === null || _b === void 0 ? void 0 : _b.value) !== '||')
                        break;
                    this.cursor++;
                }
            }
            return node;
        };
        Parser.prototype.walk = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            var token = this.tokens[this.cursor];
            if (token.type === 'rule') {
                if (token.heading) {
                    var node = new Node('Heading', { items: [], depth: token.heading.depth, folding: token.heading.folding });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !this.tokens[this.cursor].heading) {
                        node.items.push(this.walk());
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value.startsWith('{{{#!wiki')) {
                    var node = new Node('Block', { style: token.style || '', items: [] });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                        node.items.push(this.walk());
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '{{{#!html') {
                    var node = new Node('Html', { value: '' });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                        node.value += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '{{{#!folding') {
                    var node = new Node('Folding', { names: [], items: [] });
                    this.cursor++;
                    while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== '\n') {
                        node.names.push(this.walk());
                    }
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                        node.items.push(this.walk());
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === "{{{#!syntax ") {
                    var node = new Node('Syntax', { value: '', name: '' });
                    this.cursor++;
                    while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== '\n') {
                        node.name += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                        node.value += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.color) {
                    var node = new Node('Color', { color: token.color });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                        node.items.push(this.walk());
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.size) {
                    var node = new Node('Size', { size: token.size });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                        node.items.push(this.walk());
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value.match(/^-{4,9}$/)) {
                    var node = new Node('HorizontalLine', {});
                    this.cursor++;
                    return node;
                }
                else if (token.value === '{{{') {
                    var node = new Node('Literal', { value: '' });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                        node.value += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[[') {
                    var node = new Node('HyperLink', { link: '', items: [] });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === '|' || this.tokens[this.cursor].value === ']]'))) {
                        node.link += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    if (node.link.startsWith(':파일') || node.link.startsWith(':분류'))
                        node.link = node.link.slice(1);
                    if (this.tokens[this.cursor].value === '|') {
                        this.cursor++;
                        while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ']]')) {
                            node.items.push(this.walk());
                        }
                    }
                    else
                        node.items.push(new Node('Literal', { value: node.link }));
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[[분류:') {
                    var node = new Node('Category', { link: '' });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ']]')) {
                        node.link += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[[파일:') {
                    var node = new Node('Image', { link: '', param: {} });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === '|' || this.tokens[this.cursor].value === ']]'))) {
                        node.link += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    if (this.tokens[this.cursor].value === '|') {
                        this.cursor++;
                        node.param = this.getParam('&', ']]');
                    }
                    this.cursor++;
                    return node;
                }
                else if (rules_3.textRules[token.value]) {
                    var node = new Node(rules_3.textRules[token.value], { items: [] });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === token.value)) {
                        node.items.push(this.walk());
                    }
                    this.cursor++;
                    if (node.items.length < 1)
                        return new Node('Literal', { value: token.value.repeat(2) });
                    return node;
                }
                else if (rules_3.videos.includes(token.value)) {
                    var node = new Node("Video", { name: token.value.slice(1, token.value.length - 1), code: "", param: {} });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === ',' || this.tokens[this.cursor].value === ')]'))) {
                        node.code += this.tokens[this.cursor].value;
                        this.cursor++;
                    }
                    if (this.tokens[this.cursor].value === ',') {
                        this.cursor++;
                        node.param = this.getParam(',', ')]');
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === "[*" || token.value === "[^") {
                    var node = new Node("FootNote", { name: "", items: [] });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === ' ' || this.tokens[this.cursor].value === ']'))) {
                        node.name += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ']')) {
                        node.items.push(this.walk());
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '>') {
                    var node = new Node('BlockQuote', { depth: 0, items: [] });
                    var quotes = [{ node: node, depth: 0 }];
                    var currentNode = node;
                    var currentDepth = 1;
                    // 인용문-리스트
                    var inList = false;
                    var listNode = void 0;
                    var list = [];
                    var currentListNode = node;
                    var currentListDepth = 1;
                    var _loop_1 = function () {
                        if (this_1.tokens[this_1.cursor].type === 'rule' && this_1.tokens[this_1.cursor].value === '>') {
                            this_1.cursor++;
                            var depth_1 = 1;
                            while (((_a = this_1.tokens[this_1.cursor]) === null || _a === void 0 ? void 0 : _a.type) === 'rule' && ((_b = this_1.tokens[this_1.cursor]) === null || _b === void 0 ? void 0 : _b.value) === '>')
                                depth_1++, this_1.cursor++;
                            if (currentDepth < depth_1) {
                                if (inList)
                                    inList = false;
                                for (var i = 0; i < depth_1 - currentDepth; i++) {
                                    var Quote = new Node('BlockQuote', { items: [], depth: currentDepth + i });
                                    currentNode.items.push(Quote);
                                    currentDepth = depth_1;
                                    currentNode = Quote;
                                    quotes.push({
                                        node: currentNode,
                                        depth: depth_1
                                    });
                                }
                            }
                            else if (currentDepth > depth_1) {
                                if (inList)
                                    inList = false;
                                var findNode = quotes.filter(function (item) { return item.depth === (depth_1 - 1); }).pop();
                                if (findNode)
                                    currentNode = findNode.node, currentDepth = depth_1;
                            }
                            if (this_1.tokens[this_1.cursor].value === '\n') {
                                currentNode.items.push(new Node('Literal', { value: '\n' }));
                            }
                            else {
                                if ((inList && this_1.tokens[this_1.cursor].value === ' ') || (this_1.tokens[this_1.cursor].value === ' ' && ((_c = this_1.tokens[this_1.cursor + 1]) === null || _c === void 0 ? void 0 : _c.type) === 'rule' && rules_3.lists.includes((_d = this_1.tokens[this_1.cursor + 1]) === null || _d === void 0 ? void 0 : _d.value))) {
                                    if (!inList) {
                                        inList = true;
                                        listNode = new Node('List', { depth: 0, items: [], param: {} });
                                        list = [{ node: node, depth: 0 }];
                                        currentListNode = listNode;
                                        currentListDepth = 1;
                                        currentNode.items.push(listNode);
                                    }
                                    this_1.cursor++;
                                    var depth_2 = 1;
                                    while (((_e = this_1.tokens[this_1.cursor]) === null || _e === void 0 ? void 0 : _e.value) === ' ')
                                        depth_2++, this_1.cursor++;
                                    var identifier = (_f = this_1.tokens[this_1.cursor]) === null || _f === void 0 ? void 0 : _f.value;
                                    if (!rules_3.lists.includes(identifier)) {
                                        var currentItem_1 = currentListNode.items[currentListNode.items.length - 1];
                                        currentItem_1.items.push(new Node('Literal', { value: '\n' }));
                                        while (this_1.tokens[this_1.cursor] && this_1.tokens[this_1.cursor].value !== '\n') {
                                            currentItem_1.items.push(this_1.walk());
                                        }
                                        return "continue";
                                    }
                                    this_1.cursor++;
                                    if (currentListDepth < depth_2) {
                                        for (var i = 0; i < depth_2 - currentListDepth; i++) {
                                            var item = new Node('List', { items: [], depth: currentListDepth + i, param: {} });
                                            currentListNode.items.push(item);
                                            currentListDepth = depth_2;
                                            currentListNode = item;
                                            list.push({
                                                node: currentListNode,
                                                depth: depth_2
                                            });
                                        }
                                    }
                                    else if (currentListDepth > depth_2) {
                                        var findNode = list.filter(function (item) { return item.depth === (depth_2 - 1); }).pop();
                                        if (findNode)
                                            currentListNode = findNode.node, currentListDepth = depth_2;
                                    }
                                    if (this_1.tokens[this_1.cursor].type === 'rule' && this_1.tokens[this_1.cursor].value === '#') {
                                        this_1.cursor++;
                                        currentListNode.param['start'] = '';
                                        while (this_1.tokens[this_1.cursor] && this_1.tokens[this_1.cursor].value !== ' ') {
                                            currentListNode.param['start'] += this_1.tokens[this_1.cursor].value;
                                            this_1.cursor++;
                                        }
                                        this_1.cursor++;
                                    }
                                    var currentItem = new Node('ListItem', { items: [], name: identifier });
                                    if (this_1.tokens[this_1.cursor].value === '\n') {
                                        currentItem.items.push(new Node('Literal', { value: '\n' }));
                                    }
                                    else {
                                        while (this_1.tokens[this_1.cursor] && this_1.tokens[this_1.cursor].value !== '\n') {
                                            currentItem.items.push(this_1.walk());
                                        }
                                    }
                                    currentListNode.items.push(currentItem);
                                }
                                else {
                                    if (inList)
                                        inList = false;
                                    while (this_1.tokens[this_1.cursor] && this_1.tokens[this_1.cursor].value !== '\n') {
                                        currentNode.items.push(this_1.walk());
                                    }
                                }
                            }
                            this_1.cursor++;
                        }
                        else
                            return "break";
                    };
                    var this_1 = this;
                    while (this.tokens[this.cursor]) {
                        var state_1 = _loop_1();
                        if (state_1 === "break")
                            break;
                    }
                    return node;
                }
                else if (token.value === ' ' && this.tokens[this.cursor + 1].type === 'rule' && rules_3.lists.includes((_g = this.tokens[this.cursor + 1]) === null || _g === void 0 ? void 0 : _g.value)) {
                    var node = new Node('List', { depth: 0, items: [], param: {} });
                    var list = [{ node: node, depth: 0 }];
                    var currentNode = node;
                    var currentDepth = 1;
                    var _loop_2 = function () {
                        if (this_2.tokens[this_2.cursor].value === ' ') {
                            this_2.cursor++;
                            var depth_3 = 1;
                            while (((_h = this_2.tokens[this_2.cursor]) === null || _h === void 0 ? void 0 : _h.value) === ' ')
                                depth_3++, this_2.cursor++;
                            var identifier = (_j = this_2.tokens[this_2.cursor]) === null || _j === void 0 ? void 0 : _j.value;
                            if (!rules_3.lists.includes(identifier)) {
                                var currentItem_2 = currentNode.items[currentNode.items.length - 1];
                                currentItem_2.items.push(new Node('Literal', { value: '\n' }));
                                while (this_2.tokens[this_2.cursor] && this_2.tokens[this_2.cursor].value !== '\n') {
                                    currentItem_2.items.push(this_2.walk());
                                }
                                return "continue";
                            }
                            this_2.cursor++;
                            if (currentDepth < depth_3) {
                                for (var i = 0; i < depth_3 - currentDepth; i++) {
                                    var item = new Node('List', { items: [], depth: currentDepth + i, param: {} });
                                    currentNode.items.push(item);
                                    currentDepth = depth_3;
                                    currentNode = item;
                                    list.push({
                                        node: currentNode,
                                        depth: depth_3
                                    });
                                }
                            }
                            else if (currentDepth > depth_3) {
                                var findNode = list.filter(function (item) { return item.depth === (depth_3 - 1); }).pop();
                                if (findNode)
                                    currentNode = findNode.node, currentDepth = depth_3;
                            }
                            if (this_2.tokens[this_2.cursor].type === 'rule' && this_2.tokens[this_2.cursor].value === '#') {
                                this_2.cursor++;
                                currentNode.param['start'] = '';
                                while (this_2.tokens[this_2.cursor] && this_2.tokens[this_2.cursor].value !== ' ') {
                                    currentNode.param['start'] += this_2.tokens[this_2.cursor].value;
                                    this_2.cursor++;
                                }
                                this_2.cursor++;
                            }
                            var currentItem = new Node('ListItem', { items: [], name: identifier });
                            if (this_2.tokens[this_2.cursor].value === '\n') {
                                currentItem.items.push(new Node('Literal', { value: '\n' }));
                            }
                            else {
                                while (this_2.tokens[this_2.cursor] && this_2.tokens[this_2.cursor].value !== '\n') {
                                    currentItem.items.push(this_2.walk());
                                }
                            }
                            currentNode.items.push(currentItem);
                            this_2.cursor++;
                        }
                        else
                            return "break";
                    };
                    var this_2 = this;
                    while (this.tokens[this.cursor]) {
                        var state_2 = _loop_2();
                        if (state_2 === "break")
                            break;
                    }
                    return node;
                }
                else if (token.value === '\n' && ((_k = this.tokens[this.cursor + 1]) === null || _k === void 0 ? void 0 : _k.value) === ' ' && !rules_3.lists.includes((_l = this.tokens[this.cursor + 2]) === null || _l === void 0 ? void 0 : _l.value)) {
                    var node = new Node('Indent', { depth: 0, items: [] });
                    var indents = [{ node: node, depth: 0 }];
                    var currentNode = node;
                    var currentDepth = 1;
                    this.cursor++;
                    var _loop_3 = function () {
                        if (this_3.tokens[this_3.cursor].type === 'rule' && this_3.tokens[this_3.cursor].value === ' ') {
                            this_3.cursor++;
                            var depth_4 = 1;
                            while (((_m = this_3.tokens[this_3.cursor]) === null || _m === void 0 ? void 0 : _m.type) === 'rule' && ((_o = this_3.tokens[this_3.cursor]) === null || _o === void 0 ? void 0 : _o.value) === ' ')
                                depth_4++, this_3.cursor++;
                            if (currentDepth < depth_4) {
                                for (var i = 0; i < depth_4 - currentDepth; i++) {
                                    var indent = new Node('Indent', { items: [], depth: currentDepth + i });
                                    currentNode.items.push(indent);
                                    currentDepth = depth_4;
                                    currentNode = indent;
                                    indents.push({
                                        node: currentNode,
                                        depth: depth_4
                                    });
                                }
                            }
                            else if (currentDepth > depth_4) {
                                var findNode = indents.filter(function (item) { return item.depth === (depth_4 - 1); }).pop();
                                if (findNode)
                                    currentNode = findNode.node, currentDepth = depth_4;
                            }
                            if (this_3.tokens[this_3.cursor].value === '\n') {
                                currentNode.items.push(new Node('Literal', { value: '\n' }));
                            }
                            else {
                                while (this_3.tokens[this_3.cursor] && this_3.tokens[this_3.cursor].value !== '\n') {
                                    currentNode.items.push(this_3.walk());
                                }
                            }
                            this_3.cursor++;
                        }
                        else
                            return "break";
                    };
                    var this_3 = this;
                    while (this.tokens[this.cursor]) {
                        var state_3 = _loop_3();
                        if (state_3 === "break")
                            break;
                    }
                    return node;
                }
                else if (token.value === '[include(') {
                    var node = new Node('Include', { name: '', param: {} });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === ',' || this.tokens[this.cursor].value === ')]'))) {
                        node.name += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    if (this.tokens[this.cursor].value === ',') {
                        this.cursor++;
                        node.param = this.getParam(',', ')]');
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '@') {
                    var node = new Node('Param', { name: '', items: [] });
                    var _cursor = ++this.cursor;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === '=' || this.tokens[this.cursor].value === '@')) && this.tokens[this.cursor].value !== '\n') {
                        node.name += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    if (!(((_p = this.tokens[this.cursor]) === null || _p === void 0 ? void 0 : _p.type) === 'rule' && (this.tokens[this.cursor].value === '=' || this.tokens[this.cursor].value === '@'))) {
                        this.cursor = _cursor;
                        return new Node('Literal', { value: '@' });
                    }
                    if (this.tokens[this.cursor].value === '=') {
                        this.cursor++;
                        while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '@') && this.tokens[this.cursor].value !== '\n') {
                            node.items.push(this.walk());
                        }
                        if (!(((_q = this.tokens[this.cursor]) === null || _q === void 0 ? void 0 : _q.type) === 'rule' && this.tokens[this.cursor].value === '@')) {
                            this.cursor = _cursor;
                            return new Node('Literal', { value: '@' });
                        }
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[age(') {
                    var node = new Node('Age', { date: '' });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ')]')) {
                        node.date += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[dday(') {
                    var node = new Node('Dday', { date: '' });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ')]')) {
                        node.date += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[pagecount(') {
                    var node = new Node('PageCount', { name: '' });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ')]')) {
                        node.name += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[ruby(') {
                    var node = new Node('Ruby', { names: [], param: {} });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === ',' || this.tokens[this.cursor].value === ')]'))) {
                        node.names.push(this.walk());
                    }
                    if (this.tokens[this.cursor].value === ',') {
                        this.cursor++;
                        node.param = this.getParam(',', ')]');
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[math(') {
                    var node = new Node('Math', { value: '' });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ')]')) {
                        node.value += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '<math>') {
                    var node = new Node('Math', { value: '' });
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '</math>')) {
                        node.value += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[date]' || token.value === '[datetime]') {
                    var node = new Node('DateTime', {});
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[목차]' || token.value === '[tableofcontents]') {
                    var node = new Node('TableOfContents', {});
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[각주]' || token.value === '[footnote]') {
                    var node = new Node('TableOfFootnotes', {});
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[br]') {
                    var node = new Node('Literal', { value: '\n' });
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[clearfix]') {
                    var node = new Node('ClearFix', {});
                    this.cursor++;
                    return node;
                }
                else if (token.value === '[pagecount]') {
                    var node = new Node('PageCount', {});
                    this.cursor++;
                    return node;
                }
                else if (token.value === '||') {
                    this.cursor++;
                    return this.table();
                }
                else if (token.value === '|') {
                    this.cursor++;
                    var caption = [];
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '|')) {
                        caption.push(this.walk());
                    }
                    this.cursor++;
                    var table = this.table();
                    table.names = caption;
                    return table;
                }
                else if (token.value === '\n' && ((_r = this.tokens[this.cursor + 1]) === null || _r === void 0 ? void 0 : _r.value) === '##') {
                    var node = new Node('Comment', { value: '' });
                    this.cursor++;
                    this.cursor++;
                    while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== '\n') {
                        node.value += this.tokens[this.cursor];
                        this.cursor++;
                    }
                    return node;
                }
            }
            this.cursor++;
            return new Node('Literal', { value: token.toString() });
        };
        Parser.prototype.run = function (tokens) {
            this.tokens = tokens;
            this.cursor = 0;
            var nodes = [];
            while (this.tokens[this.cursor])
                nodes.push(this.walk());
            return nodes;
        };
        return Parser;
    }());
    exports.Parser = Parser;
});
definefunc("renderer", ["require", "exports", "parser", "index", "highlight.js"], function (require, exports, parser_1, index_1, highlight_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Renderer = void 0;
    index_1 = __importDefault(index_1);
    highlight_js_1 = __importDefault(highlight_js_1);
    var Renderer = /** @class */ (function () {
        function Renderer(findPage, findImage, getURL, pageCount) {
            var _this = this;
            this.findPage = function () { return null; };
            this.findImage = function () { return null; };
            this.getURL = function (type, name) { return (type === 'link' ? '/wiki/' : '/files/') + name; };
            this.pageCount = function () {
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 0];
                    });
                });
            };
            this.categories = [];
            this.backlinks = [];
            this.footnoteIds = [];
            this.footnotes = [];
            this.headers = [];
            this.headerCounters = [0, 0, 0, 0, 0, 0];
            this.param = null;
            if (findPage)
                this.findPage = findPage;
            if (findImage)
                this.findImage = findImage;
            if (getURL)
                this.getURL = getURL;
            if (pageCount)
                this.pageCount = pageCount;
        }
        Renderer.prototype.error = function (error) {
            return "<span class=\"wiki-error\">".concat(error, "</span>");
        };
        Renderer.prototype.removeHTML = function (str) {
            return str.replace(/(<([^>]+)>)/gi, '');
        };
        Renderer.prototype.disableQuot = function (str) {
            return str.replace(/"/, '&quot;');
        };
        Renderer.prototype.disableTag = function (str) {
            return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };
        Renderer.prototype.getHTML = function (nodes) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(nodes.map(function (node) { return _this.walk(node); }))];
                        case 1: return [2 /*return*/, (_a.sent()).join('')];
                    }
                });
            });
        };
        Renderer.prototype.walk = function (node) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, name_1, i, counts, i, id, _b, _c, _d, _e, _f, hignlightd, _g, _h, _j, _k, externalLink, notExist, _l, _m, _o, image, _p, _q, _r, _s, _t, _u, name_2, id, i, _v, _w, _x, _y, page, renderer, _z, _0, _1, _2, _3, _4, _5, _6;
                var _7;
                var _this = this;
                return __generator(this, function (_8) {
                    switch (_8.label) {
                        case 0:
                            _a = node.type;
                            switch (_a) {
                                case 'Literal': return [3 /*break*/, 1];
                                case 'Heading': return [3 /*break*/, 2];
                                case 'Block': return [3 /*break*/, 4];
                                case 'Html': return [3 /*break*/, 6];
                                case 'Folding': return [3 /*break*/, 7];
                                case 'Syntax': return [3 /*break*/, 10];
                                case 'Color': return [3 /*break*/, 11];
                                case 'Size': return [3 /*break*/, 13];
                                case 'HorizontalLine': return [3 /*break*/, 15];
                                case 'HyperLink': return [3 /*break*/, 16];
                                case 'Category': return [3 /*break*/, 21];
                                case 'Image': return [3 /*break*/, 22];
                                case 'Bold': return [3 /*break*/, 24];
                                case 'Italic': return [3 /*break*/, 26];
                                case 'Underscore': return [3 /*break*/, 28];
                                case 'Strikethrough': return [3 /*break*/, 30];
                                case 'SuperScript': return [3 /*break*/, 32];
                                case 'SubScript': return [3 /*break*/, 34];
                                case 'Video': return [3 /*break*/, 36];
                                case 'FootNote': return [3 /*break*/, 37];
                                case 'BlockQuote': return [3 /*break*/, 39];
                                case 'Indent': return [3 /*break*/, 41];
                                case 'Include': return [3 /*break*/, 43];
                                case 'Param': return [3 /*break*/, 46];
                                case 'Age': return [3 /*break*/, 51];
                                case 'Dday': return [3 /*break*/, 52];
                                case 'PageCount': return [3 /*break*/, 53];
                                case 'Ruby': return [3 /*break*/, 55];
                                case 'Math': return [3 /*break*/, 57];
                                case 'DateTime': return [3 /*break*/, 58];
                                case 'TableOfContents': return [3 /*break*/, 59];
                                case 'TableOfFootnotes': return [3 /*break*/, 60];
                                case 'ClearFix': return [3 /*break*/, 61];
                                case 'Table': return [3 /*break*/, 62];
                                case 'List': return [3 /*break*/, 67];
                            }
                            return [3 /*break*/, 69];
                        case 1:
                            {
                                if (node.value === '\n')
                                    return [2 /*return*/, '<br />'];
                                return [2 /*return*/, this.disableTag(node.value)];
                            }
                            _8.label = 2;
                        case 2: return [4 /*yield*/, this.getHTML(node.items)];
                        case 3:
                            name_1 = _8.sent();
                            this.headerCounters[node.depth - 1]++;
                            for (i = node.depth; i < 6; i++)
                                this.headerCounters[i] = 0;
                            counts = [];
                            for (i = 0; i < node.depth; i++)
                                counts.push(this.headerCounters[i]);
                            id = counts.join('.');
                            this.headers.push({
                                name: this.removeHTML(name_1),
                                closed: !node.folding,
                                id: id,
                                size: node.depth,
                                count: id + '.'
                            });
                            return [2 /*return*/, "<h".concat(node.depth, " id=\"s-").concat(id, "\" class=\"wiki-heading").concat(node.folding ? ' wiki-close-heading' : '', "\"><a href=\"#toc\">").concat(id, ".</a> ").concat(name_1, "</h").concat(node.depth, ">")];
                        case 4:
                            _c = (_b = "<div style=\"".concat(this.disableQuot(node.style), "\">")).concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 5: return [2 /*return*/, _c.apply(_b, [_8.sent(), "</div>"])];
                        case 6:
                            {
                                return [2 /*return*/, node.value];
                            }
                            _8.label = 7;
                        case 7:
                            _e = "<details class=\"wiki-folding\"><summary>".concat;
                            return [4 /*yield*/, this.getHTML(node.names)];
                        case 8:
                            _f = (_d = _e.apply("<details class=\"wiki-folding\"><summary>", [_8.sent(), "</summary>"])).concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 9: return [2 /*return*/, _f.apply(_d, [_8.sent(), "</details>"])];
                        case 10:
                            {
                                hignlightd = void 0;
                                try {
                                    hignlightd = highlight_js_1.default.highlight(node.value, { language: node.name.trim() }).value;
                                }
                                catch (err) {
                                    hignlightd = highlight_js_1.default.highlightAuto(node.value).value;
                                }
                                return [2 /*return*/, "<pre class=\"wiki-code\">".concat(hignlightd, "</pre>")];
                            }
                            _8.label = 11;
                        case 11:
                            _h = (_g = "<span style=\"color: ".concat(this.disableQuot(node.color.split(',')[0]), "\">")).concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 12: return [2 /*return*/, _h.apply(_g, [_8.sent(), "</span>"])];
                        case 13:
                            _k = (_j = "<span class=\"wiki-size ".concat(node.size > 0 ? 'size-up-' + node.size : 'size-down-' + Math.abs(node.size), "\">")).concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 14: return [2 /*return*/, _k.apply(_j, [_8.sent(), "</span>"])];
                        case 15:
                            {
                                return [2 /*return*/, '<hr />'];
                            }
                            _8.label = 16;
                        case 16:
                            externalLink = node.link.startsWith('https://') || node.link.startsWith('http://');
                            if (!externalLink)
                                this.backlinks.push({ type: 'link', name: node.link });
                            if (!externalLink) return [3 /*break*/, 17];
                            _l = null;
                            return [3 /*break*/, 19];
                        case 17: return [4 /*yield*/, this.findPage(node.link)];
                        case 18:
                            _l = _8.sent();
                            _8.label = 19;
                        case 19:
                            notExist = !(_l);
                            _o = (_m = "<a href=\"".concat(this.disableQuot(externalLink ? node.link : this.getURL('link', node.link)), "\" class=\"wiki-link").concat(externalLink ? ' external-link' : (notExist ? ' not-exist' : ''), "\">")).concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 20: return [2 /*return*/, _o.apply(_m, [_8.sent(), "</a>"])];
                        case 21:
                            {
                                this.backlinks.push({ type: 'category', name: node.link });
                                this.categories.push(node.link);
                                return [2 /*return*/, ''];
                            }
                            _8.label = 22;
                        case 22:
                            this.backlinks.push({ type: 'image', name: node.link });
                            return [4 /*yield*/, this.findImage(node.link)];
                        case 23:
                            image = _8.sent();
                            if (!image) {
                                return [2 /*return*/, "<a href=\"".concat(this.disableQuot(this.getURL('link', node.link)), "\" class=\"wiki-link not-exist\">").concat(node.link, "</a>")];
                            }
                            return [2 /*return*/, "<img src=\"".concat(this.getURL('image', image.url), "\" style=\"").concat(this.disableQuot((node.param['align'] ? 'text-align: ' + node.param['align'] : '') + ';' +
                                (node.param['bgcolor'] ? 'background-color: ' + node.param['bgcolor'] : '') + ';' +
                                (node.param['border-radius'] ? 'border-radius: ' + node.param['bgcolor'] : '') + ';' +
                                (node.param['rendering'] ? 'image-rendering: ' + node.param['bgcolor'] : '') + ';'), "\" width=\"").concat(node.param['width'] ? this.disableQuot(node.param['width']) : image.width, "\" height=\"").concat(node.param['height'] ? this.disableQuot(node.param['height']) : image.height, "\" />")];
                        case 24:
                            _p = "<b>".concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 25: return [2 /*return*/, _p.apply("<b>", [_8.sent(), "</b>"])];
                        case 26:
                            _q = "<i>".concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 27: return [2 /*return*/, _q.apply("<i>", [_8.sent(), "</i>"])];
                        case 28:
                            _r = "<u>".concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 29: return [2 /*return*/, _r.apply("<u>", [_8.sent(), "</u>"])];
                        case 30:
                            _s = "<del>".concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 31: return [2 /*return*/, _s.apply("<del>", [_8.sent(), "</del>"])];
                        case 32:
                            _t = "<sup>".concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 33: return [2 /*return*/, _t.apply("<sup>", [_8.sent(), "</sup>"])];
                        case 34:
                            _u = "<sub>".concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 35: return [2 /*return*/, _u.apply("<sub>", [_8.sent(), "</sub>"])];
                        case 36:
                            {
                                switch (node.name) {
                                    case 'youtube':
                                        return [2 /*return*/, "<iframe src=\"https://www.youtube.com/embed/".concat(encodeURIComponent(node.code)).concat(node.param['start'] ? '?start=' + encodeURIComponent(node.param['start']) : '').concat(node.param['end'] ? ((node.param['start'] ? '&' : '?') + 'end=' + encodeURIComponent(node.param['end'])) : '', "\"").concat((node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')).concat((node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : ''), " frameborder=\"0\" allowfullscreen loading=\"lazy\"></iframe>")];
                                    case 'kakaotv':
                                        return [2 /*return*/, "<iframe src=\"https//tv.kakao.com/embed/player/cliplink/".concat(encodeURIComponent(node.code), "\"").concat((node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')).concat((node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : ''), " frameborder=\"0\" allowfullscreen loading=\"lazy\"></iframe>")];
                                    case 'nicovideo':
                                        return [2 /*return*/, "<iframe src=\"https//embed.nicovideo.jp/watch/sm".concat(encodeURIComponent(node.code), "\"").concat((node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')).concat((node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : ''), " frameborder=\"0\" allowfullscreen loading=\"lazy\"></iframe>")];
                                    case 'vimeo':
                                        return [2 /*return*/, "<iframe src=\"https//player.vimeo.com/video/".concat(encodeURIComponent(node.code), "\"").concat((node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')).concat((node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : ''), " frameborder=\"0\" allowfullscreen loading=\"lazy\"></iframe>")];
                                    case 'navertv':
                                        return [2 /*return*/, "<iframe src=\"https//tv.naver.com/embed/".concat(encodeURIComponent(node.code), "\"").concat((node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')).concat((node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : ''), " frameborder=\"0\" allowfullscreen loading=\"lazy\"></iframe>")];
                                    default:
                                        return [2 /*return*/, ''];
                                }
                            }
                            _8.label = 37;
                        case 37:
                            name_2 = node.name;
                            id = node.name;
                            if (!name_2) {
                                for (name_2 = '1'; this.footnoteIds.includes(name_2); name_2 = String(+name_2 + 1))
                                    ;
                                id = name_2;
                            }
                            else {
                                i = void 0;
                                for (i = 0; this.footnoteIds.includes(node.name + (i === 0 ? '' : '_' + i)); i++)
                                    ;
                                id = node.name + (i === 0 ? '' : '_' + i);
                            }
                            this.footnoteIds.push(name_2);
                            _w = (_v = this.footnotes).push;
                            _7 = {
                                id: id,
                                name: name_2
                            };
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 38:
                            _w.apply(_v, [(_7.content = _8.sent(),
                                _7)]);
                            return [2 /*return*/, "<sup id=\"fn-".concat(encodeURIComponent(id), "\"><a href=\"#rfn-").concat(encodeURIComponent(id), "\">[").concat(name_2, "]</a></sup>")];
                        case 39:
                            _x = "<blockquote class=\"wiki-quote\">".concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 40: return [2 /*return*/, _x.apply("<blockquote class=\"wiki-quote\">", [_8.sent(), "</blockquote>"])];
                        case 41:
                            _y = "<div class=\"wiki-indent\">".concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 42: return [2 /*return*/, _y.apply("<div class=\"wiki-indent\">", [_8.sent(), "</div>"])];
                        case 43:
                            if (this.param)
                                return [2 /*return*/, ''];
                            return [4 /*yield*/, this.findPage(node.name)];
                        case 44:
                            page = _8.sent();
                            if (!page)
                                return [2 /*return*/, this.error("'".concat(node.name, "' \uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."))];
                            renderer = new Renderer(this.findPage, this.findImage, this.getURL);
                            return [4 /*yield*/, renderer.run((0, index_1.default)(page.content), node.param)];
                        case 45: return [2 /*return*/, _8.sent()];
                        case 46:
                            if (!!this.param) return [3 /*break*/, 48];
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 47: return [2 /*return*/, _8.sent()];
                        case 48:
                            _z = this.param[node.name];
                            if (_z) return [3 /*break*/, 50];
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 49:
                            _z = (_8.sent());
                            _8.label = 50;
                        case 50: return [2 /*return*/, _z];
                        case 51:
                            {
                                return [2 /*return*/, "Age: <time datetime=\"".concat(this.disableQuot(node.date), "\" />(birthday)")];
                            }
                            _8.label = 52;
                        case 52:
                            {
                                return [2 /*return*/, "Dday: <time datetime=\"".concat(this.disableQuot(node.date), "\" />(start time)")];
                            }
                            _8.label = 53;
                        case 53:
                            _0 = String;
                            return [4 /*yield*/, this.pageCount(node.name)];
                        case 54: return [2 /*return*/, _0.apply(void 0, [_8.sent()])];
                        case 55:
                            _1 = "<ruby>".concat;
                            return [4 /*yield*/, this.getHTML(node.items)];
                        case 56: return [2 /*return*/, _1.apply("<ruby>", [_8.sent(), "<rp>(</rp><rt>"]).concat(node.param['color'] ? '<span style="color: ' + this.disableQuot(node.param['color']) + '">' + (node.param['ruby'] || '') + '</span>'
                            : node.param['ruby'] || '', "</rt><rp>)</rp></ruby>")];
                        case 57:
                            {
                                return [2 /*return*/, "<katex data-latex=\"".concat(this.disableQuot(node.value), "\">").concat(this.disableTag(node.value), "</katex>")];
                            }
                            _8.label = 58;
                        case 58:
                            {
                                return [2 /*return*/, "<time datetime=\"".concat(new Date().getTime(), "\" />")];
                            }
                            _8.label = 59;
                        case 59:
                            {
                                return [2 /*return*/, '<section class="wiki-toc" id="toc"><h2>목차</h2>' + this.headers.map(function (header) {
                                    return "<div class=\"wiki-toc-item wiki-toc-indent-".concat(header.size, "\"><a href=\"#s-").concat(header.id, "\">").concat(header.count, ".</a> ").concat(header.name, "</div>");
                                }).join('') + '</section>'];
                            }
                            _8.label = 60;
                        case 60:
                            {
                                return [2 /*return*/, '<section class="wiki-footnotes"><ol>' + this.footnotes.map(function (footnote) {
                                    return "<li id=\"rfn-".concat(encodeURIComponent(footnote.id), "\"><a href=\"#fn-").concat(encodeURIComponent(footnote.id), "\">[").concat(footnote.name, "]</a> <span>").concat(footnote.content, "</span></li>");
                                }).join('') + '</ol></section>'];
                            }
                            _8.label = 61;
                        case 61:
                            {
                                return [2 /*return*/, '<div style="clear: both" />'];
                            }
                            _8.label = 62;
                        case 62:
                            _2 = "<table class=\"wiki-table\" style=\"".concat(this.disableQuot((node.param['width'] ? 'width: ' + node.param['width'] + ';' : '') +
                                (node.param['bgcolor'] ? 'background-color: ' + node.param['bgcolor'] + ';' : '') +
                                (node.param['color'] ? 'color: ' + node.param['color'] + ';' : '') +
                                (node.param['bordercolor'] ? 'border-color: ' + node.param['bordercolor'] + ';' : '') +
                                (node.param['align'] ? 'text-align: ' + node.param['align'] + ';' : '')), "\">");
                            if (!(node.names.length > 0)) return [3 /*break*/, 64];
                            _4 = "<caption>".concat;
                            return [4 /*yield*/, this.getHTML(node.names)];
                        case 63:
                            _3 = _4.apply("<caption>", [_8.sent(), "</caption>"]);
                            return [3 /*break*/, 65];
                        case 64:
                            _3 = '';
                            _8.label = 65;
                        case 65:
                            _5 = _2 + (_3) + '<tbody>';
                            return [4 /*yield*/, Promise.all(node.items.map(function (row) {
                                return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    var _this = this;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = "<tr style=\"".concat(this.disableQuot((row.param['bgcolor'] ? 'background-color: ' + row.param['bgcolor'] + ';' : '') +
                                                    (row.param['color'] ? 'color: ' + row.param['color'] + ';' : '')), "\">");
                                                return [4 /*yield*/, Promise.all(row.items.map(function (cell) {
                                                    return __awaiter(_this, void 0, void 0, function () {
                                                        var _a;
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    _a = "<td ".concat(cell.param['colspan'] ? 'colspan="' + this.disableQuot(cell.param['colspan']) + '" ' : '').concat(cell.param['rowspan'] ? 'rowspan="' + this.disableQuot(cell.param['rowspan']) + '" ' : '').concat(cell.param['colbgcolor'] ? 'data-colbgcolor="' + this.disableQuot(cell.param['colbgcolor']) + '" ' : '').concat(cell.param['colcolor'] ? 'data-colcolor="' + this.disableQuot(cell.param['colcolor']) + '" ' : '', "style=\"").concat(this.disableQuot((cell.param['vertical-align'] ? 'vertical-align: ' + cell.param['vertical-align'] + ';' : '') +
                                                                        (cell.param['width'] ? 'width: ' + cell.param['width'] + ';' : '') +
                                                                        (cell.param['height'] ? 'height: ' + cell.param['height'] + ';' : '') +
                                                                        (cell.param['align'] ? 'text-align: ' + cell.param['align'] + ';' : 'text-align: center;') +
                                                                        (cell.param['nopad'] ? 'padding: 0;' : '') +
                                                                        (cell.param['bgcolor'] ? 'background-color: ' + cell.param['width'] + ';' : '') +
                                                                        (cell.param['color'] ? 'color: ' + cell.param['color'] + ';' : '')), "\">");
                                                                    return [4 /*yield*/, this.getHTML(cell.items)];
                                                                case 1: return [2 /*return*/, _a + (_b.sent()) + '</td>'];
                                                            }
                                                        });
                                                    });
                                                }))];
                                            case 1: return [2 /*return*/, _a + (_b.sent()).join('') + '</tr>'];
                                        }
                                    });
                                });
                            }))];
                        case 66: return [2 /*return*/, _5 + (_8.sent()).join('') + '</tbody></table>'];
                        case 67:
                            _6 = '<ul class="wiki-list">';
                            return [4 /*yield*/, Promise.all(node.items.map(function (item) {
                                return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                if (!(item.type === 'ListItem')) return [3 /*break*/, 2];
                                                _b = (_a = "<li class=\"".concat(item.name === '1.' ? 'wiki-list-decimal' :
                                                    item.name === 'a.' ? 'wiki-list-alpha' :
                                                        item.name === 'A.' ? 'wiki-list-upper-alpha' :
                                                            item.name === 'i.' ? 'wiki-list-roman' :
                                                                item.name === 'I.' ? 'wiki-list-upper-roman' :
                                                                    '', "\">")).concat;
                                                return [4 /*yield*/, this.getHTML(item.items)];
                                            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent(), "</li>"])];
                                            case 2: return [4 /*yield*/, this.walk.bind(this)(item)];
                                            case 3: return [2 /*return*/, _c.sent()];
                                        }
                                    });
                                });
                            }))];
                        case 68: return [2 /*return*/, _6 + (_8.sent()).join('') + '</ul>'];
                        case 69:
                            {
                                return [2 /*return*/, ''];
                            }
                            _8.label = 70;
                        case 70: return [2 /*return*/];
                    }
                });
            });
        };
        Renderer.prototype.run = function (nodes_1) {
            return __awaiter(this, arguments, void 0, function (nodes, param) {
                var html, _a;
                if (param === void 0) { param = null; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.categories = [];
                            this.backlinks = [];
                            this.param = param;
                            this.footnoteIds = [];
                            this.footnotes = [];
                            this.headers = [];
                            this.headerCounters = [0, 0, 0, 0, 0, 0];
                            return [4 /*yield*/, this.getHTML(nodes)];
                        case 1:
                            html = _b.sent();
                            if (!(this.footnotes.length > 0)) return [3 /*break*/, 3];
                            _a = html;
                            return [4 /*yield*/, this.walk(new parser_1.Node('TableOfFootnotes', {}))];
                        case 2:
                            html = _a + _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/, html];
                    }
                });
            });
        };
        return Renderer;
    }());
    exports.Renderer = Renderer;
});
definefunc("index", ["require", "exports", "tokenizer", "parser", "renderer"], function (require, exports, tokenizer_1, parser_2, renderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parser = exports.tokenizer = exports.Node = exports.Token = exports.Renderer = exports.Parser = exports.Tokenizer = void 0;
    exports.default = parse;
    Object.defineProperty(exports, "Tokenizer", { enumerable: true, get: function () { return tokenizer_1.Tokenizer; } });
    Object.defineProperty(exports, "Token", { enumerable: true, get: function () { return tokenizer_1.Token; } });
    Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return parser_2.Parser; } });
    Object.defineProperty(exports, "Node", { enumerable: true, get: function () { return parser_2.Node; } });
    Object.defineProperty(exports, "Renderer", { enumerable: true, get: function () { return renderer_1.Renderer; } });
    exports.tokenizer = new tokenizer_1.Tokenizer();
    exports.parser = new parser_2.Parser();
    function parse(str) {
        return exports.parser.run(exports.tokenizer.run(str));
    }
});
