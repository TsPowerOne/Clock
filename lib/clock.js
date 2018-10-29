"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@tspower/core");
var rxjs_1 = require("rxjs");
var Clock = /** @class */ (function () {
    function Clock(root, Id, Class, Style) {
        var _this = this;
        this.root = root;
        this.Id = Id;
        this.Class = Class;
        this.Style = Style;
        this.interval = 1000;
        this.sec = 0;
        this.min = 0;
        this.ore = 0;
        this.secs = 0;
        this.CountDown = false;
        this.tick = new rxjs_1.Subject();
        this.endtime = new rxjs_1.Subject();
        this.started = new rxjs_1.Subject();
        this.stopped = new rxjs_1.Subject();
        this.endtime$ = this.endtime.asObservable();
        this.started$ = this.started.asObservable();
        this.stopped$ = this.stopped.asObservable();
        this.tick$ = this.tick.asObservable();
        this.Init = function () {
            if (_this.Id != null)
                _this.node.setAttribute("id", _this.Id);
            if (_this.Class != null)
                _this.node.setAttribute("class", _this.Class);
            if (_this.Style != null)
                _this.node.setAttribute("style", _this.Style);
            _this.tick$.subscribe(function (val) {
                (_this.CountDown) ? _this.secs-- : _this.secs++;
                var conv = _this.secToTimeFormat(_this.secs);
                _this.ore = conv.ore_i;
                _this.min = conv.min_i;
                _this.sec = conv.sec_i;
                _this.setClock(conv.ore_s, conv.min_s, conv.sec_s);
                if (_this.sec == 0 && _this.min == 0 && _this.ore == 0) {
                    _this.stop();
                    _this.endtime.next();
                }
            });
        };
        this.start = function () {
            var that = _this;
            _this.timer = setInterval(function (event) {
                that.tick.next(that.interval);
            }, that.interval);
            _this.started.next();
        };
        this.stop = function () {
            clearInterval(_this.timer);
            _this.stopped.next(_this.secs);
        };
        this.setCountDown = function (ore, minuti, secondi) {
            _this.secs = ore * 3600 + minuti * 60 + secondi;
            _this.ore = ore;
            _this.min = minuti;
            _this.sec = secondi;
            var conv = _this.secToTimeFormat(_this.secs);
            _this.setClock(conv.ore_s, conv.min_s, conv.sec_s);
            _this.CountDown = true;
        };
        this.secToTimeFormat = function (sec) {
            var o = Math.floor(sec / 3600);
            var m = Math.floor(sec % 3600 / 60);
            var s = Math.floor(sec % 3600 % 60);
            var O = o.toString();
            var M = m.toString();
            var S = s.toString();
            O = (O.length == 1) ? "0" + O : O;
            M = (M.length == 1) ? "0" + M : M;
            S = (S.length == 1) ? "0" + S : S;
            var res = {
                ore_s: O,
                min_s: M,
                sec_s: S,
                ore_i: o,
                min_i: m,
                sec_i: s
            };
            return res;
        };
        this.node = document.createElement("span");
        this.root.appendChild(this.node);
        this.Init();
    }
    Clock.prototype.setClock = function (ore, minuti, secondi) {
        core_1.empty(this.node);
        this.time = ore + ":" + minuti + ":" + secondi;
        var txt = document.createTextNode(this.time);
        this.node.appendChild(txt);
    };
    return Clock;
}());
exports.Clock = Clock;
