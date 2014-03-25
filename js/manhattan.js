(function (window) {
    var Manhattan = function () {
        this.getDistance = function (a, b) {
            return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
        };
    };
}(window));