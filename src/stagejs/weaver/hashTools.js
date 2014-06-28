define( function () {
    var hashTools = {
        stringHash: function (str) {
            var hash = 0, i, chr, len;
            if (str.length === 0) return hash;
            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        },

        toString: function (object,cache) {

            if (typeof(object) != "object")
                return String(object);
            var cache = [];
            var buffer = [];
            for (var att in object) {
                buffer.push(att);
                buffer.push(this.toString(object[att]));
            }
            return buffer.join("");
        },

        objectHash: function (object) {
            var cache=[];
            return this.stringHash(this.toString(object,cache));
        }
    }
    return hashTools;
});