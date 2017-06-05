(function () {
    const VERSION = '1.0.0'
    const NAME = 'EyeView'
    const EYE_SETTING = {
        width: 200,
        height: 100,
        cls: 'EV-eye',
        visibleEyeCls: 'visible-eye'
    }

    const AddEvent = (function () {
        if (document.addEventListener) {
            return (el, type, fn) => {
                el.addEventListener(type, fn, false);
            };
        } else {
            return (el, type, fn) => {
                el.attachEvent('on' + type, () => {
                    return fn.call(el, window.event);
                });
            }
        }
    })();

    class EyeView {
        constructor(options) {
            this.grapWrapEl = options.el
            this.type = options.type
            this._init()
        }

        _init() {
            this._initEyeDom()
            this._initVisibleDom()
            this._cuntScale()
            this._bindEvent()
        }

        //鹰眼结构初始化
        _initEyeDom() {
            let eyeEl = document.createElement("div")
            eyeEl.className = EYE_SETTING.cls
            this.eyeEl = eyeEl
            this._initEyeContent();
            this.grapWrapEl.appendChild(this.eyeEl);
        }

        //鹰眼内容初始
        _initEyeContent() {
            if (this.type === "svg") {
                this.eyeEl.innerHTML = this.grapWrapEl.innerHTML;
            }
        }

        //鹰眼可视区域初始化
        _initVisibleDom() {
            let visibleEyeEl = document.createElement("div");
            visibleEyeEl.className = EYE_SETTING.visibleEyeCls
            this.visibleEyeEl = visibleEyeEl
            this.eyeEl.appendChild(visibleEyeEl);
        }

        //比例计算
        _cuntScale() {
            let eyew = this.eyeEl.offsetWidth;
            let eyeh = this.eyeEl.offsetHeight;
            if (this.type === "svg") {
                //重设svg高宽和viewBox高宽
                let eyeSvg = this.eyeEl.querySelector("svg")
                let svgw = eyeSvg.scrollWidth;
                let svgh = eyeSvg.scrollHeight;
                eyeSvg.setAttribute("style", "")
                eyeSvg.setAttribute("width", eyew + "px")
                eyeSvg.setAttribute("height", eyeh + "px")
                eyeSvg.setAttribute("viewBox", "0 0 " + svgw + " " + svgh);

                // var wscale = eyew / svgw;
                this.scale = eyew / svgw;
                console.log(this.scale)
                //鹰眼可视区域高宽计算
                this.eyeOutputH = svgw * this.scale;
                this.eyeDeviationTop = (eyeh - this.eyeOutputH) / 2;
                this.visibleEyeEl.width = (eyew * this.grapWrapEl.offsetWidth / svgw) + "px";
                this.visibleEyeEl.height = (this.grapWrapEl.offsetWidth / svgh) * this.eyeOutputH + "px";
            }
        }

        _bindEvent() {
            let docEl = document.body
            AddEvent(docEl, 'mousedown', () => {
                console.log('mousedown')
            })

            AddEvent(docEl, 'mousemove', () => {
                console.log('mousemove')
            })

            AddEvent(docEl, 'mouseup', () => {
                console.log('mouseup')
            })
        }
    }
    window.EyeView = EyeView;
})()