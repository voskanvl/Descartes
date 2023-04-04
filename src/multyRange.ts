type OptionsType = Partial<{
    containerClass: string;
    rangeRails: string;
    rangeTrack: string;
    inputMin: string;
    inputMax: string;
}>;

type ListenerType = (min: number, max: number) => void;

const InitialOptions: Required<OptionsType> = {
    containerClass: "container",
    rangeRails: "range-rails",
    rangeTrack: "range-track",
    inputMin: "range--min",
    inputMax: "range--max",
};

const style = (opt: OptionsType) => `
        .${opt.containerClass} {
            position: relative;
            width: 100%;
            padding-top: 1em;
          }

          input[type=range] {
            -webkit-appearance: none;
            appearance: none;
          }

          .range {
            pointer-events: none;
            position: absolute;
            height: 0px;
            width: 100%;
            outline: none;
            top: 0px;
          }
          .range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            background-color: #656565;
            border: none;
            border-radius: 50%;
            box-shadow: 0 0 1px 1px #ced4da;
            cursor: pointer;
            height: 18px;
            width: 18px;
            margin-top: 4px;
            pointer-events: all;
            position: relative;
          }
          
          .${opt.rangeTrack}, .${opt.rangeRails} {
            position: absolute;
            height: 3px;
            background: #656565;
            top: 1px;
            left: 4px;
            width: calc(100% - 4px);
          }
          
          .${opt.rangeRails} {
            top: 2px;
            height: 1px;
            background: #656565;
          }        
        `;
export default class MultyRange {
    private root;
    private options: OptionsType = InitialOptions;
    private container: HTMLElement = document.createElement("div");
    private rangeRails: HTMLElement = document.createElement("div");
    private rangeTrack: HTMLElement = document.createElement("div");
    private inputMin: HTMLInputElement = document.createElement("input");
    private inputMax: HTMLInputElement = document.createElement("input");
    private min: number = 0;
    private max: number = 100;
    private width: number = 100;
    private _currentMin: number = 0;
    private _currentMax: number = 100;
    private listeners: ListenerType[] = [];
    private delta = 5;

    private initMin = 0;
    private initMax = 100;
    private initWidth = 100;

    constructor(
        root: HTMLElement,
        options: OptionsType = InitialOptions,
        applyDefaultStyle = true,
    ) {
        this.root = root;
        this.options = { ...InitialOptions, ...options };
        this.root.innerHTML = "";
        const styleEl = document.createElement("style");
        styleEl.append(style(this.options));
        if (applyDefaultStyle) this.root.append(styleEl);
        this.root.append(this.createBasicSchema());
    }

    private createDiv(className: string, optionName: keyof OptionsType): HTMLDivElement {
        const el = document.createElement("div");
        el.classList.add((this.options && this.options[optionName]) || className);
        return el;
    }
    private createInput(className: string, optionName: keyof OptionsType): HTMLInputElement {
        const el = document.createElement("input");
        el.classList.add("range");
        el.classList.add((this.options && this.options[optionName]) || className);
        el.type = "range";
        el.max = "100";
        el.min = "0";
        return el;
    }
    private createBasicSchema(): HTMLElement {
        this.container = this.createDiv(
            this.options.containerClass || InitialOptions.containerClass,
            "containerClass",
        );
        this.rangeRails = this.createDiv(
            this.options.rangeRails || InitialOptions.rangeRails,
            "rangeRails",
        );
        this.rangeTrack = this.createDiv(
            this.options.rangeTrack || InitialOptions.rangeTrack,
            "rangeTrack",
        );
        this.inputMin = this.createInput(
            this.options.inputMin || InitialOptions.inputMin,
            "inputMin",
        );
        this.inputMax = this.createInput(
            this.options.inputMax || InitialOptions.inputMax,
            "inputMax",
        );

        this.inputMin.value = "0";
        this.inputMax.value = "100";
        this.container.append(this.rangeRails, this.rangeTrack, this.inputMin, this.inputMax);

        this.inputMin.addEventListener("input", (event: Event) => {
            let { value } = event.target as HTMLInputElement;
            if (+value >= this._currentMax - this.delta) {
                setTimeout(() => {
                    (event.target as HTMLInputElement).value = this._currentMax - this.delta + "";
                    this.recalcRangeTrack();
                });
                return;
            }
            this.currentMin = +value;
            this.recalcRangeTrack();
        });
        this.inputMax.addEventListener("input", (event: Event) => {
            let { value } = event.target as HTMLInputElement;
            if (+value <= this._currentMin + this.delta) {
                setTimeout(() => {
                    (event.target as HTMLInputElement).value = this._currentMin + this.delta + "";
                    this.recalcRangeTrack();
                });
                return;
            }
            this.currentMax = +value;
            this.recalcRangeTrack();
        });

        return this.container;
    }

    private recalcRangeTrack() {
        this.rangeTrack.style.left = (this._currentMin / this.width) * 100 + 2 + "%";
        this.rangeTrack.style.width = `${this._currentMax - this.currentMin - 2}%`;
    }

    subscribe(cb: ListenerType) {
        this.listeners.push(cb);
    }
    unsubscribe(cb: ListenerType) {
        this.listeners = this.listeners.filter(e => e !== cb);
    }

    get currentMin() {
        return this._currentMin;
    }
    private set currentMin(x: number) {
        this._currentMin = x;
        this.listeners.forEach(e => e(this._currentMin, this._currentMax));
        this.inputMin.value = this._currentMin + "";
        this.recalcRangeTrack();
    }
    public get valueMin() {
        return this.initMin + (this.initWidth * this._currentMin) / 100;
    }
    public set valueMin(x: number) {
        this.currentMin = ((x - this.initMin) / this.initWidth) * 100;
    }
    get currentMax() {
        return this._currentMax;
    }
    public get valueMax() {
        return this.initMin + (this.initWidth * this._currentMax) / 100;
    }
    private set currentMax(x: number) {
        this._currentMax = x;
        this.listeners.forEach(e => e(this._currentMin, this._currentMax));
        this.inputMax.value = this._currentMax + "";
        this.recalcRangeTrack();
    }
    public set valueMax(x: number) {
        this.currentMax = ((x - this.initMin) / this.initWidth) * 100;
    }
    connectInputs(inputMin: HTMLInputElement | null, inputMax: HTMLInputElement | null) {
        const initMin = (inputMin && +inputMin.value) || 0;
        const initMax = (inputMax && +inputMax.value) || 100;
        const width = initMax - initMin;
        this.initMin = initMin;
        this.initMax = initMax;
        this.initWidth = width;
        this.subscribe((min, max) => {
            inputMin && (inputMin.value = String((initMin + (min / 100) * width) | 0));
            inputMax && (inputMax.value = String((initMin + (max / 100) * width) | 0));
        });
        return this;
    }
}
