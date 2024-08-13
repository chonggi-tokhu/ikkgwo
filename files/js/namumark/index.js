
class Node {
    items = [];
    type = 'Node';
    value = '';
    depth = 0;
    style = '';
    color = '';
    size = 0;
    folding = false;
    link = '';
    param = {};
    name = '';
    names = [];
    code = '';
    date = '';
    constructor(type, { items, value, depth, folding, style, color, size, link, param, name, names, code, date }) {
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
}
class Parser {
    tokens = [];
    cursor = 0;
    constructor() { }
    getParam(separator, end) {
        const param = {};
        while (this.tokens[this.cursor]) {
            let key = '';
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
            if (this.tokens[this.cursor]?.type === 'rule' && this.tokens[this.cursor].value === separator)
                this.cursor++;
            if (this.tokens[this.cursor]?.type === 'rule' && this.tokens[this.cursor].value === end)
                break;
        }
        return param;
    }
    tableParam() {
        let param = '';
        this.cursor++;
        while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '>')) {
            param += this.tokens[this.cursor];
            this.cursor++;
        }
        this.cursor++;
        return param;
    }
    table() {
        const node = new Node('Table', { items: [], param: {}, names: [] });
        let currentRow = new Node('TableRow', { items: [], param: {} });
        while (this.tokens[this.cursor]) {
            const currentCell = new Node('TableCell', { items: [], param: {} });
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
            if (this.tokens[this.cursor]?.value === '\n') {
                node.items.push(currentRow);
                currentRow = new Node('TableRow', { items: [] });
                this.cursor++;
                if (this.tokens[this.cursor]?.value !== '||')
                    break;
                this.cursor++;
            }
        }
        return node;
    }
    walk() {
        const token = this.tokens[this.cursor];
        if (token.type === 'rule') {
            if (token.heading) {
                const node = new Node('Heading', { items: [], depth: token.heading.depth, folding: token.heading.folding });
                this.cursor++;
                while (this.tokens[this.cursor] && !this.tokens[this.cursor].heading) {
                    node.items.push(this.walk());
                }
                this.cursor++;
                return node;
            }
            else if (token.value.startsWith('{{{#!wiki')) {
                const node = new Node('Block', { style: token.style || '', items: [] });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                    node.items.push(this.walk());
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '{{{#!html') {
                const node = new Node('Html', { value: '' });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                    node.value += this.tokens[this.cursor];
                    this.cursor++;
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '{{{#!folding') {
                const node = new Node('Folding', { names: [], items: [] });
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
                const node = new Node('Syntax', { value: '', name: '' });
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
                const node = new Node('Color', { color: token.color });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                    node.items.push(this.walk());
                }
                this.cursor++;
                return node;
            }
            else if (token.size) {
                const node = new Node('Size', { size: token.size });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                    node.items.push(this.walk());
                }
                this.cursor++;
                return node;
            }
            else if (token.value.match(/^-{4,9}$/)) {
                const node = new Node('HorizontalLine', {});
                this.cursor++;
                return node;
            }
            else if (token.value === '{{{') {
                const node = new Node('Literal', { value: '' });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '}}}')) {
                    node.value += this.tokens[this.cursor];
                    this.cursor++;
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '[[') {
                const node = new Node('HyperLink', { link: '', items: [] });
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
                const node = new Node('Category', { link: '' });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ']]')) {
                    node.link += this.tokens[this.cursor];
                    this.cursor++;
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '[[파일:') {
                const node = new Node('Image', { link: '', param: {} });
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
            else if (textRules[token.value]) {
                const node = new Node(textRules[token.value], { items: [] });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === token.value)) {
                    node.items.push(this.walk());
                }
                this.cursor++;
                if (node.items.length < 1)
                    return new Node('Literal', { value: token.value.repeat(2) });
                return node;
            }
            else if (videos.includes(token.value)) {
                const node = new Node("Video", { name: token.value.slice(1, token.value.length - 1), code: "", param: {} });
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
                const node = new Node("FootNote", { name: "", items: [] });
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
                const node = new Node('BlockQuote', { depth: 0, items: [] });
                const quotes = [{ node, depth: 0 }];
                let currentNode = node;
                let currentDepth = 1;
                // 인용문-리스트
                let inList = false;
                let listNode;
                let list = [];
                let currentListNode = node;
                let currentListDepth = 1;
                while (this.tokens[this.cursor]) {
                    if (this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '>') {
                        this.cursor++;
                        let depth = 1;
                        while (this.tokens[this.cursor]?.type === 'rule' && this.tokens[this.cursor]?.value === '>')
                            depth++, this.cursor++;
                        if (currentDepth < depth) {
                            if (inList)
                                inList = false;
                            for (let i = 0; i < depth - currentDepth; i++) {
                                const Quote = new Node('BlockQuote', { items: [], depth: currentDepth + i });
                                currentNode.items.push(Quote);
                                currentDepth = depth;
                                currentNode = Quote;
                                quotes.push({
                                    node: currentNode,
                                    depth
                                });
                            }
                        }
                        else if (currentDepth > depth) {
                            if (inList)
                                inList = false;
                            const findNode = quotes.filter(item => item.depth === (depth - 1)).pop();
                            if (findNode)
                                currentNode = findNode.node, currentDepth = depth;
                        }
                        if (this.tokens[this.cursor].value === '\n') {
                            currentNode.items.push(new Node('Literal', { value: '\n' }));
                        }
                        else {
                            if ((inList && this.tokens[this.cursor].value === ' ') || (this.tokens[this.cursor].value === ' ' && this.tokens[this.cursor + 1]?.type === 'rule' && lists.includes(this.tokens[this.cursor + 1]?.value))) {
                                if (!inList) {
                                    inList = true;
                                    listNode = new Node('List', { depth: 0, items: [], param: {} });
                                    list = [{ node, depth: 0 }];
                                    currentListNode = listNode;
                                    currentListDepth = 1;
                                    currentNode.items.push(listNode);
                                }
                                this.cursor++;
                                let depth = 1;
                                while (this.tokens[this.cursor]?.value === ' ')
                                    depth++, this.cursor++;
                                const identifier = this.tokens[this.cursor]?.value;
                                if (!lists.includes(identifier)) {
                                    const currentItem = currentListNode.items[currentListNode.items.length - 1];
                                    currentItem.items.push(new Node('Literal', { value: '\n' }));
                                    while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== '\n') {
                                        currentItem.items.push(this.walk());
                                    }
                                    continue;
                                }
                                this.cursor++;
                                if (currentListDepth < depth) {
                                    for (let i = 0; i < depth - currentListDepth; i++) {
                                        const item = new Node('List', { items: [], depth: currentListDepth + i, param: {} });
                                        currentListNode.items.push(item);
                                        currentListDepth = depth;
                                        currentListNode = item;
                                        list.push({
                                            node: currentListNode,
                                            depth
                                        });
                                    }
                                }
                                else if (currentListDepth > depth) {
                                    const findNode = list.filter(item => item.depth === (depth - 1)).pop();
                                    if (findNode)
                                        currentListNode = findNode.node, currentListDepth = depth;
                                }
                                if (this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '#') {
                                    this.cursor++;
                                    currentListNode.param['start'] = '';
                                    while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== ' ') {
                                        currentListNode.param['start'] += this.tokens[this.cursor].value;
                                        this.cursor++;
                                    }
                                    this.cursor++;
                                }
                                const currentItem = new Node('ListItem', { items: [], name: identifier });
                                if (this.tokens[this.cursor].value === '\n') {
                                    currentItem.items.push(new Node('Literal', { value: '\n' }));
                                }
                                else {
                                    while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== '\n') {
                                        currentItem.items.push(this.walk());
                                    }
                                }
                                currentListNode.items.push(currentItem);
                            }
                            else {
                                if (inList)
                                    inList = false;
                                while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== '\n') {
                                    currentNode.items.push(this.walk());
                                }
                            }
                        }
                        this.cursor++;
                    }
                    else
                        break;
                }
                return node;
            }
            else if (token.value === ' ' && this.tokens[this.cursor + 1].type === 'rule' && lists.includes(this.tokens[this.cursor + 1]?.value)) {
                const node = new Node('List', { depth: 0, items: [], param: {} });
                const list = [{ node, depth: 0 }];
                let currentNode = node;
                let currentDepth = 1;
                while (this.tokens[this.cursor]) {
                    if (this.tokens[this.cursor].value === ' ') {
                        this.cursor++;
                        let depth = 1;
                        while (this.tokens[this.cursor]?.value === ' ')
                            depth++, this.cursor++;
                        const identifier = this.tokens[this.cursor]?.value;
                        if (!lists.includes(identifier)) {
                            const currentItem = currentNode.items[currentNode.items.length - 1];
                            currentItem.items.push(new Node('Literal', { value: '\n' }));
                            while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== '\n') {
                                currentItem.items.push(this.walk());
                            }
                            continue;
                        }
                        this.cursor++;
                        if (currentDepth < depth) {
                            for (let i = 0; i < depth - currentDepth; i++) {
                                const item = new Node('List', { items: [], depth: currentDepth + i, param: {} });
                                currentNode.items.push(item);
                                currentDepth = depth;
                                currentNode = item;
                                list.push({
                                    node: currentNode,
                                    depth
                                });
                            }
                        }
                        else if (currentDepth > depth) {
                            const findNode = list.filter(item => item.depth === (depth - 1)).pop();
                            if (findNode)
                                currentNode = findNode.node, currentDepth = depth;
                        }
                        if (this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '#') {
                            this.cursor++;
                            currentNode.param['start'] = '';
                            while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== ' ') {
                                currentNode.param['start'] += this.tokens[this.cursor].value;
                                this.cursor++;
                            }
                            this.cursor++;
                        }
                        const currentItem = new Node('ListItem', { items: [], name: identifier });
                        if (this.tokens[this.cursor].value === '\n') {
                            currentItem.items.push(new Node('Literal', { value: '\n' }));
                        }
                        else {
                            while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== '\n') {
                                currentItem.items.push(this.walk());
                            }
                        }
                        currentNode.items.push(currentItem);
                        this.cursor++;
                    }
                    else
                        break;
                }
                return node;
            }
            else if (token.value === '\n' && this.tokens[this.cursor + 1]?.value === ' ' && !lists.includes(this.tokens[this.cursor + 2]?.value)) {
                const node = new Node('Indent', { depth: 0, items: [] });
                const indents = [{ node, depth: 0 }];
                let currentNode = node;
                let currentDepth = 1;
                this.cursor++;
                while (this.tokens[this.cursor]) {
                    if (this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ' ') {
                        this.cursor++;
                        let depth = 1;
                        while (this.tokens[this.cursor]?.type === 'rule' && this.tokens[this.cursor]?.value === ' ')
                            depth++, this.cursor++;
                        if (currentDepth < depth) {
                            for (let i = 0; i < depth - currentDepth; i++) {
                                const indent = new Node('Indent', { items: [], depth: currentDepth + i });
                                currentNode.items.push(indent);
                                currentDepth = depth;
                                currentNode = indent;
                                indents.push({
                                    node: currentNode,
                                    depth
                                });
                            }
                        }
                        else if (currentDepth > depth) {
                            const findNode = indents.filter(item => item.depth === (depth - 1)).pop();
                            if (findNode)
                                currentNode = findNode.node, currentDepth = depth;
                        }
                        if (this.tokens[this.cursor].value === '\n') {
                            currentNode.items.push(new Node('Literal', { value: '\n' }));
                        }
                        else {
                            while (this.tokens[this.cursor] && this.tokens[this.cursor].value !== '\n') {
                                currentNode.items.push(this.walk());
                            }
                        }
                        this.cursor++;
                    }
                    else
                        break;
                }
                return node;
            }
            else if (token.value === '[include(') {
                const node = new Node('Include', { name: '', param: {} });
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
                const node = new Node('Param', { name: '', items: [] });
                const _cursor = ++this.cursor;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && (this.tokens[this.cursor].value === '=' || this.tokens[this.cursor].value === '@')) && this.tokens[this.cursor].value !== '\n') {
                    node.name += this.tokens[this.cursor];
                    this.cursor++;
                }
                if (!(this.tokens[this.cursor]?.type === 'rule' && (this.tokens[this.cursor].value === '=' || this.tokens[this.cursor].value === '@'))) {
                    this.cursor = _cursor;
                    return new Node('Literal', { value: '@' });
                }
                if (this.tokens[this.cursor].value === '=') {
                    this.cursor++;
                    while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '@') && this.tokens[this.cursor].value !== '\n') {
                        node.items.push(this.walk());
                    }
                    if (!(this.tokens[this.cursor]?.type === 'rule' && this.tokens[this.cursor].value === '@')) {
                        this.cursor = _cursor;
                        return new Node('Literal', { value: '@' });
                    }
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '[age(') {
                const node = new Node('Age', { date: '' });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ')]')) {
                    node.date += this.tokens[this.cursor];
                    this.cursor++;
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '[dday(') {
                const node = new Node('Dday', { date: '' });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ')]')) {
                    node.date += this.tokens[this.cursor];
                    this.cursor++;
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '[pagecount(') {
                const node = new Node('PageCount', { name: '' });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ')]')) {
                    node.name += this.tokens[this.cursor];
                    this.cursor++;
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '[ruby(') {
                const node = new Node('Ruby', { names: [], param: {} });
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
                const node = new Node('Math', { value: '' });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === ')]')) {
                    node.value += this.tokens[this.cursor];
                    this.cursor++;
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '<math>') {
                const node = new Node('Math', { value: '' });
                this.cursor++;
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '</math>')) {
                    node.value += this.tokens[this.cursor];
                    this.cursor++;
                }
                this.cursor++;
                return node;
            }
            else if (token.value === '[date]' || token.value === '[datetime]') {
                const node = new Node('DateTime', {});
                this.cursor++;
                return node;
            }
            else if (token.value === '[목차]' || token.value === '[tableofcontents]') {
                const node = new Node('TableOfContents', {});
                this.cursor++;
                return node;
            }
            else if (token.value === '[각주]' || token.value === '[footnote]') {
                const node = new Node('TableOfFootnotes', {});
                this.cursor++;
                return node;
            }
            else if (token.value === '[br]') {
                const node = new Node('Literal', { value: '\n' });
                this.cursor++;
                return node;
            }
            else if (token.value === '[clearfix]') {
                const node = new Node('ClearFix', {});
                this.cursor++;
                return node;
            }
            else if (token.value === '[pagecount]') {
                const node = new Node('PageCount', {});
                this.cursor++;
                return node;
            }
            else if (token.value === '||') {
                this.cursor++;
                return this.table();
            }
            else if (token.value === '|') {
                this.cursor++;
                let caption = [];
                while (this.tokens[this.cursor] && !(this.tokens[this.cursor].type === 'rule' && this.tokens[this.cursor].value === '|')) {
                    caption.push(this.walk());
                }
                this.cursor++;
                const table = this.table();
                table.names = caption;
                return table;
            }
            else if (token.value === '\n' && this.tokens[this.cursor + 1]?.value === '##') {
                const node = new Node('Comment', { value: '' });
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
    }
    run(tokens) {
        this.tokens = tokens;
        this.cursor = 0;
        const nodes = [];
        while (this.tokens[this.cursor])
            nodes.push(this.walk());
        return nodes;
    }
}

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
rules.sort((a, b) => b.length - a.length);
var textRules = { "'''": 'Bold', "''": 'Italic', "__": 'Underscore', "~~": 'Strikethrough', "--": 'Strikethrough', "^^": 'SuperScript', ",,": 'SubScript' };
var videos = ["[youtube(", "[kakaotv(", "[nicovideo(", "[vimeo(", "[navertv("];
var lists = ["*", "1.", "a.", "A.", "i.", 'I.'];
class Renderer {
    findPage = () => null;
    findImage = () => null;
    getURL = (type, name) => (type === 'link' ? '/wiki/' : '/files/') + name;
    pageCount = async () => 0;
    categories = [];
    backlinks = [];
    footnoteIds = [];
    footnotes = [];
    headers = [];
    headerCounters = [0, 0, 0, 0, 0, 0];
    param = null;
    constructor(findPage, findImage, getURL, pageCount) {
        if (findPage)
            this.findPage = findPage;
        if (findImage)
            this.findImage = findImage;
        if (getURL)
            this.getURL = getURL;
        if (pageCount)
            this.pageCount = pageCount;
    }
    error(error) {
        return `<span class="wiki-error">${error}</span>`;
    }
    removeHTML(str) {
        return str.replace(/(<([^>]+)>)/gi, '');
    }
    disableQuot(str) {
        return str.replace(/"/, '&quot;');
    }
    disableTag(str) {
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    async getHTML(nodes) {
        return (await Promise.all(nodes.map((node) => this.walk(node)))).join('');
    }
    async walk(node) {
        switch (node.type) {
            case 'Literal': {
                if (node.value === '\n')
                    return '<br />';
                return this.disableTag(node.value);
            }
            case 'Heading': {
                var name = await this.getHTML(node.items);
                this.headerCounters[node.depth - 1]++;
                for (var i = node.depth; i < 6; i++)
                    this.headerCounters[i] = 0;
                var counts = [];
                for (var i = 0; i < node.depth; i++)
                    counts.push(this.headerCounters[i]);
                var id = counts.join('.');
                this.headers.push({
                    name: this.removeHTML(name),
                    closed: !node.folding,
                    id,
                    size: node.depth,
                    count: id + '.'
                });
                return `<h${node.depth} id="s-${id}" class="wiki-heading${node.folding ? ' wiki-close-heading' : ''}"><a href="#toc">${id}.</a> ${name}</h${node.depth}>`;
            }
            case 'Block': {
                return `<div style="${this.disableQuot(node.style)}">${await this.getHTML(node.items)}</div>`;
            }
            case 'Html': {
                return node.value;
            }
            case 'Folding': {
                return `<details class="wiki-folding"><summary>${await this.getHTML(node.names)}</summary>${await this.getHTML(node.items)}</details>`;
            }
            case 'Syntax': {
                var hignlightd;
                try {
                    hignlightd = hljs.highlight(node.value, { language: node.name.trim() }).value;
                }
                catch (err) {
                    hignlightd = hljs.highlightAuto(node.value).value;
                }
                return `<pre class="wiki-code">${hignlightd}</pre>`;
            }
            case 'Color': {
                return `<span style="color: ${this.disableQuot(node.color.split(',')[0])}">${await this.getHTML(node.items)}</span>`;
            }
            case 'Size': {
                return `<span class="wiki-size ${node.size > 0 ? 'size-up-' + node.size : 'size-down-' + Math.abs(node.size)}">${await this.getHTML(node.items)}</span>`;
            }
            case 'HorizontalLine': {
                return '<hr />';
            }
            case 'HyperLink': {
                var externalLink = node.link.startsWith('https://') || node.link.startsWith('http://');
                if (!externalLink)
                    this.backlinks.push({ type: 'link', name: node.link });
                var notExist = !(externalLink ? null : await this.findPage(node.link));
                return `<a href="${this.disableQuot(externalLink ? node.link : this.getURL('link', node.link))}" class="wiki-link${externalLink ? ' external-link' : (notExist ? ' not-exist' : '')}">${await this.getHTML(node.items)}</a>`;
            }
            case 'Category': {
                this.backlinks.push({ type: 'category', name: node.link });
                this.categories.push(node.link);
                return '';
            }
            case 'Image': {
                this.backlinks.push({ type: 'image', name: node.link });
                var image = await this.findImage(node.link);
                if (!image) {
                    return `<a href="${this.disableQuot(this.getURL('link', node.link))}" class="wiki-link not-exist">${node.link}</a>`;
                }
                return `<img src="${this.getURL('image', image.url)}" style="${this.disableQuot((node.param['align'] ? 'text-align: ' + node.param['align'] : '') + ';' +
                    (node.param['bgcolor'] ? 'background-color: ' + node.param['bgcolor'] : '') + ';' +
                    (node.param['border-radius'] ? 'border-radius: ' + node.param['bgcolor'] : '') + ';' +
                    (node.param['rendering'] ? 'image-rendering: ' + node.param['bgcolor'] : '') + ';')}" width="${node.param['width'] ? this.disableQuot(node.param['width']) : image.width}" height="${node.param['height'] ? this.disableQuot(node.param['height']) : image.height}" />`;
            }
            case 'Bold': {
                return `<b>${await this.getHTML(node.items)}</b>`;
            }
            case 'Italic': {
                return `<i>${await this.getHTML(node.items)}</i>`;
            }
            case 'Underscore': {
                return `<u>${await this.getHTML(node.items)}</u>`;
            }
            case 'Strikethrough': {
                return `<del>${await this.getHTML(node.items)}</del>`;
            }
            case 'SuperScript': {
                return `<sup>${await this.getHTML(node.items)}</sup>`;
            }
            case 'SubScript': {
                return `<sub>${await this.getHTML(node.items)}</sub>`;
            }
            case 'Video': {
                switch (node.name) {
                    case 'youtube':
                        return `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(node.code)}${node.param['start'] ? '?start=' + encodeURIComponent(node.param['start']) : ''}${node.param['end'] ? ((node.param['start'] ? '&' : '?') + 'end=' + encodeURIComponent(node.param['end'])) : ''}"${(node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')}${(node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : '')} frameborder="0" allowfullscreen loading="lazy"></iframe>`;
                    case 'kakaotv':
                        return `<iframe src="https//tv.kakao.com/embed/player/cliplink/${encodeURIComponent(node.code)}"${(node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')}${(node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : '')} frameborder="0" allowfullscreen loading="lazy"></iframe>`;
                    case 'nicovideo':
                        return `<iframe src="https//embed.nicovideo.jp/watch/sm${encodeURIComponent(node.code)}"${(node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')}${(node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : '')} frameborder="0" allowfullscreen loading="lazy"></iframe>`;
                    case 'vimeo':
                        return `<iframe src="https//player.vimeo.com/video/${encodeURIComponent(node.code)}"${(node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')}${(node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : '')} frameborder="0" allowfullscreen loading="lazy"></iframe>`;
                    case 'navertv':
                        return `<iframe src="https//tv.naver.com/embed/${encodeURIComponent(node.code)}"${(node.param['width'] ? ' width="' + this.disableQuot(node.param['width']) + '"' : '')}${(node.param['height'] ? ' width="' + this.disableQuot(node.param['height']) + '"' : '')} frameborder="0" allowfullscreen loading="lazy"></iframe>`;
                    default:
                        return '';
                }
            }
            case 'FootNote': {
                var name = node.name;
                var id = node.name;
                if (!name) {
                    for (name = '1'; this.footnoteIds.includes(name); name = String(+name + 1))
                        ;
                    id = name;
                }
                else {
                    var i;
                    for (i = 0; this.footnoteIds.includes(node.name + (i === 0 ? '' : '_' + i)); i++)
                        ;
                    id = node.name + (i === 0 ? '' : '_' + i);
                }
                this.footnoteIds.push(name);
                this.footnotes.push({
                    id, name, content: await this.getHTML(node.items)
                });
                return `<sup id="fn-${encodeURIComponent(id)}"><a href="#rfn-${encodeURIComponent(id)}">[${name}]</a></sup>`;
            }
            case 'BlockQuote': {
                return `<blockquote class="wiki-quote">${await this.getHTML(node.items)}</blockquote>`;
            }
            case 'Indent': {
                return `<div class="wiki-indent">${await this.getHTML(node.items)}</div>`;
            }
            case 'Include': {
                if (this.param)
                    return '';
                var page = await this.findPage(node.name);
                if (!page)
                    return this.error(`'${node.name}' 문서가 없습니다.`);
                var renderer = new Renderer(this.findPage, this.findImage, this.getURL);
                return await renderer.run(parse(page.content), node.param);
            }
            case 'Param': {
                if (!this.param)
                    return await this.getHTML(node.items);
                return this.param[node.name] || await this.getHTML(node.items);
            }
            case 'Age': {
                return `Age: <time datetime="${this.disableQuot(node.date)}" />(birthday)`;
            }
            case 'Dday': {
                return `Dday: <time datetime="${this.disableQuot(node.date)}" />(start time)`;
            }
            case 'PageCount': {
                return String(await this.pageCount(node.name));
            }
            case 'Ruby': {
                return `<ruby>${await this.getHTML(node.items)}<rp>(</rp><rt>${node.param['color'] ? '<span style="color: ' + this.disableQuot(node.param['color']) + '">' + (node.param['ruby'] || '') + '</span>'
                    : node.param['ruby'] || ''}</rt><rp>)</rp></ruby>`;
            }
            case 'Math': {
                return `<katex data-latex="${this.disableQuot(node.value)}">${this.disableTag(node.value)}</katex>`;
            }
            case 'DateTime': {
                return `<time datetime="${new Date().getTime()}" />`;
            }
            case 'TableOfContents': {
                return '<section class="wiki-toc" id="toc"><h2>목차</h2>' + this.headers.map(header => `<div class="wiki-toc-item wiki-toc-indent-${header.size}"><a href="#s-${header.id}">${header.count}.</a> ${header.name}</div>`).join('') + '</section>';
            }
            case 'TableOfFootnotes': {
                return '<section class="wiki-footnotes"><ol>' + this.footnotes.map(footnote => `<li id="rfn-${encodeURIComponent(footnote.id)}"><a href="#fn-${encodeURIComponent(footnote.id)}">[${footnote.name}]</a> <span>${footnote.content}</span></li>`).join('') + '</ol></section>';
            }
            case 'ClearFix': {
                return '<div style="clear: both" />';
            }
            case 'Table': {
                return `<table class="wiki-table" style="${this.disableQuot((node.param['width'] ? 'width: ' + node.param['width'] + ';' : '') +
                    (node.param['bgcolor'] ? 'background-color: ' + node.param['bgcolor'] + ';' : '') +
                    (node.param['color'] ? 'color: ' + node.param['color'] + ';' : '') +
                    (node.param['bordercolor'] ? 'border-color: ' + node.param['bordercolor'] + ';' : '') +
                    (node.param['align'] ? 'text-align: ' + node.param['align'] + ';' : ''))}">` + (node.names.length > 0 ? `<caption>${await this.getHTML(node.names)}</caption>` : '') + '<tbody>' + (await Promise.all(node.items.map(async (row) => `<tr style="${this.disableQuot((row.param['bgcolor'] ? 'background-color: ' + row.param['bgcolor'] + ';' : '') +
                        (row.param['color'] ? 'color: ' + row.param['color'] + ';' : ''))}">` + (await Promise.all(row.items.map(async (cell) => `<td ${cell.param['colspan'] ? 'colspan="' + this.disableQuot(cell.param['colspan']) + '" ' : ''}${cell.param['rowspan'] ? 'rowspan="' + this.disableQuot(cell.param['rowspan']) + '" ' : ''}${cell.param['colbgcolor'] ? 'data-colbgcolor="' + this.disableQuot(cell.param['colbgcolor']) + '" ' : ''}${cell.param['colcolor'] ? 'data-colcolor="' + this.disableQuot(cell.param['colcolor']) + '" ' : ''}style="${this.disableQuot((cell.param['vertical-align'] ? 'vertical-align: ' + cell.param['vertical-align'] + ';' : '') +
                            (cell.param['width'] ? 'width: ' + cell.param['width'] + ';' : '') +
                            (cell.param['height'] ? 'height: ' + cell.param['height'] + ';' : '') +
                            (cell.param['align'] ? 'text-align: ' + cell.param['align'] + ';' : 'text-align: center;') +
                            (cell.param['nopad'] ? 'padding: 0;' : '') +
                            (cell.param['bgcolor'] ? 'background-color: ' + cell.param['width'] + ';' : '') +
                            (cell.param['color'] ? 'color: ' + cell.param['color'] + ';' : ''))}">` + await this.getHTML(cell.items) + '</td>'))).join('') + '</tr>'))).join('') + '</tbody></table>';
            }
            case 'List': {
                return '<ul class="wiki-list">' + (await Promise.all(node.items.map(async (item) => {
                    if (item.type === 'ListItem') {
                        return `<li class="${item.name === '1.' ? 'wiki-list-decimal' :
                            item.name === 'a.' ? 'wiki-list-alpha' :
                                item.name === 'A.' ? 'wiki-list-upper-alpha' :
                                    item.name === 'i.' ? 'wiki-list-roman' :
                                        item.name === 'I.' ? 'wiki-list-upper-roman' :
                                            ''}">${await this.getHTML(item.items)}</li>`;
                    }
                    return await this.walk.bind(this)(item);
                }))).join('') + '</ul>';
            }
            default: {
                return '';
            }
        }
    }
    async run(nodes, param = null) {
        this.categories = [];
        this.backlinks = [];
        this.param = param;
        this.footnoteIds = [];
        this.footnotes = [];
        this.headers = [];
        this.headerCounters = [0, 0, 0, 0, 0, 0];
        var html = await this.getHTML(nodes);
        if (this.footnotes.length > 0) {
            html += await this.walk(new Node('TableOfFootnotes', {}));
        }
        return html;
    }
}

class Token {
    value;
    type;
    heading = null;
    style = null;
    size = null;
    color = null;
    constructor(value, type, { heading, style, size, color }) {
        this.value = value;
        this.type = type;
        this.toString = () => this.value;
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
}
class Tokenizer {
    cursor = 0;
    token = '';
    tokens = [];
    newLine = true;
    heading = null;
    constructor() { }
    previousTokenPush() {
        if (this.token !== '') {
            this.tokens.push(new Token(this.token, 'string', {}));
            this.token = '';
        }
    }
    isHeadingStart(str) {
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
    }
    isHeadingEnd(str) {
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
    }
    isHorizontalLine(str) {
        var match = str.match(/^-{4,9}$/);
        return match ? match[0].length : null;
    }
    run(input) {
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
            var heading;
            var horizontalLine;
            var str;
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
                this.tokens.push(new Token(line, 'rule', { heading }));
                continue;
            }
            for (var rule of rules) {
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
                this.tokens.push(new Token(str, 'rule', { style }));
                continue;
            }
            var size;
            var plus;
            if (((plus = (str = input.slice(this.cursor, this.cursor + 6)).startsWith('{{{+')) || str.startsWith('{{{-')) && str.endsWith(' ') && !isNaN(+(size = str.slice(4, 5)))) {
                this.previousTokenPush();
                this.tokens.push(new Token(str + ' ', 'rule', { size: parseInt((!plus ? '-' : '+') + size, 10) }));
                this.cursor += 5;
                continue;
            }
            var color;
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
    }
}

var tokenizer = new Tokenizer();
var parser = new Parser();
function parse(str) {
    return parser.run(tokenizer.run(str));
}
(function (gTh, CGRshorter) { "object" == typeof exports && "undefined" != typeof module ? module.exports = CGRshorter() : "function" == typeof define && define.amd ? define(CGRshorter) : (gTh = "undefined" != typeof globalThis ? globalThis : gTh || self).namumark = CGRshorter() })(this, function(){return {parse: parse,renderer:new Renderer(),}});
