(function (gTh, wikirule) {  "object" == typeof exports && "undefined" != typeof module ? module.exports = wikirule() : "function" == typeof define && define.amd ? define(wikirule) : (gTh = "undefined" != typeof globalThis ? globalThis : gTh || self).rule = wikirule() })(this, function () {
    return function (strparam) {
        function textjoin(str, from, to) {
            var nstr = new String(str);
            var rtv = '';
            if ((typeof from == 'number' && !isNaN(from)) && (typeof to == 'number' && !isNaN(to))) {
                rtv = nstr.slice(from, to);
            }
            return rtv;
        }
        var newStr = new String(strparam);
        var newStr5 = new String(strparam);
        var newnewStr = new String(strparam);
        var newStr1 = new String(strparam);
        var rtv = ``;
        var waitingforrules = {
            wikimake: false,
            hyperlink: false,
            template: false,
            category: false,
            special: {
                mathematical: false,
                wikimacro: false,
                embededDoc: false,
            },
            automatical: {
                externalHyperlink: false,
            },
        }
        var starting = newStr.length;
        var wikirulestarting = newStr.length;
        var newStrlen = newStr.length;
        var categories = [];
        var nowikis = [];
        newStr = newStr.replaceAll(` `, ``);
        var nowikimatches = newStr.match(/\|nowiki-\|(.*?)\|-nowiki\|/gmi);
        if (nowikimatches != null) {
            nowikimatches.forEach(function (val, idx, arr) {
                nowikis.push(newStr.replace(/(.*?)\|nowiki-\|(.*?)\|-nowiki\|(.*)/gmi, `$2`));
                newStr = newStr.replace(/(.*?)\|nowiki-\|(.*?)\|-nowiki\|(.*)/gmi, `$1-nowiki${idx}-$3`);
            });
        }
        newStr = newStr.replace(/#redirect (.*?) \/\//gmi, `<script>if (new URL(window.location.href).searchParams.get('noredirect')!='1'){window.location.replace('/ikkgwo/wiki/$1?from='+decodeURI(new URL(location.href).pathname).replace('wiki',"").replaceAll('/',""));}</script>`);
        var catmatches = newStr.match(/\[\[분류:(.*?)\]\]/gmi);
        if (catmatches != null) {
            catmatches.forEach(function (val, idx, arr) {
                categories.push(`<li><a href="/ikkgwo/wiki/${val.replace(`[[`, ``).replace(`]]`, ``)}">${val.replace(`분류:`, ``).replace(`[[`, ``).replace(`]]`, ``)}</a></li>`);
                newStr = newStr.replace(val, '');
            });
        }
        newStr = newStr.replaceAll(`\\;`, `/-semicolon-/`).replaceAll(`\\,`, `.c.`).replaceAll(`\\=`, `.eq.`).replaceAll(`\\{`, `/-mbo-/`).replaceAll(`\\}`, `/-mbc-/`);
        var tempmatches = newStr.match(/\{틀\((.*?)\)\}\|(.*?);/gmi);
        var len7890333 = 0;

        var temp2matches = newStr.match(/\{틀\((.*?)\)\};/gmi);
        var len7890222 = 0;

        /*var mathematical_matches = newStr.match(/\{math\((.*?)\)\};/gmi);
        var len67893330 = 0;
        if (mathematical_matches != null) {
            while (newStr.match(/\{math\((.*?)\)\};/gmi) != null && len67893330 < newStr.length) {
                var formula1 = newStr.replace(/(.*?)\{math\((.*?)\)\};(.*)/gmi, `$2`).replaceAll(/([A-z]+)/gmi, `<span style="italic 105% Georgia, serif">$1</span>`);
                var formula2 = formula1
                    .replaceAll(/(.*?)\((.*?)\/(.*?)\)(.*)/gmi, `$1<span style="display:inline-block;font-size:0.85em;white-space:nowrap;margin-right:1rem;">$2<hr style="padding:0.5px;margin:0.5px;">$3</span>$4`)
                    .replaceAll(/(.*?),,\((.*?)\)(.*)/gmi, `$1<sub>$2</sub>$3`)
                    .replaceAll(/(.*?)\*\*\((.*?)\)(.*)/gmi, `$1<sup>$2</sup>$3`);
                newStr = newStr.replace(/(.*?)\{math\((.*?)\)\};(.*)/gmi, `$1${formula2.replaceAll(`*`, `×`)}$3`);
                len67893330++
            }
        }*/

        var math_fraction_matches = newStr.match(/\{분수\((.*?)\/(.*?)\)\};/gmi);
        var len5678333 = 0;
        if (math_fraction_matches != null) {
            while (newStr.match(/\{분수\((.*?)\/(.*?)\)\};/gmi) != null && len5678333 < newStr.length) {
                newStr = newStr.replace(/(.*?)\{분수\((.*?)\/(.*?)\)\};(.*?)/gmi, `$1<span style="display:inline-block;font-size:0.85em;white-space:nowrap;margin-right:1rem;">$2<hr style="padding:0.5px;margin:0.5px;">$3</span>$4`);
                len5678333++
            }
        }
        var superscript_matches = newStr.match(/\{sup\((.*?)\)\};/gmi);
        var len6789333 = 0;
        if (superscript_matches != null) {
            while (newStr.match(/\{sup\((.*?)\)\};/gmi) != null && len6789333 < newStr.length) {
                newStr = newStr.replace(/(.*?)\{sup\((.*?)\)\};(.*?)/gmi, `$1<sup>$2</sup>$3`);
                len6789333++
            }
        }


        for (var i = 0; i < newStr.length; i++) {

            if (newStr[i] + newStr[i + 1] == `[[`) {
                starting = i;
            }
            if (newStr[i] + newStr[i + 1] == `]]`) {
                if (starting != newStr.length) {
                    var newLink = {};
                    var newLinkText = newStr.slice(starting, i + 1);
                    newLinkText = newLinkText.replace(`[`, ``).replace(`[`, ``).replace(`]`, ``).replace(`]`, ``);
                    var newLink2 = newLinkText.split(`|`);
                    if (newLink2.length < 2) {
                        if (newLink2.length == 1) {
                            if (newLink2[0].split(`:`)[0] == `분류`) {
                                newLink['link'] = newLink2[0];
                                newLink['text'] = newLink2[0].replace(newLink2[0].split(`:`)[0] + `:`, ``);
                                categories.push(`<li><a href="/ikkgwo/wiki/${newLink.link}">${newLink.text}</a></li>`);
                                newStr = newStr.replace(`[[${newLink2[0]}]]`, ``);
                            } else {
                                newLink['link'] = newLink2[0];
                                newLink['text'] = newLink2[0];
                                newStr = newStr.replace(`[[` + newLinkText + `]]`, `<a href="/ikkgwo/wiki/${newLink.link}">${newLink.text}</a>`);
                            }
                        }
                    } else {
                        newLink['link'] = newLink2[0];
                        newLink['text'] = newLink2[1];
                        if (newLink.link.startsWith(`https://`) || newLink.link.startsWith(`http://`)) {
                            newStr = newStr.replace(`[[` + newLinkText + `]]`, `<a href="${newLink.link}">${newLink.text}</a>`);
                        } else if (newLink.link.startsWith(`NamuWiki:`)) {
                            newStr = newStr.replace(`[[` + newLinkText + `]]`, `<a href="https://namu.wiki/w/${newLink.link.replace('NamuWiki:', '')}">${newLink.text}</a>`);
                        } else {
                            newStr = newStr.replace(`[[` + newLinkText + `]]`, `<a href="/ikkgwo/wiki/${newLink.link}">${newLink.text}</a>`);
                        }
                    }
                }
            }
        }

        var categoryElouter = ``;
        if (categories.length == 0 && newStr.match(/<div class="category">(.*?)<\/div>/gmi) == null && !newStr.includes(`<div style="background:lightblue;border-radius:10vmin;margin:1px;padding-bottom:2px;padding-top:2px;text-align:center;color:#050505 !important;">이 문서는 분류가 필요합니당 ㅎㅎ</div>`)) {
            categoryElouter = `<div style="background:lightblue;border-radius:10vmin;margin:1px;padding-bottom:2px;padding-top:2px;text-align:center;color:#050505 !important;">이 문서는 분류가 필요합니당 ㅎㅎ</div>`;
        } else {
            if (categories.length >= 1) {
                categories.forEach(function (val, idx, arr) {
                    if (idx == 0) {
                        categoryElouter += `<div class="category"><h2>분류</h2><ul class="category-list">`;
                    }
                    categoryElouter += val;
                    if (idx == arr.length - 1) {
                        categoryElouter += `</ul></div>`;
                    }
                });
            }

        }
        newStr = categoryElouter + newStr;
        newStr = newStr.replaceAll(`[br]`, `&lt;br&gt;`);

        newStr5 = newStr;
        newnewStr = newStr;
        newStr1 = newStr;
        newStr = newStr.replaceAll(`/-semicolon-/`, `;`).replaceAll(`.c.`, `,`).replaceAll(`.eq.`, `=`).replaceAll(`/-mbc-/`, `}`).replaceAll(`/-mbo-/`, `{`);
        var len = newStr.length;
        function lenfunc() {
            return len;
        }

        newStr5 = newStr;
        newnewStr = newStr;
        newStr1 = newStr;
        var htags = newStr.split(`/nH`);
        var h1h6 = {
            h1: false,
            h2: false,
            h3: false,
            h4: false,
            h5: false,
            h6: false,
        }
        var h1h62 = {
            h1: 0,
            h2: 0,
            h3: 0,
            h4: 0,
            h5: 0,
            h6: 0,
        }
        var h1 = 0, h2 = 0, h3 = 0, h4 = 0, h5 = 0, h6 = 0;
        var newarr = [];
        rtv = newStr;
        /*for (var i4 = 0; i4 < newStr.length; i4++) {
            console.log(newStr[i4 - 1]);
            if (newStr[i4 - 2] + newStr[i4 - 1] == `_H`) {
                console.log('왔음');
                if (newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1] + newStr[i4 + 2] + newStr[i4 + 3] + newStr[i4 + 4] + newStr[i4 + 5] == '_H######') {
                    rtv = rtv.replace(newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1] + newStr[i4 + 2] + newStr[i4 + 3] + newStr[i4 + 4] + newStr[i4 + 5], `<div id="h${h1}.${h2}.${h3}.${h4}.${h5}.${h6}"><h6><a href="#h${h1}.${h2}.${h3}.${h4}.${h5}.${h6}">${h1}.${h2}.${h3}.${h4}.${h5}.${h6}.</a>${rtv.slice(i4 + 6, rtv.length - 1).split(`/_H`)[0]}</h6>`);
                    h1h6.h6 = true;
                    h6++
                } else if (newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1] + newStr[i4 + 2] + newStr[i4 + 3] + newStr[i4 + 4] == '_H#####') {
                    rtv = rtv.replace(newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1] + newStr[i4 + 2] + newStr[i4 + 3] + newStr[i4 + 4], `<div id="h${h1}.${h2}.${h3}.${h4}.${h5}"><h5><a href="#h${h1}.${h2}.${h3}.${h4}.${h5}">${h1}.${h2}.${h3}.${h4}.${h5}.</a>${rtv.slice(i4 + 5, rtv.length - 1).split(`/_H`)[0]}</h5>`);
                    h1h6.h5 = true;
                    if (i4 != 0 && (h1h6.h6 == true)) {
                        rtv += `</div>`;
                        h1h6.h6 = false;
                    } else {
                        h5++
                    }
                } else if (newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1] + newStr[i4 + 2] + newStr[i4 + 3] == '_H####') {
                    rtv = rtv.replace(newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1] + newStr[i4 + 2] + newStr[i4 + 3], `<div id="h${h1}.${h2}.${h3}.${h4}"><h4><a href="#h${h1}.${h2}.${h3}.${h4}">${h1}.${h2}.${h3}.${h4}.</a>${rtv.slice(i4 + 4, rtv.length - 1).split(`/_H`)[0]}</h4>`);
                    if (i4 != 0 && (h1h6.h5 == true || h1h6.h6 == true)) {
                        rtv += `</div>`
                        if (h1h6.h6 == true) {
                            h1h6.h6 = false;
                        }
                        if (h1h6.h5 == true) {
                            h1h6.h5 = false;
                        }
                    } else {
                        h4++
                    }
                } else if (newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1] + newStr[i4 + 2] == '_H###') {
                    rtv = rtv.replace(newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1] + newStr[i4 + 2], `<div id="h${h1}.${h2}.${h3}"><h3><a href="#h${h1}.${h2}.${h3}">${h1}.${h2}.${h3}</a>${rtv.slice(i4 + 3, rtv.length - 1).split(`/_H`)[0]}</h3>`);

                    if (i4 != 0 && (h1h6.h4 == true || h1h6.h5 == true || h1h6.h6 == true)) {
                        rtv += `</div>`
                        if (h1h6.h6 == true) {
                            h1h6.h6 = false;
                        }
                        if (h1h6.h5 == true) {
                            h1h6.h5 = false;
                        }
                        if (h1h6.h4 == true) {
                            h1h6.h4 = false;
                        }
                    } else {
                        h3++
                    }
                } else if (newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1] == '_H##') {
                    rtv = rtv.replace(newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] + newStr[i4 + 1], `<div id="h${h1}.${h2}"><h2><a href="#h${h1}.${h2}">${h1}.${h2}.</a>${rtv.slice(i4 + 2, rtv.length - 1).split(`/_H`)[0]}</h2>`);

                    if (i4 != 0 && (h1h6.h3 == true || h1h6.h4 == true || h1h6.h5 == true || h1h6.h6 == true)) {
                        rtv += `</div>`
                        if (h1h6.h6 == true) {
                            h1h6.h6 = false;
                        }
                        if (h1h6.h5 == true) {
                            h1h6.h5 = false;
                        }
                        if (h1h6.h4 == true) {
                            h1h6.h4 = false;
                        }
                        if (h1h6.h3 == true) {
                            h1h6.h3 = false;
                        }
                    } else {
                        h2++
                    }
                } else if (newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4] == '_H#') {
                    console.log(`씻파아`)
                    rtv = rtv.replace(newStr[i4 - 2] + newStr[i4 - 1] + newStr[i4], `<div id="h${h1}"><h1><a href="#h${h1}">${h1}.</a>${rtv.slice(i4 + 1, rtv.length - 1).split(`/_H`)[0]}</h1>`);

                    if (i4 != 0 && (h1h6.h2 == true || h1h6.h3 == true || h1h6.h4 == true || h1h6.h5 == true || h1h6.h6 == true)) {
                        rtv += `</div>`
                        if (h1h6.h6 == true) {
                            h1h6.h6 = false;
                        }
                        if (h1h6.h5 == true) {
                            h1h6.h5 = false;
                        }
                        if (h1h6.h4 == true) {
                            h1h6.h4 = false;
                        }
                        if (h1h6.h3 == true) {
                            h1h6.h3 = false;
                        }
                        if (h1h6.h2 == true) {
                            h1h6.h2 = false;
                        }
                    } else {
                        h1++
                    }
                }
            }
            if (i4 == newStr.length - 1) {
                rtv += `</div>`;
                for (var ih1 = 0; ih1 < h1; ih1++) {
                    rtv += `</div>`;
                }
                for (var ih2 = 0; ih2 < h2; ih2++) {
                    rtv += `</div>`;
                }
                for (var ih3 = 0; ih3 < h3; ih3++) {
                    rtv += `</div>`;
                }
                for (var ih4 = 0; ih4 < h4; ih4++) {
                    rtv += `</div>`;
                }
                for (var ih5 = 0; ih5 < h5; ih5++) {
                    rtv += `</div>`;
                }
                for (var ih6 = 0; ih6 < h6; ih6++) {
                    rtv += `</div>`;
                }
            }
        }*/
        /*var Hsplit = rtv.split(`_H`);
        for (var i6 = 0; i6 < Hsplit.length; i6++){
            var val = Hsplit[i6];
            var val2 = val.split(`/_H`);
            var H7 = val2[0];
            var Htitlepr = H7.split(` `)
            var Htitle = '';
            var Hcontent = '';
            Htitlepr.forEach(function (val9, idx9, arr9) { if (idx9 != 0) {
                Hcontent += val9;
            } else { Htitle += val9; }});
            
        }*/
        function joinfunc(strparam, ...indexes) {
            var NSTR = new String(strparam);
            var rtv78 = '';
            indexes.forEach(function (val, idx, arr) {
                if (typeof val == 'number' && !isNaN(val)) {
                    rtv78 += NSTR[val];
                }
            });
            return rtv78;
        }
        function joinfuncsimple(strparam, from, to) {
            var NSTR = new String(strparam);
            var rtv78 = '';
            var rtv78start = false;
            for (var i78x = 0; i78x < NSTR.length; i78x++) {
                if (i78x == from) {
                    rtv78start = true;
                }
                if (rtv78start == true) {
                    rtv78 += NSTR[i78x];
                }
                if (i78x == to) {
                    rtv78start = false;
                }
            }
        }
        var newrtv = rtv;
        var newrtv2 = '';
        var numberofhs = {
            h1: 0,
            h2: 0,
            h3: 0,
            h4: 0,
            h5: 0,
            h6: 0,
        }
        var waitingforhs = {
            h1: false,
            h2: false,
            h3: false,
            h4: false,
            h5: false,
            h6: false,
        }
        /*var chessmatcheswithpgn = rtv.match(/\{chessboard\((.*?)\)\|\((.*?)\)\}/gmi);
        if (chessmatcheswithpgn != null) {
            for (var i567 = 0; i567 < chessmatcheswithpgn.length; i567++) {
                var specrtv0 = rtv.replace(/\{chessboard\((.*?)\)\}/gmi, "$1").split(`)`)[0];
                rtv = rtv.replace(/\{chessboard\((.*?)\)\|\((.*?)\)\}/gmi, `<chessboard fen="` + specrtv0 + `" pgn="` + "$2" + `" style="width:20em;"></chessboard>`);
            }
        }*/
        var img_with_alt_and_size_matches = rtv.match(/\{img\((.*?)\)\((.*?)\)\}\|width=(.*?);/gmi);
        if (img_with_alt_and_size_matches != null) {
            for (var i789 = 0; i789 < img_with_alt_and_size_matches.length; i789++) {
                if (rtv.replace(/\{img\((.*?)\)\}\|width=(.*?);/gmi, "$1").includes(`)(`)) {
                    var thingtorep = rtv.replace(/(.*?)\{img\((.*?)\)\}\|width=(.*?);(.*)/gmi, "$2");
                    var width = rtv.replace(/(.*?)\{img\((.*?)\)\}\|width=(.*?);(.*)/gmi, "$3");
                    rtv = rtv.replace(img_with_alt_and_size_matches[i789], `<img src="` + thingtorep.replace(")(", `" alt="`) + `" width=` + width + `>`);
                } else {
                    rtv = rtv.replace(/\{img\((.*?)\)\((.*?)\)\}\|width=(.*?);/gmi, `<img src="$1" alt="$2" width="$3">`);
                }
            }
        }
        var img_with_size_matches = rtv.match(/\{img\((.*?)\)\}\|width=(.*?);/gmi);
        if (img_with_size_matches != null) {
            for (var i890 = 0; i890 < img_with_size_matches.length; i890++) {
                rtv = rtv.replace(/(.*?)\{img\((.*?)\)\}\|width=(.*?);(.*)/gmi, `$1 <img src="$2" width="$3"> $4`);
            }
        }
        var ad_matches = rtv.match(/(.*?)\{ad\((.*?)\)\}\|;(.*?)/gmi);
        if (ad_matches != null) {
            for (var i8901 = 0; i8901 < ad_matches.length; i8901++) {
                rtv = rtv.replace(/(.*?)\{ad\((.*?)\)\}\|;(.*?)/gmi, `$1 <iframe src="/ikkgwo/wiki/광고:$2" class="ad_frame" width="350" frameborder="0"></iframe>$3`);
            }
        }
        var img_matches = rtv.match(/(.*?)\{img\((.*?)\)\}\|;(.*)/gmi);
        if (img_matches != null) {
            for (var i901 = 0; i901 < img_matches.length; i901++) {
                rtv = rtv.replace(/(.*?)\{img\((.*?)\)\}\|;(.*)/gmi, `$1 <img src="$2" width="250"> $3`);
            }
        }
        rtv = rtv.replace(` `, ``);
        for (var i = 0; i < rtv.length; i++) {
            rtv = rtv.replace(/###### (.*?) ###### (.*?) \/\/\//gmi, `<div class="para"><h6 class="para-header"><span class="parafolder">&#65088;</span><span class="para-title">$1</span></h6><div class="paracontent"> $2 </div></div>`);
            rtv = rtv.replace(/##### (.*?) ##### (.*?) \/\/\//gmi, `<div class="para"><h5 class="para-header"><span class="parafolder">&#65088;</span><span class="para-title">$1</span></h5><div class="paracontent"> $2 </div></div>`);
            rtv = rtv.replace(/#### (.*?) #### (.*?) \/\/\//gmi, `<div class="para"><h4 class="para-header"><span class="parafolder">&#65088;</span><span class="para-title">$1</span></h4><div class="paracontent"> $2 </div></div>`);
            rtv = rtv.replace(/### (.*?) ### (.*?) \/\/\//gmi, `<div class="para"><h3 class="para-header"><span class="parafolder">&#65088;</span><span class="para-title">$1</span></h3><div class="paracontent"> $2 </div></div>`);
            rtv = rtv.replace(/## (.*?) ## (.*?) \/\/\//gmi, `<div class="para"><h2 class="para-header"><span class="parafolder">&#65088;</span><span class="para-title">$1</span></h2><div class="paracontent"> $2 </div></div>`);
            rtv = rtv.replace(/# (.*?) # (.*?) \/\/\//gmi, `<div class="para"><h1 class="para-header"><span class="parafolder">&#65088;</span><span class="para-title">$1</span></h1><div class="paracontent"> $2 </div></div>`);
        }
        rtv = rtv.replaceAll(`[-header-]`, `<div class="docheader"></div>`);
        var len8 = 0;
        while (rtv.match(/(.*?)~~(.*?)~~(.*)/gmi) != null && len8 < rtv.length) {
            rtv = rtv.replace(/(.*?)~~(.*?)~~(.*)/gmi, `$1<span class="text_stroke_through">$2</span>$3`);
            len8++
        }
        var len9 = 0;
        while (rtv.match(/(.*?)-a\|(.*?)\|a-(.*)/gmi) != null && len9 < rtv.length) {
            rtv = rtv.replace(/(.*?)-a\|(.*?)\|a-(.*)/gmi, `$1<span style="font-weight:bold;font-size:105%;">$2</span>$3`);
            len9++
        }
        var len9 = 0;
        while (rtv.match(/(.*?)'''(.*?)'''(.*)/gmi) != null && len9 < rtv.length) {
            rtv = rtv.replace(/(.*?)'''(.*?)'''(.*)/gmi, `$1<span style="font-weight:bold;">$2</span>$3`);
            len9++
        }
        var len98 = 0;
        while (rtv.match(/(.*?)''\*(.*?)\*''(.*)/gmi) != null && len98 < rtv.length) {
            rtv = rtv.replace(/(.*?)''\*(.*?)\*''(.*)/gmi, `$1<span style="font-weight:700;">$2</span>$3`);
            len98++
        }
        var len9801 = 0;
        while (rtv.match(/\{c\((.*?)\)(.*?)\};/gmi) != null && len9801 < rtv.length) {
            rtv = rtv.replace(/(.*?)\{c\((.*?)\)(.*?)\};(.*?)/gmi, `$1<span style="color:$2;">$3</span>$4`);
            len9801++;
        }
        var len98010 = 0;
        while (rtv.match(/\{bgc\((.*?)\)(.*?)\};/gmi) != null && len98010 < rtv.length) {
            rtv = rtv.replace(/(.*?)\{bgc\((.*?)\)(.*?)\};(.*?)/gmi, `$1<span style="background:$2;">$3</span>$4`);
            len98010++;
        }
        var len980 = 0;
        while (rtv.match(/(.*?)''(.*?)''(.*)/gmi) != null && len980 < rtv.length) {
            rtv = rtv.replace(/(.*?)''(.*?)''(.*)/gmi, `$1<i>$2</i>$3`);
            len980++
        }
        var len23402 = 0;
        while (rtv.match(/\.\.(.*?)\.\./gmi) != null && len23402 < rtv.length) {
            rtv = rtv.replace(/(.*?)\.\.(.*?)\.\.(.*)/gmi, `$1<span style="filter:blur(0.15625em);">$2</span>$3`);
            len23402++
        }
        var wiki_comments = rtv.match(/\[\*(.*?)\]/gmi);
        var comments_list = [];
        var commentslist = `<div class="comments-list"><hr><ul><li style="list-style-type:none;font-weight:bold;">[주석들]</li>@@list@@</ul></div>`;
        var comment_template = `<sup data-cgrshorter-action="popover" data-popover-text="@@popovercontent@@">[@@content@@]</sup>`;
        if (wiki_comments != null) {
            wiki_comments.forEach(function (val, idx, arr) {
                var popovercontent = rtv.replace(/(.*?)\[\*(.*?)\](.*)/gmi, "$2").replaceAll(`<`, `&lt;`).replaceAll(`>`, `&gt;`).replaceAll(`"`, `&quot;`).replaceAll(`'`, `&apos;`);
                var popoveridx = new String(idx);
                if (popovercontent[0] != ' ') {
                    if (!popovercontent.includes(' ')) {
                        popoveridx = popovercontent;
                    } else {
                        popoveridx = popovercontent.split(' ')[0];
                        popovercontent = popovercontent.replace(popoveridx, '');
                    }
                }
                rtv = rtv.replace(/(.*?)\[\*(.*?)\](.*)/gmi, "$1" + comment_template.replace(`@@popovercontent@@`, `주석:|a href=&quot;#comment-${popoveridx}&quot; onclick=&quot;this.parentElement.remove();document.querySelector(&apos;.body&apos;).classList.remove(&apos;shadowbody&apos;);&quot;|${popoveridx}|a| - |br|` + popovercontent).replace(`@@content@@`, popoveridx) + "$3");
                comments_list.push({ commentidx: popoveridx, content: popovercontent.replaceAll(`&lt;`, `<`).replaceAll(`&gt;`, `>`).replaceAll(`&apos;`, `'`).replaceAll(`&quot;`, `"`) });
            });
            var commentsListHTML = ``;
            comments_list.forEach(function (val, idx, arr) {
                var specialborw = (idx % 2 == 0) ? `white` : `black`;
                commentsListHTML += `<li id="comment-${val.commentidx}" class="special ${specialborw}"><span>${val.commentidx}:</span> ${val.content}</li>`;
            });
            rtv += commentslist.replace(`@@list@@`, commentsListHTML);
        }
        var len67890 = 0;
        while (rtv.match(/(.*?)\{folder\((.*?)\)\}-(.*?)-\{\/folder\};(.*)/gmi) != null && len67890 < rtv.length) {
            var content01 = rtv.replace(/(.*?)\{folder\((.*?)\)\}-(.*?)-\{\/folder\};(.*)/gmi, `$3`);
            var foldedattrhtml = ``;
            if (content01.split(`-`)[0] == 'not_folded') {
                foldedattrhtml = ` not-folded`;
            }
            rtv = rtv.replace(/(.*?)\{folder\((.*?)\)\}-(.*?)-\{\/folder\};(.*)/gmi, `$1<div class="wiki folding" ${foldedattrhtml}><p class="folding_capt folding_control"><span style="font-size:105%;font-weight:700;">$2</span></p><div class="folding_content">$3</div></div>$4`).replace(`\\-`, `-`);
            len67890++
        }


        /*var wiki_table_matches = rtv.match(/\|-\|(.*?)\|\/-\|/gmi);

        if (wiki_table_matches != null) {
            wiki_table_matches.forEach(function (val, idx, arr) {
                var tableinner = rtv.replace(/(.*?)\|-\|(.*?)\|\/-\|(.*)/gmi, "$2");
                var tableinner_row_matches = tableinner.match(/\|--\|(.*?)\|\/--\|/gmi);
                var table_made = ``;
                if (tableinner_row_matches != null) {
                    tableinner_row_matches.forEach(function (val1, idx1, arr1) {
                        var tableinner_row_colinner = val1.replace(/(.*?)\|--\|(.*?)\|\/--\|(.*)/gmi, "$2");
                        var tableinner_row_col_matches = tableinner_row_colinner.match(/\|---\|(.*?)\|---\|/gmi);
                        var table_row_made = ``;
                        if (tableinner_row_col_matches != null) {
                            tableinner_row_col_matches.forEach(function (val2, idx2, arr2) {
                                var table_col_made = val2.replace(/(.*?)\|---\|(.*?)\|---\|(.*)/gmi, `<td class="wiki wiki_table_col">$2</td>`);
                                table_row_made += table_col_made;
                            });
                        } else {
                            table_row_made += `<td class="wiki wiki_table_col"></td>`;
                        }
                        table_row_made = `<tr class="wiki wiki_table_row">${table_row_made}</tr>`;
                        table_made += table_row_made;
                    });
                } else {
                    table_made += `<table class="wiki wiki_table_row"><div class="wiki wiki_table_col"></div></table>`;
                }
                table_made = `<table class="wiki wiki_table">${table_made}</table>`;
                rtv = rtv.replace(/(.*?)\|-\|(.*?)\|\/-\|(.*)/gmi, table_made);
            });
        }*/
        var wiki_table_matches = rtv.match(/\|-\|(.*?)\|\/-\|/gmi);
        var len7777 = 0;
        if (wiki_table_matches != null) {
            while (rtv.match(/\|-\|(.*?)\|\/-\|/gmi) != null && len7777 < rtv.length) {
                var rtv2x34 = rtv.replace(/(.*?)\|-\|(.*?)\|\/-\|(.*)/gmi, `<table>$2</table>`);
                if (rtv2x34.match(/<table>\|bg=(.*?)\|/gmi) != null) {
                    rtv2x34 = rtv2x34.replace(/(.*?)<table>\|bg=(.*?)\|(.*)/gmi, `$1<table style="background:$2;">$3`);
                }
                if (rtv2x34.match(/<table>\|colour=(.*?)\|/gmi) != null) {
                    rtv2x34 = rtv2x34.replace(/(.*?)<table>\|colour=(.*?)\|(.*)/gmi, `$1<table style="color:$2;">$3`);
                }
                if (rtv2x34.match(/<table style="(.*?)">\|colour=(.*?)\|/gmi) != null) {
                    rtv2x34 = rtv2x34.replace(/(.*?)<table style="(.*?)">\|colour=(.*?)\|(.*)/gmi, `$1<table style="$2color:$3;">$4`);
                }
                var tableborder = ``;
                if (rtv2x34.match(/\|border=(.*?)\|/gmi)) {
                    tableborder = rtv2x34.replace(/(.*?)\|border=(.*?)\|(.*)/gmi, `$2`);
                    tableborder = `border:1px solid ` + tableborder + `;`;
                    rtv2x34 = rtv2x34.replace(/(.*?)\|border=(.*?)\|(.*)/gmi, `$1$3`);
                }
                var rtv2safd34 = rtv2x34.match(/\|--\|/gmi);
                var rtv2sadd34 = rtv2x34.match(/\|\/--\|/gmi);
                if (rtv2safd34 != null && rtv2sadd34 != null) {
                    if (rtv2safd34.length == rtv2sadd34.length) {
                        rtv2x34 = rtv2x34.replaceAll(/\|--\|/gmi, `<tr>`).replaceAll(/\|\/--\|/gmi, `</tr>`);
                        var matches2 = rtv2x34.match(/<tr>(.*?)<\/tr>/gmi);
                        var tdmatches0 = rtv2x34.match(/\|---\|/gmi);
                        var tdmatches1 = rtv2x34.match(/\|\/---\|/gmi);
                        if (tdmatches0 != null && tdmatches1 != null) {
                            if (tdmatches0.length == tdmatches1.length) {
                                rtv2x34 = rtv2x34.replaceAll(/\|---\|/gmi, `<td>`).replaceAll(/\|\/---\|/gmi, `</td>`);
                                for (var i898989 = 0; i898989 < tdmatches0.length; i898989++) {


                                    rtv2x34 = rtv2x34.replaceAll(/(.*?)<td>\|width=([0123456789]+)\|(.*)/gmi, `$1<td colspan="$2">$3`);
                                    console.log(rtv2x34);
                                    rtv2x34 = rtv2x34.replace(/(.*?)<td colspan="(.*?)">\|bg=(.*?)\|(.*)/gmi, `$1<td colspan="$2" style="background:$3;${tableborder}">$4`);
                                    rtv2x34 = rtv2x34.replace(/(.*?)<td colspan="(.*?)">\|colour=(.*?)\|(.*)/gmi, `$1<td colspan="$2" style="color:$3;${tableborder}">$4`);
                                    console.log(rtv2x34);
                                    rtv2x34 = rtv2x34.replace(/(.*?)<td colspan="(.*?)" style="(.*?)">\|colour=(.*?)\|(.*)/gmi, `$1<td colspan="$2" style="$3color:$4;">$5`);
                                    rtv2x34 = rtv2x34.replace(/(.*?)<td>\|bg=(.*?)\|(.*)/gmi, `$1<td style="background:$2;${tableborder}">$3`);

                                    rtv2x34 = rtv2x34.replace(/(.*?)<td>\|colour=(.*?)\|(.*)/gmi, `$1<td style="color:$2;${tableborder}">$3`);

                                    rtv2x34 = rtv2x34.replace(/(.*?)<td style="(.*?)">\|colour=(.*?)\|(.*)/gmi, `$1<td style="$2color:$3;">$4`);

                                }
                            }
                        }

                    }
                }
                rtv2x34 = rtv2x34.replace(/(.*?)style="(.*?)" style="(.*?)"(.*)/gmi, `$1style="$2$3"$4`);
                if (tableborder != '' && rtv2x34.match(/<td/gmi) != null) {
                    var len676767 = rtv2x34.match(/<td/gmi).length;
                    rtv2x34 = rtv2x34.replaceAll(/(.*?)<td style="(.*?)">(.*)/gmi, `$1<td style="$2${tableborder}">$3`)
                        .replaceAll(/(.*?)<td>(.*)/gmi, `$1<td style="${tableborder}">$2`)
                        .replaceAll(/(.*?)<td colspan="(.*?)">(.*)/gmi, `$1<td colspan="$2" style="${tableborder}">$3`)
                        .replaceAll(/(.*?)<td colspan="(.*?)" style="(.*?)">(.*)/gmi, `$1<td colspan="$2" style="$3${tableborder}">$4`);
                    for (var i78782 = 0; i78782 < len676767; i78782++) {

                        rtv2x34 = rtv2x34.replace(/(.*?)<td>(.*)/gmi, `$1<td style="${tableborder}">$2`);

                        rtv2x34 = rtv2x34.replace(/(.*?)<td colspan="(.*?)" style="(.*?)">(.*)/gmi, `$1<td colspan="$2" style="$3${tableborder}">$4`);

                        rtv2x34 = rtv2x34.replace(/(.*?)<td colspan="(.*?)">(.*)/gmi, `$1<td colspan="$2" style="${tableborder}">$3`);
                        rtv2x34 = rtv2x34.replace(/(.*?)<td style="(.*?)">(.*)/gmi, `$1<td style="$2${tableborder}">$3`);


                    }
                }

                rtv = rtv.replace(/(.*?)\|-\|(.*?)\|\/-\|(.*)/gmi, `$1` + rtv2x34 + `$3`);

                len7777++;
            }
        }
        var video_matches = rtv.match(/\{video\((.*?)\)\}\|width=(.*?);/gmi);
        var len73 = 0;
        if (video_matches != null) {
            while (rtv.match(/\{video\((.*?)\)\}\|width=(.*?);/gmi) != null && len73 < rtv.length) {
                rtv = rtv.replace(/(.*?)\{video\((.*?)\)\}\|width=(.*?);(.*)/gmi, `$1<video src="$2" width="$3" controls></video>$4`);
                len73++
            }
        }
        var frame_matches = rtv.match(/\{youtube\((.*?)\)\((.*?)\)\};/gmi);
        var len83333 = 0;
        if (frame_matches != null) {
            while (rtv.match(/\{youtube\((.*?)\)\((.*?)\)\};/gmi) != null && len83333 < rtv.length) {
                var ytb_v_url = ``;
                if (!rtv.replace(/(.*?)\{youtube\((.*?)\)\((.*?)\)\};(.*)/gmi, `$2`).startsWith(`https://`) && !rtv.replace(/(.*?)\{youtube\((.*?)\)\((.*?)\)\};(.*)/gmi, `$2`).startsWith(`http://`) && !rtv.replace(/(.*?)\{youtube\((.*?)\)\((.*?)\)\};(.*)/gmi, `$2`).startsWith(`./`) && !rtv.replace(/(.*?)\{youtube\((.*?)\)\((.*?)\)\};(.*)/gmi, `$2`).startsWith(`/`) && !rtv.replace(/(.*?)\{youtube\((.*?)\)\((.*?)\)\};(.*)/gmi, `$2`).startsWith(`data:`)) {
                    ytb_v_url = `https://www.youtube.com/embed/`;
                }
                var iframeattrs = rtv.replace(/(.*?)\{youtube\((.*?)\)\((.*?)\)\};(.*)/gmi, `$3`);
                rtv = rtv.replace(/(.*?)\{youtube\((.*?)\)\((.*?)\)\};(.*)/gmi, `$1<iframe src="${ytb_v_url}$2" ${iframeattrs}></iframe>$4`);
                len83333++
            }
        }
        /*var wiki_list_ul_matches = rtv.match(/_\*_(.*?)\/\//gmi);
        var wiki_list_html = ``;
        if (wiki_list_ul_matches != null) {
            wiki_list_ul_matches.forEach(function (val, idx, arr) {
                if (arr.length == 1) {
                    rtv = rtv.replace(/(.*?)_\*_(.*?)\/\/(.*)/gmi, `$1<ul><li>$2</li></ul>$3`);
                    return;
                }
                if (!(rtv.replace(/(.*?)_\*_(.*?)\/\/(.*)/gmi, "$1").replaceAll(` `, ``).endsWith(`</li>`))) {
                    rtv = rtv.replace(/(.*?)_\*_(.*?)\/\/(.*)/gmi, `$1<ul><li>$2</li>$3`);
                } else if (!(rtv.replace(/(.*?)_\*_(.*?)\/\/(.*)/gmi, "$3").replaceAll(` `, ``).startsWith(`_*_`, 0))) {
                    rtv = rtv.replace(/(.*?)_\*_(.*?)\/\/(.*)/gmi, `$1<li>$2</li></ul>$3`);
                } else {
                    rtv = rtv.replace(/(.*?)_\*_(.*?)\/\/(.*)/gmi, `$1<li>$2</li>$3`);
                }
            });
        }*/
        var wiki_list_ul3_2_matches = rtv.match(/\|\*\*\*(.*?)\/\*\*\*\|/gmi);
        if (wiki_list_ul3_2_matches != null) {
            wiki_list_ul3_2_matches.forEach(function (val, idx, arr) {
                if (arr.length == 1) {
                    rtv = rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, `$1<ul><li>$2</li></ul>$3`);
                    return;
                }
                if (!(rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, `$1`).replaceAll(' ', '').endsWith(`</li>`)) && !(rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, "$3").replaceAll(` `, ``).startsWith(`|*`) && rtv.replace(rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, `$1|*$2/*|`), '').replaceAll(` `, ``).startsWith(`|*`))) {
                    rtv = rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, `$1<ul><li>$2</li></ul>$3`);
                } else if (!(rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, "$1").replaceAll(` `, ``).endsWith(`</li>`))) {
                    rtv = rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, `$1<ul><li>$2</li>$3`);
                } else if (!(rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, "$3").replaceAll(` `, ``).startsWith(`|*`) && rtv.replace(rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, `$1|*$2/*|`), '').replaceAll(` `, ``).startsWith(`|*`))) {
                    var specrtv1 = rtv.replace(rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, `$1|*$2/*|`), '');
                    console.log(specrtv1);
                    rtv = rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, `$1<li>$2</li></ul>${specrtv1}`);
                } else {
                    rtv = rtv.replace(/(.*?)\|\*\*\*(.*?)\/\*\*\*\|(.*)/gmi, `$1<li>$2</li>$3`);
                }
            });
        }
        var wiki_list_ul3_1_matches = rtv.match(/\|\*\*(.*?)\/\*\*\|/gmi);
        if (wiki_list_ul3_1_matches != null) {
            wiki_list_ul3_1_matches.forEach(function (val, idx, arr) {
                if (arr.length == 1) {
                    rtv = rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, `$1<ul><li>$2</li></ul>$3`);
                    return;
                }
                if (!(rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, `$1`).replaceAll(' ', '').endsWith(`</li>`)) && !(rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, "$3").replaceAll(` `, ``).startsWith(`|*`) && rtv.replace(rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, `$1|*$2/*|`), '').replaceAll(` `, ``).startsWith(`|*`))) {
                    rtv = rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, `$1<ul><li>$2</li></ul>$3`);
                } else if (!(rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, "$1").replaceAll(` `, ``).endsWith(`</li>`))) {
                    rtv = rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, `$1<ul><li>$2</li>$3`);
                } else if (!(rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, "$3").replaceAll(` `, ``).startsWith(`|*`) && rtv.replace(rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, `$1|*$2/*|`), '').replaceAll(` `, ``).startsWith(`|*`))) {
                    var specrtv1 = rtv.replace(rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, `$1|*$2/*|`), '');
                    console.log(specrtv1);
                    rtv = rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, `$1<li>$2</li></ul>${specrtv1}`);
                } else {
                    rtv = rtv.replace(/(.*?)\|\*\*(.*?)\/\*\*\|(.*)/gmi, `$1<li>$2</li>$3`);
                }
            });
        }
        var wiki_list_ul3_matches = rtv.match(/\|\*(.*?)\/\*\|/gmi);
        if (wiki_list_ul3_matches != null) {
            wiki_list_ul3_matches.forEach(function (val, idx, arr) {
                if (arr.length == 1) {
                    rtv = rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1<ul><li>$2</li></ul>$3`);
                    return;
                }
                //var specrtv2 = rtv.replace(rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `|*$2/*|$3`), '');
                //console.log(specrtv2);
                if (!(rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1`).replaceAll(' ', '').endsWith(`</li>`)) && !(rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, "$3").replaceAll(` `, ``).startsWith(`|*`) && rtv.replace(rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1|*$2/*|`), '').replaceAll(` `, ``).startsWith(`|*`))) {
                    rtv = rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1<ul><li>$2</li></ul>$3`);
                } else if (!(rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, "$1").replaceAll(` `, ``).endsWith(`</li>`))) {
                    rtv = rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1<ul><li>$2</li>$3`);
                } else if (!(rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, "$3").replaceAll(` `, ``).startsWith(`|*`) && rtv.replace(rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1|*$2/*|`), '').replaceAll(` `, ``).startsWith(`|*`))) {
                    //rtv = rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1<li>$2</li></ul>$3`);
                    var specrtv1 = rtv.replace(rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1|*$2/*|`), '');
                    console.log(specrtv1);
                    rtv = rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1<li>$2</li></ul>${specrtv1}`);
                } else {
                    rtv = rtv.replace(/(.*?)\|\*(.*?)\/\*\|(.*)/gmi, `$1<li>$2</li>$3`);
                }
            });
        }
        var wiki_list_ul2_matches = rtv.match(/_\*_(.*?)_\/\*_/gmi);
        if (wiki_list_ul2_matches != null) {
            wiki_list_ul2_matches.forEach(function (val, idx, arr) {
                if (arr.length == 1) {
                    rtv = rtv.replace(/(.*?)_\*_(.*?)_\/\*_(.*)/gmi, `$1<ul><li>$2</li></ul>$3`);
                    return;
                }
                if (!(rtv.replace(/(.*?)_\*_(.*?)_\/\*_(.*)/gmi, "$1").replaceAll(` `, ``).endsWith(`</li>`))) {
                    rtv = rtv.replace(/(.*?)_\*_(.*?)_\/\*_(.*)/gmi, `$1<ul><li>$2</li>$3`);
                } else if (!(rtv.replace(/(.*?)_\*_(.*?)_\/\*_(.*)/gmi, "$3").replaceAll(` `, ``).startsWith(`_*_`, 0))) {
                    rtv = rtv.replace(/(.*?)_\*_(.*?)_\/\*_(.*)/gmi, `$1<li>$2</li></ul>$3`);
                } else {
                    rtv = rtv.replace(/(.*?)_\*_(.*?)_\/\*_(.*)/gmi, `$1<li>$2</li>$3`);
                }
            });
        }
        nowikis.forEach(function (val, idx, arr) {
            nowikis[idx] = val.replaceAll(`<`, `&lt;`).replaceAll(`>`, `&gt;`);
        });
        return { rtv: rtv, nowiki: nowikis };
    }
});
