
var hEls = document.querySelectorAll(`wiki-content div>h1,wiki-content div>h2,wiki-content div>h3,wiki-content div>h4`);
hEls.forEach(function (valEl, key, par) {
    var foldingElpr = document.createElement("div");
    foldingElpr.innerHTML = `&gt;`;
    foldingElpr.setAttribute("class", "fold_para");
    valEl.parentElement.innerHTML = foldingElpr.outerHTML + valEl.parentElement.innerHTML;
    var foldingEl = valEl.parentElement.getElementsByClassName("fold_para")[0];
    foldingEl.addEventListener("click", function (ev) {
        if (foldingEl.parentElement.querySelectorAll(`div.para_content`)[0] != null) {
            if (foldingEl.parentElement.querySelectorAll(`div.para_content`)[0].classList.contains("hidden_paragraph")) {
                foldingEl.parentElement.querySelectorAll(`div.para_content`)[0].classList.remove("hidden_paragraph");
            } else {
                foldingEl.parentElement.querySelectorAll(`div.para_content`)[0].classList.add("hidden_paragraph");
            }
        }
    });
});
    
async function using_fetch(link_addr) {
        var data000 = await fetch(link_addr);
        var rtv = await data000.json();
        console.log(rtv);
        return rtv;
    }
    var cgrcssjs = new ColourgreyShorterJS.ColourgreyShorterCSS(false);
    var pgnreader = new colourgreyPGN();
    globalThis['chessboards'] = [];

    function gamefunc(idx) {
        return chessboards[idx].game;
    }

    function boardfunc(idx) {
        return chessboards[idx].board;
    }
    window.addEventListener("DOMContentLoaded", function (ev) {
        var iy = 0;
        document.querySelectorAll(`chessboard`).forEach(function (el, key, parel) {
            var fenpos = el.getAttribute("fen");
            var pgnhist = el.getAttribute("pgn");
            el.setAttribute("tabindex", `${key}`);
            if (typeof el.parentElement.classList == 'object') {
                if (typeof el.parentElement.classList.contains == 'function') {
                    if (el.parentElement.classList.contains('chess-real-game') == true) {
                        el.setAttribute("data-real-game", "true");
                    }
                }
            }
            if (typeof fenpos == 'string' && new Chess().load(fenpos) != false) {
                var newche = new Chess(fenpos);
                var newbo = Chessboard(el, {
                    draggable: true,
                    onDrop: function (source, target) {
                        var board = boardfunc(parseInt(key));
                        var game = gamefunc(parseInt(key));
                        var promotion = 'q';
                        var files = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
                        var ranks = { '1': 7, '2': 6, '3': 5, '4': 4, '5': 3, '6': 2, '7': 1, '8': 0 };
                        console.log(game.board()[ranks[source[1]]][files[source[0]]]);
                        /*if (game.board()[ranks[source[1]]][files[source[0]]]!=null){
                            if (game.board()[ranks[source[1]]][files[source[0]]].type=='p' && ((game.board()[ranks[source[1]]][files[source[0]]].colour == 'w' && target[1]=='8') || (game.board()[ranks[source[1]]][files[source[0]]].colour=='b'&&target[1]=='1'))){
                                var newselect = document.createElement("div");
                                newselect.innerHTML=(typeof document.getEl_TagName('chessboard')[key].getAttribute('promotion')!='string'||document.getEl_TagName('chessboard')[key].getAttribute('promotion')=='')?`<select><option disabled>Select what piece this pawn promotes to</option><option value='q'>Q</option><option value='r'>R</option><option value='b'>B</option><option value='n'>N</option></select>`:(function(){var rtv='<select><option>Select what piece this pawn promotes to</option>';document.getEl_TagName('chessboard')[key].getAttribute('promotion').split('').forEach(function(val,idx,arr){rtv+=`<option value=${val}>${val}</option>`});rtv+=`</select>`;return rtv;})();
                                newselect.setAttribute('class','popover-box');
                                newselect.style.fontSize='150%';
                                var newselecta = document.getEl_Class('body')[0].appendChild(newselect);
                                var thisobj0 = this;
                                newselecta.getEl_TagName('select')[0].addEventListener('change',function(ev){
                                    promotion=this.value;
                                    console.log(promotion);
                                    var move = game.move({
                                        from: source,
                                        to: target,
                                        promotion:promotion 
                                    });
                                    if (move === null) return 'snapback';
                                    thisobj0.updateStatus();
                                    this.parentElement.remove();
                                    thisobj0.onSnapEnd();
                                });
                            } else {
                                var move = game.move({
                                    from: source,
                                    to: target,
                                    promotion:promotion
                                });

                                if (move === null) return 'snapback'
                        
                                this.updateStatus();
                            }
                            
                                
                        }*/var move = game.move({
                            from: source,
                            to: target,
                            promotion: 'q'
                        });

                        if (move === null) return 'snapback'

                        this.updateStatus();
                    },
                    onSnapEnd: function () {
                        var game = gamefunc(parseInt(key));
                        var board = boardfunc(parseInt(key));
                        board.position(game.fen());
                    },
                    onDragStart: function (source, piece, position, orientation) {
                        var board = boardfunc(parseInt(key));
                        var game = gamefunc(parseInt(key));
                        var thisobj = this;
                        // do not pick up pieces if the game is over
                        if (game.game_over() && (el.getAttribute("data-real-game") == "true" || el.getAttribute("data-real-game") == true)) return false

                        // only pick up pieces for the side to move
                        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                            return false;
                        }
                        board.clearCircles();
                        game.moves({
                            source: source,
                            verbose: true
                        }).forEach(function (element) {
                            if (element.from == source) {
                                board.addCircle(element.to);
                                var source2 = document.getEl_Attr("data-square", element.to)[key];
                                source2.addEventListener("click", function (ev) {
                                    thisobj.onDrop(source, element.to);
                                    thisobj.onSnapEnd();
                                });
                                var boardEl = document.getElementsByTagName("chessboard")[key];
                                boardEl.querySelectorAll("[data-piece]").forEach(function (val, idx, arr) {
                                    if (val.parentElement.getAttribute("data-square") != element.to) {
                                        boardEl.getEl_Attr("data-square", element.to)[0].removeEventListener("click", function (ev) {
                                            thisobj.onDrop(source, element.to);
                                            thisobj.onSnapEnd();
                                        });
                                    }
                                });
                            }
                        });
                    },
                    updateStatus: function () {
                        var board = boardfunc(parseInt(key));
                        var game = gamefunc(parseInt(key));
                        var status = ''
                        board.clearCircles();
                        var moveColor = 'White'
                        if (game.turn() === 'b') {
                            moveColor = 'Black'
                        }

                        // checkmate?
                        if (game.in_checkmate()) {
                            status = 'Game over, ' + moveColor + ' is in checkmate.'
                        }

                        // draw?
                        else if (game.in_draw()) {
                            status = 'Game over, drawn position'
                        }

                        // game still on
                        else {
                            status = moveColor + ' to move'

                            // check?
                            if (game.in_check()) {
                                status += ', ' + moveColor + ' is in check'
                            }
                        }
                    },
                    pieceTheme: function pieceTheme(piece) {
                        return '/ikkgwo/files/img/chess/' + piece + '.png';
                    },
                    position: (function () {
                        return newche.fen()
                    })(),


                });
                newbo.addCircle = function (to) {
                    var $circle = document.querySelectorAll("chessboard")[key].querySelector("[data-square='" + to + "']");
                    if ($circle != undefined) {
                        var circle = $circle.innerHTML;
                        if (!circle.includes("img")) {
                            $circle.innerHTML = ($circle.innerHTML + "<chess-circle></chess-circle>");
                        } else {
                            $circle.classList.add('highlight-black');
                        }
                    } else {
                        return null;
                    }
                };
                newbo.clearCircles = function () {
                    var $circles = document.querySelectorAll("chessboard [data-square]");
                    if ($circles != undefined) {
                        $circles.forEach(function (element) {
                            var circle = element.innerHTML;
                            circle = circle.replace('<chess-circle></chess-circle>', '');
                            circle = circle.replace('<chess-eat></chess-eat>', '');
                            element.innerHTML = (circle);
                            element.classList.remove('highlight-black');
                        });
                    } else {
                        return null;
                    }
                }
                newbo.addNote = function (to, noteparam) {
                    var $Notes = el.getEl_Attr("data-square", to)[0];
                    if ($Notes != undefined && $Notes != null) {
                        var Notes = $Notes.innerHTML;
                        $Notes.innerHTML = ($Notes.innerHTML + `<div class="nsss-${noteparam.m} chessnote">${noteparam.t}</div>`);

                    } else {
                        return null;
                    }
                };
                newbo.clearNotes = function () {
                    var $Notess = $(".chessnote");
                    if ($Notess != undefined) {
                        $Notess.each(function (index, element) {
                            var Notes = $(element).html();
                            console.log("deleted note");
                            Notes = Notes.replace('<chess-Notes></chess-Notes>', '');
                            $(element).removeClass("chessnote");
                            $(element).html("");
                        });
                    } else {
                        return null;
                    }
                };
                newbo.addComment = function (to, msg) {
                    var $commentSquare = el.getEl_Attr("data-square", to)[0];
                    if ($commentSquare != undefined && $commentSquare != null) {
                        var sqinner = $commentSquare.innerHTML;
                        var classattr = ``;
                        if (typeof msg.note == 'number' && msg.note != 6) {
                            classattr += `class="nsss-${msg.note} chessnote"`;
                        }
                        $commentSquare.innerHTML += `<div class="comment-bubble"><svg height="120" width="120">
                                <path d="M6 105 L18 93 C18 93 0 48 60 51 96 51 135 96 36 96 L36 96 L6 105Z" stroke="#050505" stroke-width="1.2" fill="#e0e0e0" ${classattr}></path>
                                <foreignObject style="word-break:break-all;" height="40.5" width="75" y="60" x="22.5" font-size="80" font-family="sans-serif">
                                    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:0.12em !important;word-break:break-all;color:#050505;font-weight:700;">${msg.message}</div>
                                </foreignObject>
                            </svg></div>`;
                        var svgs = el.querySelectorAll(`svg, svg *`);

                    } else {
                        return null;
                    }
                };
                newbo.clearComments = function () {
                    var $commentSquares = $("[data-square] .comment-bubble");
                    if ($commentSquares != undefined && $commentSquares != null) {
                        $commentSquares.each(function (index, element) {
                            $(element).remove();
                        });
                    } else {
                        return null;
                    }
                };
                var gamemoves3 = [];
                if (typeof pgnhist == 'string') {
                    gamemoves3 = (function () {
                        var rtv1 = [];

                        var pgnhist2 = pgnhist.replaceAll(/\[(.*?)\]/gmi, ``);
                        var rtv2 = pgnhist2;
                        rtv2 = rtv2.replaceAll(/ [0-9]/gmi, `|`).replaceAll(/ /gmi, `|`).replaceAll(/[0-9]\./gmi, `|`);
                        if (rtv2.match(/ [0-9]/gmi) != null) {
                            rtv2.match(/ [0-9]/gmi).forEach(function (val, idx, arr) {
                                rtv2 = rtv2.replace(val, `|`);
                            });
                        }
                        if (rtv2.match(/[0-9]\./gmi) != null) {
                            rtv2.match(/[0-9]\./gmi).forEach(function (val, idx, arr) {
                                rtv2 = rtv2.replace(val, `|`);
                            });
                        }
                        rtv2 = rtv2.replaceAll(`.`, `|`);
                        var doublepipematches = rtv2.match(`||`);
                        if (doublepipematches != null) {
                            doublepipematches.forEach(function (val, idx, arr) {
                                rtv2 = rtv2.replace(`||`, `|`)
                            });
                        }
                        rtv2 = rtv2.replaceAll(` `, ``);
                        var rtv4 = rtv2.split(`|`);
                        var rtv3 = [];
                        rtv4.forEach(function (val, idx, arr) {
                            if (val != '') {
                                rtv3.push(val.replace(` `, ``));
                            }
                        });
                        rtv1 = rtv3;
                        rtv1.forEach(function (val, idx, arr) {
                            if (val.includes(" ")) {
                                rtv1[idx] = val.replaceAll(" ", "");
                            }
                        });
                        return rtv1;
                    })();
                    if (gamemoves3.length == 1 && gamemoves3[0] == '') {
                        gamemoves3 = [];
                    }
                }
                chessboards.push({
                    game: newche,
                    board: newbo,
                    parsedpgn: pgnreader.rtparsedpgn(el.getAttribute("pgn")),
                    moves: pgnreader.rtparsedpgn(el.getAttribute("pgn")).gamehistorywr,
                    thisi: -1,
                    move: function () {
                        this.board.clearNotes();
                        this.board.clearComments();
                        var thisobj0 = this;
                        if (this.thisi <= this.moves.length) {
                            this.thisi++
                            if (this.thisi < -1) {
                                this.thisi++
                            }
                            var rtm = this.game.move(thisobj0.moves[thisobj0.thisi]);

                            var commentnote = 6;
                            this.board.position(thisobj0.game.fen());
                            if (typeof rtm == 'object' && rtm != null && thisobj0.parsedpgn.notes[thisobj0.thisi] != 6) {
                                this.board.addNote(rtm.to, {
                                    m: pgnreader.notes[thisobj0.parsedpgn.notes[thisobj0.thisi]].m,
                                    t: pgnreader.notes[thisobj0.parsedpgn.notes[thisobj0.thisi]].t
                                });
                                commentnote = pgnreader.notes[thisobj0.parsedpgn.notes[thisobj0.thisi]].m;
                            }
                            if (typeof rtm == 'object' && rtm != null && typeof thisobj0.parsedpgn.comments[thisobj0.thisi] == 'string' && thisobj0.parsedpgn.comments[thisobj0.thisi] != '') {
                                this.board.addComment(rtm.to, {
                                    message: thisobj0.parsedpgn.comments[thisobj0.thisi],
                                    note: commentnote
                                });
                            }
                            return rtm;
                        } else {
                            return false;
                        }
                    },
                    undo: function () {
                        this.board.clearNotes();
                        var thisobj0 = this;
                        if (this.thisi >= 0) {
                            if (this.thisi >= this.moves.length) {
                                this.thisi--
                            }
                            var rtm = this.game.undo();
                            this.board.position(thisobj0.game.fen());
                            this.thisi--
                            return rtm;
                        } else {
                            return false;
                        }
                    },
                    playbool: false,
                    play(speed) {
                        var thisobj0 = this;
                        var newspeed = 800;
                        if (typeof speed == 'number' && !isNaN(speed)) {
                            newspeed = speed;
                        }
                        window.setTimeout(function () {
                            if (thisobj0.playbool) {
                                var thismove0 = thisobj0.move();
                                if (thismove0 == false) {
                                    thisobj0.playbool = false;
                                } else {
                                    thisobj0.play(newspeed);
                                }
                            }
                        }, newspeed);
                        /* 속도를 조절하는 매개변수 안넣고 사용할 시, 0.8초 즉 800밀리초마다 움직임. */
                    },
                    stop_play(delay, speed) {
                        var thisobj0 = this;
                        var newdelay = 1200;
                        if (typeof delay == 'number' && !isNaN(delay)) {
                            newdelay = delay;
                        }
                        var newspeed = 800;
                        if (typeof speed == 'number' && !isNaN(speed)) {
                            newspeed = speed;
                        }
                        if (this.playbool) {
                            this.playbool = false;
                        } else {
                            this.playbool = true;
                            window.setTimeout(function () {
                                thisobj0.play(newspeed);
                            }, newdelay);
                        }
                    },
                    el: el,
                });
                /* var chessbutton=function(){var rtv=document.createElement("button");return rtv;}
                var btnGroupPr=document.createElement("div");
                btnGroupPr.setAttribute("class","btn-group chessBtns");
                var btnGroup = el.appendChild(btnGroupPr);
                btnGroup.innerHTML="";
                var chessStartBtnPr=chessbutton();
                chessStartBtnPr.setAttribute("class","btn btn-primary");
                chessStartBtnPr.setAttribute("onclick",`chessboards[${key}].el.getEl_Class('chessBtns')[0].show_hide("")`);
                var chessStartBtn = el.appendChild(chessStartBtnPr); */
                el.addEventListener("keyup", function (ev) {
                    if (ev.keyCode == 65) {
                        chessboards[key].undo();
                    }
                    if (ev.keyCode == 68) {
                        chessboards[key].move();
                    }
                    if (ev.keyCode == 87) {
                        chessboards[key].playbool = true;
                        chessboards[key].play();
                    }
                    if (ev.keyCode == 83) {
                        chessboards[key].stop_play();
                    }
                });
            } else {
                var newche = new Chess();
                var newbo = Chessboard(el, {
                    draggable: true,
                    onDrop: function (source, target) {
                        var board = boardfunc(parseInt(key));
                        var game = gamefunc(parseInt(key));
                        var promotion = 'q';
                        var files = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
                        var ranks = { '1': 7, '2': 6, '3': 5, '4': 4, '5': 3, '6': 2, '7': 1, '8': 0 };
                        console.log(game.board()[files[source[0]]][ranks[source[1]]]);
                        /*if (game.board()[files[source[0]]][ranks[source[1]]]!=null){
                            if (game.board()[ranks[source[1]]][files[source[0]]].type=='p' && ((game.board()[files[source[0]]][ranks[source[1]]].colour == 'w' && target[1]=='8') || (game.board()[files[source[0]]][ranks[source[1]]].colour=='b'&&target[1]=='1'))){
                                var newselect = document.createElement("div");
                                newselect.innerHTML=(typeof document.getEl_TagName('chessboard')[key].getAttribute('promotion')!='string'||document.getEl_TagName('chessboard')[key].getAttribute('promotion')=='')?`<select><option disabled>Select what piece this pawn promotes to</option><option value='q'>Q</option><option value='r'>R</option><option value='b'>B</option><option value='n'>N</option></select>`:(function(){var rtv='<select><option>Select what piece this pawn promotes to</option>';document.getEl_TagName('chessboard')[key].getAttribute('promotion').split('').forEach(function(val,idx,arr){rtv+=`<option value=${val}>${val}</option>`});rtv+=`</select>`;return rtv;})();
                                newselect.setAttribute('class','popover-box');
                                newselect.style.fontSize='150%';
                                var newselecta = document.getEl_Class('body')[0].appendChild(newselect);
                                var thisobj0 = this;
                                newselecta.getEl_TagName('select')[0].addEventListener('change',function(ev){
                                    promotion=this.value;
                                    console.log(promotion);
                                    var move = game.move({
                                        from: source,
                                        to: target,
                                        promotion:promotion 
                                    });
                                    if (move === null) return 'snapback';
                                    thisobj0.updateStatus();
                                    
                                    this.parentElement.remove();
                                    thisobj0.onSnapEnd();
                                });
                            } else {
                                var move = game.move({
                                    from: source,
                                    to: target,
                                    promotion:promotion
                                });

                                if (move === null) return 'snapback'
                        
                                this.updateStatus();
                            }
                        }*/

                        var move = game.move({
                            from: source,
                            to: target,
                            promotion: 'q'
                        });

                        if (move === null) return 'snapback'

                        this.updateStatus();
                    },
                    onSnapEnd: function () {
                        var game = gamefunc(parseInt(key));
                        var board = boardfunc(parseInt(key));
                        board.position(game.fen());
                    },
                    onDragStart: function (source, piece, position, orientation) {
                        var board = boardfunc(parseInt(key));
                        var game = gamefunc(parseInt(key));
                        var thisobj = this;
                        // do not pick up pieces if the game is over
                        if (game.game_over() && (el.getAttribute("data-real-game") == "true" || el.getAttribute("data-real-game") == true)) return false

                        // only pick up pieces for the side to move
                        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                            return false;
                        }
                        board.clearCircles();
                        game.moves({
                            source: source,
                            verbose: true
                        }).forEach(function (element) {
                            if (element.from == source) {
                                board.addCircle(element.to);
                                var source2 = document.getEl_Attr("data-square", element.to)[key];
                                source2.addEventListener("click", function (ev) {
                                    thisobj.onDrop(source, element.to);
                                    thisobj.onSnapEnd();
                                });
                                var boardEl = document.getElementsByTagName("chessboard")[key];
                                boardEl.querySelectorAll("[data-piece]").forEach(function (val, idx, arr) {
                                    if (val.parentElement.getAttribute("data-square") != element.to) {
                                        boardEl.getEl_Attr("data-square", element.to)[0].removeEventListener("click", function (ev) {
                                            thisobj.onDrop(source, element.to);
                                            thisobj.onSnapEnd();
                                        });
                                    }
                                });
                            }
                        });
                    },
                    updateStatus: function () {
                        var board = boardfunc(parseInt(key));
                        var game = gamefunc(parseInt(key));
                        var status = ''
                        board.clearCircles();
                        var moveColor = 'White'
                        if (game.turn() === 'b') {
                            moveColor = 'Black'
                        }

                        // checkmate?
                        if (game.in_checkmate()) {
                            status = 'Game over, ' + moveColor + ' is in checkmate.'
                        }

                        // draw?
                        else if (game.in_draw()) {
                            status = 'Game over, drawn position'
                        }

                        // game still on
                        else {
                            status = moveColor + ' to move'

                            // check?
                            if (game.in_check()) {
                                status += ', ' + moveColor + ' is in check'
                            }
                        }
                    },
                    pieceTheme: function pieceTheme(piece) {
                        return '/ikkgwo/files/img/chess/' + piece + '.png';
                    },
                    position: (function () {
                        return newche.fen()
                    })(),



                });
                newbo.addCircle = function (to) {
                    var $circle = document.querySelectorAll("chessboard")[key].querySelector("[data-square='" + to + "']");
                    if ($circle != undefined) {
                        var circle = $circle.innerHTML;
                        if (!circle.includes("img")) {
                            $circle.innerHTML = ($circle.innerHTML + "<chess-circle></chess-circle>");
                        } else {
                            $circle.classList.add('highlight-black');
                        }
                    } else {
                        return null;
                    }
                };
                newbo.clearCircles = function () {
                    var $circles = document.querySelectorAll("chessboard [data-square]");
                    if ($circles != undefined) {
                        $circles.forEach(function (element) {
                            var circle = element.innerHTML;
                            circle = circle.replace('<chess-circle></chess-circle>', '');
                            circle = circle.replace('<chess-eat></chess-eat>', '');
                            element.innerHTML = (circle);
                            element.classList.remove('highlight-black');
                        });
                    } else {
                        return null;
                    }
                }
                newbo.addNote = function (to, noteparam) {
                    var $Notes = el.getEl_Attr("data-square", to)[0];
                    if ($Notes != undefined) {
                        var Notes = $Notes.innerHTML;
                        $Notes.innerHTML = ($Notes.innerHTML + `<div class="nsss-${noteparam.m} chessnote">${noteparam.t}</div>`);

                    } else {
                        return null;
                    }
                };
                newbo.clearNotes = function () {
                    var $Notess = $(".chessnote");
                    if ($Notess != undefined) {
                        $Notess.each(function (index, element) {
                            var Notes = $(element).html();
                            console.log("deleted note");
                            Notes = Notes.replace('<chess-Notes></chess-Notes>', '');
                            $(element).removeClass("chessnote");
                            $(element).html("");
                        });
                    } else {
                        return null;
                    }
                };
                newbo.addComment = function (to, msg) {
                    var $commentSquare = el.getEl_Attr("data-square", to)[0];
                    if ($commentSquare != undefined && $commentSquare != null) {
                        var sqinner = $commentSquare.innerHTML;
                        var classattr = ``;
                        if (typeof msg.note == 'number' && msg.note != 6) {
                            classattr += `class="nsss-${msg.note} chessnote"`;
                        }
                        $commentSquare.innerHTML += `<div class="comment-bubble"><svg height="120" width="120">
                                <path d="M6 105 L18 93 C18 93 0 48 60 51 96 51 135 96 36 96 L36 96 L6 105Z" stroke="#050505" stroke-width="1.2" fill="#e0e0e0" ${classattr}></path>
                                <foreignObject style="word-break:break-all;" height="40.5" width="75" y="60" x="22.5" font-size="80" font-family="sans-serif">
                                    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:0.12em !important;word-break:break-all;color:#050505;font-weight:700;">${msg.message}</div>
                                </foreignObject>
                            </svg></div>`;
                        var svgs = el.querySelectorAll(`svg, svg * `);
                    } else {
                        return null;
                    }
                };
                newbo.clearComments = function () {
                    var $commentSquares = $("[data-square] .comment-bubble");
                    if ($commentSquares != undefined && $commentSquares != null) {
                        $commentSquares.each(function (index, element) {
                            $(element).remove();
                        });
                    } else {
                        return null;
                    }
                };
                var gamemoves3 = [];
                if (typeof pgnhist == 'string') {
                    gamemoves3 = (function () {
                        var rtv1 = [];
                        var pgnhist2 = pgnhist.replaceAll(/\[(.*?)\]/gmi, `
                                            `);
                        var rtv2 = pgnhist2;
                        rtv2 = rtv2.replaceAll(/ [0-9]/gmi, ` | `).replaceAll(/ /gmi, ` | `).replaceAll(/[0-9]\./gmi, ` | `);
                        if (rtv2.match(/ [0-9]/gmi) != null) {
                            rtv2.match(/ [0-9]/gmi).forEach(function (val, idx, arr) {
                                rtv2 = rtv2.replace(val, ` | `);
                            });
                        }
                        if (rtv2.match(/[0-9]\./gmi) != null) {
                            rtv2.match(/[0-9]\./gmi).forEach(function (val, idx, arr) {
                                rtv2 = rtv2.replace(val, ` | `);
                            });
                        }
                        rtv2 = rtv2.replaceAll(`.
                                            `, ` | `);
                        var doublepipematches = rtv2.match(` || `);
                        if (doublepipematches != null) {
                            doublepipematches.forEach(function (val, idx, arr) {
                                rtv2 = rtv2.replace(` || `, ` | `)
                            });
                        }
                        rtv2 = rtv2.replaceAll(`
                                            `, `
                                            `);
                        var rtv4 = rtv2.split(` | `);
                        var rtv3 = [];
                        rtv4.forEach(function (val, idx, arr) {
                            if (val != '') {
                                rtv3.push(val.replace(`
                                            `, `
                                            `));
                            }
                        });
                        rtv1 = rtv3;
                        rtv1.forEach(function (val, idx, arr) {
                            if (val.includes(" ")) {
                                rtv1[idx] = val.replaceAll(" ", "");
                            }
                        });
                        return rtv1;
                    })();
                    if (gamemoves3.length == 1 && gamemoves3[0] == '') {
                        gamemoves3 = [];
                    }
                }
                chessboards.push({
                    game: newche,
                    board: newbo,
                    parsedpgn: pgnreader.rtparsedpgn(el.getAttribute("pgn")),
                    moves: pgnreader.rtparsedpgn(el.getAttribute("pgn")).gamehistorywr,
                    thisi: -1,
                    move: function () {
                        this.board.clearNotes();
                        var thisobj0 = this;
                        if (this.thisi <= this.moves.length) {
                            this.thisi++
                            if (this.thisi < -1) {
                                this.thisi++
                            }
                            var rtm = this.game.move(thisobj0.moves[thisobj0.thisi]);
                            var commentnote = 6;
                            this.board.position(thisobj0.game.fen());
                            if (typeof rtm == 'object' && rtm != null && thisobj0.parsedpgn.notes[thisobj0.thisi] != 6) {
                                this.board.addNote(rtm.to, {
                                    m: pgnreader.notes[thisobj0.parsedpgn.notes[thisobj0.thisi]].m,
                                    t: pgnreader.notes[thisobj0.parsedpgn.notes[thisobj0.thisi]].t
                                });
                                commentnote = pgnreader.notes[thisobj0.parsedpgn.notes[thisobj0.this]].m;
                            }
                            if (typeof rtm == 'object' && rtm != null && typeof thisobj0.parsedpgn.comments[thisobj0.thisi] == 'string' && thisobj0.parsedpgn.comments[thisobj0.thisi] != null) {
                                this.board.addComment(rtm.to, {
                                    message: thisobj0.parsedpgn.comments[thisobj0.thisi],
                                    note: commentnote,
                                });
                            }
                            return rtm;
                        } else {
                            return false;
                        }
                    },
                    undo: function () {
                        this.board.clearNotes();
                        var thisobj0 = this;
                        if (this.thisi >= 0) {
                            if (this.thisi >= this.moves.length) {
                                this.thisi--
                            }
                            var rtm = this.game.undo();
                            this.board.position(thisobj0.game.fen());
                            this.thisi--
                            return rtm;
                        } else {
                            return false;
                        }
                    },
                    playbool: false,
                    play(speed) {
                        var thisobj0 = this;
                        var newspeed = 800;
                        if (typeof speed == 'number' && !isNaN(speed)) {
                            newspeed = speed;
                        }
                        window.setTimeout(function () {
                            if (thisobj0.playbool) {
                                var thismove0 = thisobj0.move();
                                if (thismove0 == false) {
                                    thisobj0.playbool = false;
                                } else {
                                    thisobj0.play(newspeed);
                                }
                            }
                        }, newspeed);
                        /* 속도를 조절하는 매개변수 안넣고 사용할 시, 0.8초 즉 800밀리초마다 움직임. */
                    },
                    stop_play(delay, speed) {
                        var thisobj0 = this;
                        var newdelay = 1200;
                        if (typeof delay == 'number' && !isNaN(delay)) {
                            newdelay = delay;
                        }
                        var newspeed = 800;
                        if (typeof speed == 'number' && !isNaN(speed)) {
                            newspeed = speed;
                        }
                        if (this.playbool) {
                            this.playbool = false;
                        } else {
                            this.playbool = true;
                            window.setTimeout(function () {
                                thisobj0.play(newspeed);
                            }, newdelay);
                        }
                    },
                    el: el,
                });
                /* var chessbutton=function(){var rtv=document.createElement("button");return rtv;}
                var btnGroupPr=document.createElement("div");
                btnGroupPr.setAttribute("class","btn-group chessBtns");
                var btnGroup = el.appendChild(btnGroupPr);
                btnGroup.innerHTML="";
                var chessStartBtnPr=chessbutton();
                chessStartBtnPr.setAttribute("class","btn btn-primary");
                chessStartBtnPr.setAttribute("onclick",`
                                            chessboards[$ {
                                                key
                                            }].el.getEl_Class('chessBtns')[0].show_hide("")`);
                var chessStartBtn = el.appendChild(chessStartBtnPr); */
                el.addEventListener("keyup", function (ev) {
                    if (ev.keyCode == 65) {
                        chessboards[key].undo();
                    }
                    if (ev.keyCode == 68) {
                        chessboards[key].move();
                    }
                    if (ev.keyCode == 87) {
                        chessboards[key].playbool = true;
                        chessboards[key].play();
                    }
                    if (ev.keyCode == 83) {
                        chessboards[key].stop_play();
                    }
                });
            }
        });
        if (document.querySelector(`.wiki-content .document`) != null) {
            document.querySelector(`.wiki-content .document`).setAttribute("data-paraparent", "true");
        }

        document.querySelectorAll(`.wiki-content .document .para h1.para-header`).forEach(function (el, key, parel) {
            el.parentElement.querySelector(`span`).outerHTML += `<a href="#h-${key}">${key}. </a>`;
            el.parentElement.setAttribute("id", `h-${key}`);
            el.parentElement.querySelectorAll(`.para h2.para-header`).forEach(function (el1, key1, parel1) {
                el1.querySelector(`span`).outerHTML += `<a href="#h-${key}.${key1}">${key}.${key1}. </a>`;
                el1.parentElement.setAttribute("id", `h-${key}.${key1}`);
                el1.parentElement.querySelectorAll(` .para h3.para-header`).forEach(function (el2, key2, parel2) {
                    el2.querySelector(`span`).outerHTML += `<a href="#h-${key}.${key1}.${key2}">${key}.${key1}.${key2}. </a>`;
                    el2.parentElement.setAttribute("id", `h-${key}.${key1}.${key2}`);
                    el2.parentElement.querySelectorAll(`.para h4.para-header`).forEach(function (el3, key3, parel3) {
                        el3.querySelector(`span`).outerHTML += `<a href="#h-${key}.${key1}.${key2}.${key3}">${key}.${key1}.${key2}.${key3}. </a>`;
                        el3.parentElement.setAttribute("id", `h-${key}.${key1}.${key2}.${key3}`);
                        el3.parentElement.querySelectorAll(`.para h5.para-header`).forEach(function (el4, key4, parel4) {
                            el4.querySelector(`span`).outerHTML += `<a href="#h-${key}.${key1}.${key2}.${key3}.${key4}">${key}.${key1}.${key2}.${key3}.${key4} </a>`;
                            el4.parentElement.setAttribute("id", `h-${key}.${key1}.${key2}.${key3}.${key4}`);
                            el4.parentElement.querySelectorAll(`.para h6.para-header`).forEach(function (el5, key5, parel5) {
                                el5.querySelector(`span`).outerHTML += `<a href="#h-${key}.${key1}.${key2}.${key3}.${key4}.${key5}">${key}.${key1}.${key2}.${key3}.${key4}.${key5} </a>`;
                                el5.parentElement.setAttribute("id", `h-${key}.${key1}.${key2}.${key3}.${key4}.${key5}`);
                            });
                        })
                    });
                });
            });
        });
        document.querySelectorAll(`#search_in_wiki`).forEach(function (el2, key2, par2) {
            el2.addEventListener("submit", function (ev) {
                ev.preventDefault();
                return document.getElementById('search_link').click();
            })
        });
        if (document.querySelector(`.docheader`) != null) {


            document.querySelector(`.docheader`).innerHTML = (function () {
                var rtv = '<ul><li><h4>목차</h4></li>';
                document.querySelectorAll(`.wiki-content .document .para h1.para-header`).forEach(function (val, idx, arr) {
                    rtv += `<li><a href="#h-${idx}">${idx}.</a> ${val.querySelector(`.para-title`).innerHTML}<li>`;
                    val.parentElement.querySelectorAll(`.para h2.para-header`).forEach(function (val1, idx1, arr1) {
                        rtv += `<li><a href="#h-${idx}.${idx1}">${idx}.${idx1}.</a> ${val1.querySelector(`.para-title`).innerHTML}<li>`;
                        val1.parentElement.querySelectorAll(`.para h3.para-header`).forEach(function (val2, idx2, arr2) {
                            rtv += `<li><a href="#h-${idx}.${idx1}.${idx2}">${idx}.${idx1}.${idx2}.</a> ${val2.querySelector(`.para-title`).innerHTML}<li>`;
                            val2.parentElement.querySelectorAll(`.para h4.para-header`).forEach(function (val3, idx3, arr3) {
                                rtv += `<li><a href="#h-${idx}.${idx1}.${idx2}.${idx3}">${idx}.${idx1}.${idx2}.${idx3}.</a> ${val3.querySelector(`.para-title`).innerHTML}<li>`;
                                val3.parentElement.querySelectorAll(`.para h5.para-header`).forEach(function (val4, idx4, arr4) {
                                    rtv += `<li><a href="#h-${idx}.${idx1}.${idx2}.${idx3}.${idx4}">${idx}.${idx1}.${idx2}.${idx3}.${idx4}.</a> ${val4.querySelector(`.para-title`).innerHTML}</li>`;
                                    val4.parentElement.querySelectorAll(`.para h6.para-header`).forEach(function (val5, idx5, arr5) {
                                        rtv += `<li><a href="#h-${idx}.${idx1}.${idx2}.${idx3}.${idx4}.${idx5}">${idx}.${idx1}.${idx2}.${idx3}.${idx4}.${idx5}.</a> ${val5.querySelector(`.para-title`).innerHTML}</li>`;
                                    });
                                });
                            });
                        });
                    });
                });
                rtv += `</ul>`;
                return rtv;
            })();
        }
        document.querySelector(':root').style.removeProperty('--display-rel-size');
        document.querySelector(':root').style.setProperty('--display-rel-size', window.innerWidth / 1000);
        var navinp = document.querySelectorAll('nav .navinp')[0];
        var mycheckbox = document.querySelectorAll('nav .mycheck')[0];
        if (navinp != undefined && navinp != null) {
            navinp.addEventListener('keyup', function (ev) {
                if (!mycheckbox.checked) { return false; }
                var search_keyword = navinp.value;
                /*if (typeof search_keyword == 'string') {
                    var docs_that_matches_searchKeyword = [];
                    var list;
                    using_fetch('/docjson').then(function (data) {
                        list = data;
                        list.forEach(function (val, idx, arr) {
                            if (val.toLowerCase().startsWith(search_keyword.toLowerCase(), 0)) {
                                docs_that_matches_searchKeyword.push(val);
                            }
                        });

                        var search_data_el_pr = document.createElement('div');
                        search_data_el_pr.setAttribute('class', 'search-data-list');
                        var newinner = '';
                        docs_that_matches_searchKeyword.forEach(function (val, idx, arr) {
                            newinner += `<li class="autocorr"><a href="/wiki/${val}">${val}</a></li>`;
                        });
                        newinner = `<ul>${newinner}</ul>`;
                        var search_data_el_outer = document.querySelector(`#search_autocomp_results`);
                        var search_data_el;
                        if (search_data_el_outer != undefined && search_data_el_outer != null) {
                            search_data_el_outer.innerHTML = '';
                            search_data_el = search_data_el_outer.appendChild(search_data_el_pr);
                            search_data_el.innerHTML = newinner;
                        }
                    });
                }*/
                /*socket.emit('search_data',{search_keyword:navinp.value});*/
            });
            /*navinp.addEventListener('keyup',function(ev){
                
        var search_keyword = navinp.value;
        if (typeof search_keyword == 'string') {
            var docs_that_matches_searchKeyword = [];
            var list;
            using_fetch('/docjson/'+search_keyword).then(function(data){
                list = data;
                docs_that_matches_searchKeyword=data;
            
        var search_data_el_pr = document.createElement('div');
        search_data_el_pr.setAttribute('class','search-data-list');
        var newinner='';
        docs_that_matches_searchKeyword.forEach(function(val,idx,arr){
            newinner+=`<li class="autocorr"><a href="/wiki/${val}">${val}</a></li>`;
        });
        newinner = `<ul>${newinner}</ul>`;
        var search_data_el_outer=document.querySelector(`#search_autocomp_results`);
        var search_data_el;
        if (search_data_el_outer!=undefined&&search_data_el_outer!=null){
            search_data_el_outer.innerHTML='';
            search_data_el=search_data_el_outer.appendChild(search_data_el_pr);
            search_data_el.innerHTML=newinner;
        }
            });
        }
            });*/
        }
        if (document.querySelector('.wiki-content') != null) {
            document.querySelector('.wiki-content').classList.add("enablepopover");
            document.querySelector('.wiki-content').classList.add("foldings_wrapper");
        }
        var chessboardgroups = document.querySelectorAll(`.chessboard-group chessboard`);
        chessboards.forEach(function (val, idx, arr) {
            if (typeof val == 'object' && val != null) {
                if (val.el instanceof HTMLElement) {
                    var chessboardgroup = val.el.parentElement;
                    if (chessboardgroup instanceof HTMLElement) {
                        if (chessboardgroup.classList.contains('chessboard-group')) {
                            var chessboardBtngroup = chessboardgroup.querySelector(`.btn-group`);
                            var chessboardBtns = {
                                undoBtn: null,
                                stop_playBtn: null,
                                moveBtn: null,
                            };
                            if (chessboardBtngroup instanceof HTMLElement) {
                                chessboardBtns['undoBtn'] = chessboardBtngroup.querySelector(`.prev`);
                                chessboardBtns['stop_playBtn'] = chessboardBtngroup.querySelector(`.play`);
                                chessboardBtns['moveBtn'] = chessboardBtngroup.querySelector(`.next`);
                            }
                            if (chessboardBtns.undoBtn instanceof HTMLElement) {
                                chessboardBtns.undoBtn.addEventListener("click", function (ev) {
                                    chessboards[idx].undo();
                                });
                            }
                            if (chessboardBtns.stop_playBtn instanceof HTMLElement) {
                                chessboardBtns.stop_playBtn.addEventListener("click", function (ev) {
                                    chessboards[idx].stop_play(500, 800);
                                });
                            }
                            if (chessboardBtns.moveBtn instanceof HTMLElement) {
                                chessboardBtns.moveBtn.addEventListener("click", function (ev) {
                                    chessboards[idx].move(800);
                                });
                            }
                        }
                    }
                }
            }
        });

        document.querySelectorAll(`.wiki.code.hlcode`).forEach(function (el, key, par) {
            hljs.highlightElement(el);
        });
        if (localStorage.getItem('darkmode') == 'true') {
            document.querySelector('.fixed-bottom-right-menu button.dark_mode').setAttribute('data-btn-checked', 'true');
            document.querySelector('.fixed-bottom-right-menu button.dark_mode').innerHTML = '라이트모드로';
            document.querySelector('body').setAttribute('dark', 'true');
        }
        cgrcssjs.styleAll();
    });
    window.addEventListener("load", function (ev) {
        document.querySelector(':root').style.removeProperty('--cgr-basic-unit');
        document.querySelector(':root').style.setProperty('--cgr-basic-unit', (window.innerWidth / 1400) + 'px');
        document.querySelector(':root').style.removeProperty('--display-rel-size');
        document.querySelector(':root').style.setProperty('--display-rel-size', window.innerWidth / 2000);
        document.querySelector(':root').style.removeProperty('--display-height-unit');
        document.querySelector(':root').style.setProperty('--display-height-unit', window.innerHeight / 1000 + 'px');
        if (typeof new URL(location.href).searchParams.get('from') == 'string') {
            document.querySelector('.wiki-content').innerHTML = `<div style="height:1.8em;width:60vw;background:lightblue;color:#404060;text-align:center;border-radius:3vmax;"><a href="/wiki/${new URL(location.href).searchParams.get('from')}?noredirect=1">${new URL(location.href).searchParams.get('from')}</a>에서 넘어옴</div>` + document.querySelector('.wiki-content').innerHTML;
        }
        /*if (localStorage.disablepopup_that_recommends_PC) {
            if (localStorage.disablepopup_that_recommends_PC==1){
                document.getEl_Class("body")[0].classList.add("shadowbody");
                document.body.innerHTML+=`<div class="popover-box">이 위키는 PC버전을 권장합니다.<br> 이미 데스크톱을 쓰고 있나요? 혹은 그냥 모바일을 사용해도 괜찮은가요? <br><br><br> <div class="btn-group" style="--bs-border-radius:1.5rem;"><button onclick="document.getEl_Class('body')[0].classList.remove('shadowbody'); this.parentElement.parentElement.remove();" class="btn btn-success split gap-left">닫&times;기</button><button onclick="document.getEl_Class('body')[0].classList.remove('shadowbody');localStorage.disablepopup_that_recommends_PC=0; this.parentElement.parentElement.remove();" class="btn btn-success split gap-right">앞으로 이 팝업 보지 않고 닫&times;기</button></div></div>`;
            }
        } else {
            localStorage.disablepopup_that_recommends_PC=1;
            document.getEl_Class("body")[0].classList.add("shadowbody");
            document.body.innerHTML+=`<div class="popover-box">이 위키는 PC버전을 권장합니다.<br> 이미 데스크톱을 쓰고 있나요? 혹은 그냥 모바일을 사용해도 괜찮은가요? <br><br><br> <div class="btn-group" style="--bs-border-radius:1.5rem;"><button onclick="document.getEl_Class('body')[0].classList.remove('shadowbody'); this.parentElement.parentElement.remove();" class="btn btn-success split gap-left">닫&times;기</button><button onclick="document.getEl_Class('body')[0].classList.remove('shadowbody');localStorage.disablepopup_that_recommends_PC=0; this.parentElement.parentElement.remove();" class="btn btn-success split gap-right">앞으로 이 팝업 보지 않고 닫&times;기</button></div></div>`;
        }*/
    });
    window.addEventListener("resize", function (ev) {
        document.querySelector(':root').style.removeProperty('--cgr-basic-unit');
        document.querySelector(':root').style.setProperty('--cgr-basic-unit', (window.innerWidth / 1400) + 'px');
        document.querySelector(':root').style.removeProperty('--display-rel-size');
        document.querySelector(':root').style.setProperty('--display-rel-size', window.innerWidth / 2000);
    });
