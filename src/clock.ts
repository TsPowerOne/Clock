import { empty, log } from '@tspower/core';
import { Subject } from 'rxjs';
export class Clock {
    private node: HTMLElement;
    private interval: number = 1000;
    private timer;
    private sec: number = 0;
    private min: number = 0;
    private ore: number = 0;
    private secs: number = 0;
    private CountDown: boolean = false;

    private tick = new Subject<any>();
    private endtime = new Subject<any>();
    private started = new Subject<any>();
    private stopped = new Subject<any>();

    public endtime$ = this.endtime.asObservable();
    public started$ = this.started.asObservable();
    public stopped$ = this.stopped.asObservable();

    public tick$ = this.tick.asObservable();

    public time: string;
    
    constructor(private root: HTMLElement, private Id?:string, private Class?:string, private Style?:string) {
        this.node = document.createElement("span");
        this.root.appendChild(this.node);
        this.Init();
    }
    Init = () => {

        if(this.Id!=null)this.node.setAttribute("id", this.Id);
        if(this.Class!=null)this.node.setAttribute("class", this.Class);
        if(this.Style!=null)this.node.setAttribute("style", this.Style);

        this.tick$.subscribe(val => {

            (this.CountDown)? this.secs--: this.secs++;

            let conv = this.secToTimeFormat(this.secs);
            this.ore = conv.ore_i;
            this.min = conv.min_i;
            this.sec = conv.sec_i;

            this.setClock(conv.ore_s, conv.min_s, conv.sec_s);

            if (this.sec == 0 && this.min == 0 && this.ore == 0) {
                this.stop();
                this.endtime.next();
            }
        });
    }
    start = () => {
        let that = this;
        this.timer = setInterval((event) => {
            that.tick.next(that.interval);
        }, that.interval);
        this.started.next();
    }
    stop = () => {
        clearInterval(this.timer);
        this.stopped.next(this.secs);
    }
    setCountDown = (ore: number, minuti: number, secondi: number) => {
        this.secs = ore * 3600 + minuti * 60 + secondi;
        this.ore = ore;
        this.min = minuti;
        this.sec = secondi;
        let conv = this.secToTimeFormat(this.secs);
        this.setClock(conv.ore_s, conv.min_s, conv.sec_s);
        this.CountDown = true;
    }

    private setClock(ore: string, minuti: string, secondi: string) {
        empty(this.node);
        this.time = `${ore}:${minuti}:${secondi}`;
        let txt = document.createTextNode(this.time);
        this.node.appendChild(txt);
    }

    private secToTimeFormat = (sec: number): any => {
        let o: number = Math.floor(sec / 3600);
        let m: number = Math.floor(sec % 3600 / 60);
        let s: number = Math.floor(sec % 3600 % 60);

        let O: string = o.toString();
        let M: string = m.toString();
        let S: string = s.toString();

        O = (O.length == 1) ? `0${O}` : O;
        M = (M.length == 1) ? `0${M}` : M;
        S = (S.length == 1) ? `0${S}` : S;
        let res = {
            ore_s: O,
            min_s: M,
            sec_s: S,
            ore_i: o,
            min_i: m,
            sec_i: s
        };
        return res;

    }

}