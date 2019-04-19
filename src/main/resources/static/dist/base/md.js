define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by sharklite on 2015/9/24 0024.
     */
    function hex_md(s) {
        s = MD5CodeMaker.hex_md5(s);
        return MD5CodeMaker.hex_md5(s);
    }
    exports.hex_md = hex_md;
    class MD5CodeMaker {
        /* bits per input character. 8 - ASCII; 16 - Unicode      */
        /*
         * These are thestatics you'll usually want to call
         * They take string arguments and return either hex or base-64 encoded strings
         */
        static hex_md5(s) {
            return MD5CodeMaker.binl2hex(MD5CodeMaker.core_md5(MD5CodeMaker.str2binl(s), s.length * MD5CodeMaker.chrsz));
        }
        /*
         * Calculate the MD5 of an array of little-endian words, and a bit length
         */
        static core_md5(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            let a = 1732584193;
            let b = -271733879;
            let c = -1732584194;
            let d = 271733878;
            for (let i = 0; i < x.length; i += 16) {
                let olda = a;
                let oldb = b;
                let oldc = c;
                let oldd = d;
                a = MD5CodeMaker.md5_ff(a, b, c, d, x[i], 7, -680876936);
                d = MD5CodeMaker.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = MD5CodeMaker.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = MD5CodeMaker.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = MD5CodeMaker.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = MD5CodeMaker.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = MD5CodeMaker.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = MD5CodeMaker.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = MD5CodeMaker.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = MD5CodeMaker.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = MD5CodeMaker.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = MD5CodeMaker.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = MD5CodeMaker.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = MD5CodeMaker.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = MD5CodeMaker.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = MD5CodeMaker.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = MD5CodeMaker.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = MD5CodeMaker.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = MD5CodeMaker.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = MD5CodeMaker.md5_gg(b, c, d, a, x[i], 20, -373897302);
                a = MD5CodeMaker.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = MD5CodeMaker.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = MD5CodeMaker.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = MD5CodeMaker.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = MD5CodeMaker.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = MD5CodeMaker.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = MD5CodeMaker.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = MD5CodeMaker.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = MD5CodeMaker.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = MD5CodeMaker.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = MD5CodeMaker.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = MD5CodeMaker.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = MD5CodeMaker.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = MD5CodeMaker.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = MD5CodeMaker.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = MD5CodeMaker.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = MD5CodeMaker.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = MD5CodeMaker.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = MD5CodeMaker.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = MD5CodeMaker.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = MD5CodeMaker.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = MD5CodeMaker.md5_hh(d, a, b, c, x[i], 11, -358537222);
                c = MD5CodeMaker.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = MD5CodeMaker.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = MD5CodeMaker.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = MD5CodeMaker.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = MD5CodeMaker.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = MD5CodeMaker.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = MD5CodeMaker.md5_ii(a, b, c, d, x[i], 6, -198630844);
                d = MD5CodeMaker.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = MD5CodeMaker.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = MD5CodeMaker.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = MD5CodeMaker.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = MD5CodeMaker.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = MD5CodeMaker.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = MD5CodeMaker.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = MD5CodeMaker.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = MD5CodeMaker.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = MD5CodeMaker.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = MD5CodeMaker.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = MD5CodeMaker.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = MD5CodeMaker.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = MD5CodeMaker.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = MD5CodeMaker.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = MD5CodeMaker.safe_add(a, olda);
                b = MD5CodeMaker.safe_add(b, oldb);
                c = MD5CodeMaker.safe_add(c, oldc);
                d = MD5CodeMaker.safe_add(d, oldd);
            }
            return Array(a, b, c, d);
        }
        /*
         * Thesestatics implement the four basic operations the algorithm uses.
         */
        static md5_cmn(q, a, b, x, s, t) {
            return MD5CodeMaker.safe_add(MD5CodeMaker.bit_rol(MD5CodeMaker.safe_add(MD5CodeMaker.safe_add(a, q), MD5CodeMaker.safe_add(x, t)), s), b);
        }
        static md5_ff(a, b, c, d, x, s, t) {
            return MD5CodeMaker.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        static md5_gg(a, b, c, d, x, s, t) {
            return MD5CodeMaker.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        static md5_hh(a, b, c, d, x, s, t) {
            return MD5CodeMaker.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }
        static md5_ii(a, b, c, d, x, s, t) {
            return MD5CodeMaker.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }
        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        static safe_add(x, y) {
            let lsw = (x & 0xFFFF) + (y & 0xFFFF);
            let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
        /*
         * Bitwise rotate a 32-bit number to the left.
         */
        static bit_rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }
        /*
         * Convert a string to an array of little-endian words
         * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
         */
        static str2binl(str) {
            let bin = new Array();
            let mask = (1 << MD5CodeMaker.chrsz) - 1;
            for (let i = 0; i < str.length * MD5CodeMaker.chrsz; i += MD5CodeMaker.chrsz)
                bin[i >> 5] |= (str.charCodeAt(i / MD5CodeMaker.chrsz) & mask) << (i % 32);
            return bin;
        }
        /*
         * Convert an array of little-endian words to a hex string.
         */
        static binl2hex(binarray) {
            let hex_tab = MD5CodeMaker.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            let str = "";
            for (let i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                    hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
            }
            return str;
        }
    }
    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
    MD5CodeMaker.hexcase = 0;
    /* hex output format. 0 - lowercase; 1 - uppercase        */
    MD5CodeMaker.chrsz = 8;
});
//# sourceMappingURL=md.js.map