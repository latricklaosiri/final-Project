(function (b) {
    var a = {}, e = b.c_ || {};
    a.publish = function (f, c) {
        for (var a = e[f], d = a ? a.length : 0; d--;) {
            a[d].apply(b, c || [])
        }
    };
    a.subscribe = function (a, c) {
        e[a] || (e[a] = []);
        e[a].push(c);
        return [a, c]
    }; 
    a.unsubscribe = function (a, c) { 
        var b = e[c ? a : a[0]]; c = c || a[1]; 
        for (var d = b ? b.length : 0; d--;)b[d] === c && b.splice(d, 1) 
    }; 

    "object" === typeof module && module.exports ? module.exports = exports = a : "function" === typeof define && define.amd ? define(function () { return a }) : "object" === typeof b && (b.publish = a.publish, b.subscribe = a.subscribe, b.unsubscribe =
        a.unsubscribe)
})(this.window);