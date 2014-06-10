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

        toString: function (object) {
            if (typeof(object) != "object")
                return String(object);
            var buffer = [];
            for (var att in object) {
                buffer.push(att);
                buffer.push(this.toString(object[att]));
            }
            return buffer.join("");
        },

        objectHash: function (object) {
            return this.stringHash(this.toString(object));
        }
    }
    return hashTools;
});