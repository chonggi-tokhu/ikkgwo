function colourgreyPGN() { }

colourgreyPGN.prototype = {
    notes: [
        { t: "??", m: 5 },
        { t: "?", m: 4 },
        { t: "?!", m: 3 },
        { t: "!?", m: 2 },
        { t: "!", m: 1 },
        { t: "!!", m: 0 },
    ],
    gameheader1(pgnstring) {
        var pgnstring1 = pgnstring;
        var pgnheader1 = {};
        var pgnstring2 = pgnstring1.split(`[`);
        for (var i02k9 = 1; i02k9 < pgnstring2.length; i02k9++) {
            var thtv1 = pgnstring2[i02k9];
            var thtv2 = {
                desc: thtv1.split(`"`)[0].replace(`]`, ``),
                v0: thtv1.split(`"`)[1],
            };
            pgnheader1[thtv2.desc] = thtv2.v0;
            if (pgnheader1 == undefined || pgnheader1 == {}) {
                continue;
            } else if (i02k9 == pgnstring2.length - 1) {
                return pgnheader1;
            }
        }
    },
    gamehistory1(pgnstring) {
        var cgf1 = pgnstring.split(`]`)[pgnstring.split(`]`).length - 1];

        var kakkakmoves1 = [];
        var spacechar = " ";
        var fullstopchar = ".";
        var ojk = 0;
        var chae1;
        var cgf2 = cgf1;
        for (var ijx = 0; ijx < cgf1.length; ijx++) {
            cgf1 = cgf1.replace("0.", " ");
            cgf1 = cgf1.replace("1.", " ");
            cgf1 = cgf1.replace("2.", " ");
            cgf1 = cgf1.replace("3.", " ");
            cgf1 = cgf1.replace("4.", " ");
            cgf1 = cgf1.replace("5.", " ");
            cgf1 = cgf1.replace("6.", " ");
            cgf1 = cgf1.replace("7.", " ");
            cgf1 = cgf1.replace("8.", " ");
            cgf1 = cgf1.replace("9.", " ");
            cgf1 = cgf1.replace(" 0", " ");
            cgf1 = cgf1.replace(" 1", "");
            cgf1 = cgf1.replace(" 2", "");
            cgf1 = cgf1.replace(" 3", "");
            cgf1 = cgf1.replace(" 4", "");
            cgf1 = cgf1.replace(" 5", "");
            cgf1 = cgf1.replace(" 6", "");
            cgf1 = cgf1.replace(" 7", "");
            cgf1 = cgf1.replace(" 8", "");
            cgf1 = cgf1.replace(" 9", "");
            cgf1 += " ";
            cgf1 = cgf1.replaceAll("  ", " ");
            cgf1 = cgf1.replace("  ", " ");
            cgf1 = cgf1.replace("  ", " ");
            cgf1 = cgf1.replace("   ", " ");
            cgf1 = cgf1.replace(" {", "{");
            cgf1 = cgf1.replace("} ", "} ");

            if (ijx == cgf1.length - 1) {
                cgf1 = cgf1.replace("-1", " 0-1");
                cgf1 = cgf1.replace("-0", " 1-0");
                for (var i = 0; i < cgf1.length; i++) {
                    if (cgf1[i] == spacechar) {
                        var avv = true;
                        var sijak123 = i;
                        for (var n = i + 1; n < cgf1.length; n++) {
                            if (cgf1[n] == " ") {
                                var kkut123 = n;

                                kakkakmoves1[ojk] = cgf1.slice(i + 1, n);

                                ojk = ojk + 1;
                                break;
                            }
                        }
                    }
                    if (kakkakmoves1 == []) {
                        continue;
                    } else if (i == cgf1.length - 1) {
                        return kakkakmoves1;
                    }
                }
            } else {
                continue;
            }
        }
    },
    gamehistory17(pgnstring) {
        var cgf1 = pgnstring.split(`]`)[pgnstring.split(`]`).length - 1];

        var kakkakmoves1 = [];
        var spacechar = " ";
        var fullstopchar = ".";
        var ojk = 0;
        var chae1;
        var cgf2 = cgf1;
        for (var ijx = 0; ijx < cgf1.length; ijx++) {
            cgf1 = cgf1.replace("0.", " ");
            cgf1 = cgf1.replace("1.", " ");
            cgf1 = cgf1.replace("2.", " ");
            cgf1 = cgf1.replace("3.", " ");
            cgf1 = cgf1.replace("4.", " ");
            cgf1 = cgf1.replace("5.", " ");
            cgf1 = cgf1.replace("6.", " ");
            cgf1 = cgf1.replace("7.", " ");
            cgf1 = cgf1.replace("8.", " ");
            cgf1 = cgf1.replace("9.", " ");
            cgf1 = cgf1.replace(" 0", " ");
            cgf1 = cgf1.replace(" 1", "");
            cgf1 = cgf1.replace(" 2", "");
            cgf1 = cgf1.replace(" 3", "");
            cgf1 = cgf1.replace(" 4", "");
            cgf1 = cgf1.replace(" 5", "");
            cgf1 = cgf1.replace(" 6", "");
            cgf1 = cgf1.replace(" 7", "");
            cgf1 = cgf1.replace(" 8", "");
            cgf1 = cgf1.replace(" 9", "");
            cgf1 += " ";
            cgf1 = cgf1.replaceAll("  ", " ");
            cgf1 = cgf1.replace("  ", " ");
            cgf1 = cgf1.replace("  ", " ");
            cgf1 = cgf1.replace("   ", " ");
            cgf1 = cgf1.replace(" {", "{");
            cgf1 = cgf1.replace("} ", "} ");

            if (ijx == cgf1.length - 1) {
                cgf1 = cgf1.replace("-1", " 0-1");
                cgf1 = cgf1.replace("-0", " 1-0");
                for (var i = 0; i < cgf1.length; i++) {
                    if (cgf1[i] == spacechar) {
                        var avv = true;
                        var sijak123 = i;
                        for (var n = i + 1; n < cgf1.length; n++) {
                            if (cgf1[n] == " ") {
                                var kkut123 = n;

                                kakkakmoves1[ojk] = cgf1.slice(i + 1, n);

                                ojk = ojk + 1;
                                break;
                            }
                        }
                    }
                    if (kakkakmoves1 == []) {
                        continue;
                    } else if (i == cgf1.length - 1) {
                        return kakkakmoves1;
                    }
                }
            } else {
                continue;
            }
        }
    },
    gamehistory16(pgnstring) {
        var cgf1 = pgnstring.split(`]`)[pgnstring.split(`]`).length - 1];
        cgf1 = cgf1.replaceAll(/\{(.*?)\}/gmi, "{" + "}").replaceAll(/\{(.*?) /gmi, "{ ");
        var kakkakmoves1 = [];
        var spacechar = " ";
        var fullstopchar = ".";
        var ojk = 0;
        var chae1;
        var cgf2 = cgf1;
        for (var ijx = 0; ijx < cgf1.length; ijx++) {
            cgf1 = cgf1.replace("0.", " ");
            cgf1 = cgf1.replace("1.", " ");
            cgf1 = cgf1.replace("2.", " ");
            cgf1 = cgf1.replace("3.", " ");
            cgf1 = cgf1.replace("4.", " ");
            cgf1 = cgf1.replace("5.", " ");
            cgf1 = cgf1.replace("6.", " ");
            cgf1 = cgf1.replace("7.", " ");
            cgf1 = cgf1.replace("8.", " ");
            cgf1 = cgf1.replace("9.", " ");
            cgf1 = cgf1.replace(" 0", " ");
            cgf1 = cgf1.replace(" 1", "");
            cgf1 = cgf1.replace(" 2", "");
            cgf1 = cgf1.replace(" 3", "");
            cgf1 = cgf1.replace(" 4", "");
            cgf1 = cgf1.replace(" 5", "");
            cgf1 = cgf1.replace(" 6", "");
            cgf1 = cgf1.replace(" 7", "");
            cgf1 = cgf1.replace(" 8", "");
            cgf1 = cgf1.replace(" 9", "");
            cgf1 += " ";
            cgf1 = cgf1.replaceAll("  ", " ");
            cgf1 = cgf1.replace("  ", " ");
            cgf1 = cgf1.replace("  ", " ");
            cgf1 = cgf1.replace("   ", " ");
            cgf1 = cgf1.replace(" {", "{");
            cgf1 = cgf1.replace("} ", "} ");

            if (ijx == cgf1.length - 1) {
                cgf1 = cgf1.replaceAll(`{`, ``).replaceAll(`}`, ``);
                cgf1 = cgf1.replace("-1", " 0-1");
                cgf1 = cgf1.replace("-0", " 1-0");
                for (var i = 0; i < cgf1.length; i++) {
                    if (cgf1[i] == spacechar) {
                        var avv = true;
                        var sijak123 = i;
                        for (var n = i + 1; n < cgf1.length; n++) {
                            if (cgf1[n] == " ") {
                                var kkut123 = n;

                                kakkakmoves1[ojk] = cgf1.slice(i + 1, n);

                                ojk = ojk + 1;
                                break;
                            }
                        }
                    }
                    if (kakkakmoves1 == []) {
                        continue;
                    } else if (i == cgf1.length - 1) {
                        return kakkakmoves1;
                    }
                }
            } else {
                continue;
            }
        }
    },
    gamehistory12(pgnstring) {
        var cgf1 = pgnstring.split(`]`)[pgnstring.split(`]`).length - 1];

        cgf1 = cgf1.replaceAll(/\{(.*?)\}/gmi, "{" + "}").replaceAll(/\{(.*?) /gmi, "{ ");
        var kakkakmoves1 = [];
        var spacechar = " ";
        var fullstopchar = ".";
        var ojk = 0;
        var chae1;
        var cgf2 = cgf1;
        for (var ijx = 0; ijx < cgf1.length; ijx++) {
            cgf1 = cgf1.replace(/\{(.*?)\}/gmi, "{" + "}").replace(/\{(.*?) /gmi, "{ ");
            cgf1 = cgf1.replace("0.", " ");
            cgf1 = cgf1.replace("1.", " ");
            cgf1 = cgf1.replace("2.", " ");
            cgf1 = cgf1.replace("3.", " ");
            cgf1 = cgf1.replace("4.", " ");
            cgf1 = cgf1.replace("5.", " ");
            cgf1 = cgf1.replace("6.", " ");
            cgf1 = cgf1.replace("7.", " ");
            cgf1 = cgf1.replace("8.", " ");
            cgf1 = cgf1.replace("9.", " ");
            cgf1 = cgf1.replace(/[0-9]\./gmi, ` `);
            cgf1 = cgf1.replace(" 0", " ");
            cgf1 = cgf1.replace(" 1", " ");
            cgf1 = cgf1.replace(" 2", " ");
            cgf1 = cgf1.replace(" 3", " ");
            cgf1 = cgf1.replace(" 4", " ");
            cgf1 = cgf1.replace(" 5", " ");
            cgf1 = cgf1.replace(" 6", " ");
            cgf1 = cgf1.replace(" 7", " ");
            cgf1 = cgf1.replace(" 8", " ");
            cgf1 = cgf1.replace(" 9", " ");
            cgf1 = cgf1.replace(/ [0-9]+/gmi, ` `);
            cgf1 = cgf1.replace("!", "");
            cgf1 = cgf1.replace("?", "");
            cgf1 += " ";
            cgf1 = cgf1.replace("  ", " ");
            cgf1 = cgf1.replace("  ", " ");
            cgf1 = cgf1.replace("  ", " ");
            cgf1 = cgf1.replace("   ", " ");
            cgf1 = cgf1.replace(" {", "{");
            cgf1 = cgf1.replace("} ", "} ");
            cgf1 = cgf1.replaceAll(`  `, ``);
            if (ijx == cgf1.length - 1) {
                cgf1 = cgf1.replace("-1", " 0-1");
                cgf1 = cgf1.replace("-0", " 1-0");
                cgf1 = cgf1.replace(" 0-1", "");
                cgf1 = cgf1.replace(" 1-0", "");
                cgf1 = cgf1.replaceAll(`{`, ``).replaceAll(`}`, ``);
                for (var i = 0; i < cgf1.length; i++) {
                    if (cgf1[i] == spacechar) {
                        var avv = true;
                        var sijak123 = i;
                        for (var n = i + 1; n < cgf1.length; n++) {
                            if (cgf1[n] == " ") {
                                var kkut123 = n;

                                kakkakmoves1[ojk] = cgf1
                                    .slice(i + 1, n)
                                    .replace(/\{(.*?)\}/g, ``)
                                    .replace("  ", " ");

                                ojk = ojk + 1;
                                break;
                            }
                        }
                    }
                    if (kakkakmoves1 == []) {
                        continue;
                    } else if (i == cgf1.length - 1) {
                        return kakkakmoves1;
                    }
                }
            } else {
                continue;
            }
        }
    },
    /*gamehistory19(pgnstring0) {
        var rtv = [];
        var pgnstring = new String(pgnstring0).split(`]`)[new String(pgnstring0).split(`]`).length - 1];
        var notematches = pgnstring.match(/[!?]/gmi);
        if (notematches != null) {
            notematches.forEach(function (val, idx, arr) {
                pgnstring = pgnstring.replace(`?`, ``).replace(`!`, ``);
            });
        }
        var len02 = pgnstring.length;
        var ijked = 0;
        var pgnmatches = pgnstring.match(/(.*?)\s+[0123456789]+\.\s+(.[RNBQKAEHMabcdefgh]?)+(.(1|2|3|4|5|6|7|8|)?)+(.(x|)?)(.[abcdefgh]?)(.[12345678]?)\s+(.(\+|#|=|)?)\s+[0123456789]+\.\s+(.[RNBQKAEHMabcdefgh]?)+(.(1|2|3|4|5|6|7|8|)?)+(.(x|)?)(.[abcdefgh]?)(.[12345678]?)\s+(.(\+|#|=|)?)\s+(.*)/gmi);
        if (pgnmatches != null) {
            while (pgnstring.match(/(.*?)\s+[0123456789]+\.\s+(.[RNBQKAEHMabcdefgh]?)+(.(1|2|3|4|5|6|7|8|)?)+(.(x|)?)(.[abcdefgh]?)(.[12345678]?)\s+(.(\+|#|=|)?)\s+[0123456789]+\.\s+(.[RNBQKAEHMabcdefgh]?)+(.(1|2|3|4|5|6|7|8|)?)+(.(x|)?)(.[abcdefgh]?)(.[12345678]?)\s+(.(\+|#|=|)?)\s+(.*)/gmi) != null && ijked < len02) {
                pgnstring = pgnstring.replace(/(.*?)\s+[0123456789]+\.\s+(.[RNBQKAEHMabcdefgh]?)+(.(1|2|3|4|5|6|7|8|)?)+(.(x|)?)(.[abcdefgh]?)(.[12345678]?)\s+(.(\+|#|=|)?)\s+[0123456789]+\.\s+(.[RNBQKAEHMabcdefgh]?)+(.(1|2|3|4|5|6|7|8|)?)+(.(x|)?)(.[abcdefgh]?)(.[12345678]?)\s+(.(\+|#|=|)?)\s+(.*)/gmi, `$1|$2$3$4$5$6$7|$8$9$10$11$12$13|$14`);
                ijked++
            }
        }
        rtv = pgnstring.split(`|`);
        rtv.forEach(function (val, idx, arr) {
            if (val == '') {
                rtv = rtv.splice(idx, 1);
            }
        });
        return rtv;
    },*/
    rtnotes(pgn555) {
        var pgnstring6 = this.gamehistory16(pgn555);
        var valtoreturn = [];
        for (var i = 0; i < pgnstring6.length; i++) {
            for (var kkklll = 0; kkklll < this.notes.length; kkklll++) {
                if (pgnstring6[i].includes("!")) {
                    if (pgnstring6[i].includes("!!")) {
                        valtoreturn[i] = 5;
                    } else if (pgnstring6[i].includes("?!")) {
                        valtoreturn[i] = 2;
                    } else if (pgnstring6[i].includes("!?")) {
                        valtoreturn[i] = 3;
                    } else {
                        valtoreturn[i] = 4;
                    }
                } else if (pgnstring6[i].includes("?")) {
                    if (pgnstring6[i].includes("??")) {
                        valtoreturn[i] = 0;
                    } else if (pgnstring6[i].includes("?!")) {
                        valtoreturn[i] = 2;
                    } else if (pgnstring6[i].includes("!?")) {
                        valtoreturn[i] = 3;
                    } else {
                        valtoreturn[i] = 1;
                    }
                } else {
                    valtoreturn[i] = 6;
                }
                if (i == pgnstring6.length - 1) {
                    if (kkklll == this.notes.length - 1) {
                        return valtoreturn;
                    }
                } else {
                    continue;
                }
            }
        }
    },
    rtcomments(pgn555) {
        if (!(new String(pgn555).includes("{") && new String(pgn555).includes("}"))) {
            return [];
        }
        var pgnstring6 = (function (pgnstr0) {
            var rtv2 = pgnstr0 + ` `; /* on line 6 lines below this line, regexp there checks space character on last even if that move is the last. so I add whitespace char to the last of this string */

            var rtv = [];
            var len0 = 0;
            while (rtv2.match(/\.[^\s\}]/gmi) != null && len0 < rtv2.length) {
                rtv2 = rtv2.replace(/\.[^\s\}]/gmi, ". ");
                len0++
            }
            var len1 = 0;
            while (rtv2.match(/\s\s/gmi) != null && len1 < rtv2.length) {
                rtv2 = rtv2.replace("  ", " ");
                len1++
            }
            rtv2 = rtv2.replaceAll("  ", "")
            rtv2 = rtv2.replace(/1\.(.*) (1-0|0-1)/gmi, "1.$1");
            var spaceinmiddlebracketmatches = rtv2.match(/\{(.*?)( +)(.*?)\}/gmi);
            var len2 = 0;
            while (rtv2.replace(/(.*?)\{(.*?)\}(.*)/gmi, "$2").includes(" ") && len2 < rtv2.length) {
                rtv2 = rtv2.replace(rtv2.replace(/(.*?)\{(.*?)\}(.*)/gmi, "$2"), rtv2.replace(/(.*?)\{(.*?)\}(.*)/gmi, "$2").replace(` `, `_`));
                len2++
            }

            var movematches = rtv2.match(/[0-9]\.(\s|)[RNBQKabcdefgh](x|)[abcdefgh][1-8](\+|#|=Q|=R|=B|=N|)(\?\?|\?|\?\!|\!\?|!|!!|)/gm);
            var halfmovematches = rtv2.match(/(.*?)[0-9]\.(.*?)\s(.*?)\s(.*)/gmi);
            var len3 = 0;
            while (rtv2.match(/(.*?)[0-9]\.(.*?)\s(.*?)\s(.*)/gmi) != null && len3 < rtv2.length) {
                if (len3 == 0) {
                    rtv2 = rtv2.replace(/[0-9]\.\s(.*?)\s(.*?)\s(.*)/gmi, "$1|$2|$3");
                } else if (len3 == rtv2.length - 1) {
                    rtv2 = rtv2.replace(/(.*?)[0-9]\.\s(.*?)\s(.*?)\s(.*)/gmi, "$1|$2|$3");
                } else {
                    rtv2 = rtv2.replace(/(.*?)[0-9]\.\s(.*?)\s(.*?)\s(.*)/gmi, "$1|$2|$3|$4");
                }
                len3++
            }
            rtv2 = rtv2.replaceAll("|{", `{`);
            rtv2 = rtv2.replaceAll("{|", `{`);
            rtv2 = rtv2.replaceAll(/}\s+(.[^\|])/gmi, "}|$1")

            var len4 = 0;
            while (rtv2.match(/\|\|/gmi) != null && len4 < rtv2.length) {
                rtv2 = rtv2.replace("||", "|");
                len4++
            }
            var numbmatch = rtv2.match(/\|[0-9]\|/gmi);
            if (numbmatch != null) {
                numbmatch.forEach(function (val, idx, arr) {
                    rtv2 = rtv2.replace(val, val.replace(`|`, ``));
                });
            }

            rtv = rtv2.split(`|`);
            return rtv;
        })(pgn555);
        var valtoreturn5 = [];
        for (var i13 = 0; i13 < pgnstring6.length; i13++) {
            if (pgnstring6[i13].includes("{") && pgnstring6[i13].includes("}")) {
                valtoreturn5[i13] = pgnstring6[i13].replace(/(.*?)\{(.*?)\}(.*)/gmi, "$2").replaceAll(`_`, ` `);
            } else {
                valtoreturn5[i13] = "";
            }

            if (i13 == pgnstring6.length - 1) {
                return valtoreturn5;
            } else {
                continue;
            }
        }
    },
    rtparsedpgn(pgnstring5) {
        return {
            headerofgame: this.gameheader1(pgnstring5),
            gamehistorywr: this.gamehistory12(pgnstring5),
            notes: this.rtnotes(pgnstring5),
            comments: this.rtcomments(pgnstring5),
        };
    },
};
