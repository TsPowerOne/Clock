export declare class Clock {
    private root;
    private node;
    private interval;
    private timer;
    private sec;
    private min;
    private ore;
    private secs;
    private CountDown;
    private tick;
    private endtime;
    private started;
    private stopped;
    endtime$: import("rxjs/internal/Observable").Observable<any>;
    started$: import("rxjs/internal/Observable").Observable<any>;
    stopped$: import("rxjs/internal/Observable").Observable<any>;
    tick$: import("rxjs/internal/Observable").Observable<any>;
    time: string;
    constructor(root: HTMLElement);
    Init: () => void;
    start: () => void;
    stop: () => void;
    setCountDown: (ore: number, minuti: number, secondi: number) => void;
    private setClock;
    private secToTimeFormat;
}
