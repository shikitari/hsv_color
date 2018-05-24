import React, { Component } from 'react';
import { connect } from "react-redux"
import ThreeManager from "@/Modules/ThreeManager"
import { setColors, setPickerColor, setMouseDown, setSliderValues } from "@/actionCreator/mainActions"
import HSVSlider from "@/Components/HSVSlider"
import { PhotoshopPicker } from 'react-color';
import { rgb2hsv, HSVtoRGB } from '@/utils/'

@connect(s => ({
    size: s.size,
    colors: s.colors,
    picker_color: s.picker_color,
    mouse_down: s.mouse_down,
    slider_values: s.slider_values
}))
export default class App extends Component {
    constructor(props) {
        super(props);
        this.three = null;
        this.domElement;
        this.animateConeAsync = {};
    }

    static colors = [
        "#000000",
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
        "#ffffff",
    ];

    static delayTime = 16.66;

    static delay(time) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), time);
        });
    }

    static getUniqId() {
        return (Math.floor(performance.now() * 1000000)).toString();
    }

    async componentDidMount() {
        this.three = new ThreeManager(this.props.size.width, this.props.size.height);
        this.three.init();
        this.three.append(this.domElement);
        this.three.render();
        this.syncThreeManager(this.props.colors);

        let hsv = rgb2hsv(this.props.colors, true);
        this.animateCone(App.getUniqId(), hsv[0] * Math.PI / 180, 2000, 300, 2000);

        document.addEventListener("mouseup", e => this.handleMouseUp(e), false);
    }

    // need to update
    UNSAFE_componentWillUpdate(nextProps) {
        if (App.diffArray(nextProps.colors, this.props.colors, 100)) {
            this.syncThreeManager(nextProps.colors);
        }

        if (App.diffArray(nextProps.slider_values, this.props.slider_values, 100)) {
            const h = nextProps.slider_values[0];
            const s = nextProps.slider_values[1];
            const v = nextProps.slider_values[2];
            const rgb = HSVtoRGB(h / 360, s / 100, v / 100);

            const rgb_array = [rgb.r, rgb.g, rgb.b];
            this.props.dispatch(setColors(rgb_array));
            this.props.dispatch(setPickerColor({ h, s, v }));
        }
    }

    static diffArray(arrayA, arrayB, accuracy = 1000) {
        const n1 = arrayA.length;
        const n2 = arrayB.length;
        if (n1 != n2) return true;

        let i;
        for (i = 0; i < n1; i++) {
            let a = Math.round(arrayA[i] * accuracy);
            let b = Math.round(arrayB[i] * accuracy);
            if (a != b) break;
        }

        if (i == n1) {
            return false;//same element of array(not different).
        } else {
            return true;
        }
    }

    syncThreeManager(colors) {
        if (this.three) {
            this.three.Colors = colors;
        }
    }

    handleChangeColor(color) {
        let rgb = [];
        rgb[0] = color.rgb.r / 255;
        rgb[1] = color.rgb.g / 255;
        rgb[2] = color.rgb.b / 255;

        const hsv = [Math.round(color.hsv.h), Math.round(color.hsv.s * 100), Math.round(color.hsv.v * 100)];

        // let hsv = rgb2hsv(rgb, true);
        this.props.dispatch(setColors(rgb));
        this.props.dispatch(setPickerColor(color.hsv));
        this.props.dispatch(setSliderValues(hsv));
    }

    stopExistingAsyc() {
        for (let i in this.animateConeAsync) {
            this.animateConeAsync[i] = false;
        }
    }

    //handleChangeComplete(color) {
    // Even while mouse dragging, called complete.
    // console.log("COMPLETE");
    //}

    handleMouseDown(e) {
        this.stopExistingAsyc();
        this.props.dispatch(setMouseDown(1));
        let hsv = rgb2hsv(this.props.colors, true);
        this.animateCone(App.getUniqId(), hsv[0] * Math.PI / 180, 350, 0, 0);
        return e;
    }

    handleMouseUp(e) {
        if (this.props.mouse_down == 1) {
            this.stopExistingAsyc();
            this.props.dispatch(setMouseDown(0));
            let hsv = rgb2hsv(this.props.colors, true);
            this.animateCone(App.getUniqId(), hsv[0] * Math.PI / 180, 0, 0, 1500);
        }
        return e;
    }

    async animateCone(id, hue, fadeOutTime, delay, fadeInTime) {
        this.animateConeAsync[id] = true;
        await this.animateConeFadeOut(id, hue, fadeOutTime);
        await this.animateConeDelay(id, hue, delay);
        await this.animateConeFadeIn(id, hue, fadeInTime);
        delete this.animateConeAsync[id];
    }

    async animateConeDelay(id, hue, time) {
        if (time <= 0) return;
        let startTime = performance.now();
        while (this.animateConeAsync[id]) {
            await App.delay(App.delayTime);
            let elapsedTime = performance.now() - startTime;
            if (elapsedTime > time) {
                break;
            }
        }
    }

    async animateConeFadeOut(id, hue, time) {
        if (time <= 0) return;
        let startTime = performance.now();
        while (this.animateConeAsync[id]) {
            await App.delay(App.delayTime);
            let elapsedTime = performance.now() - startTime;
            let amount = elapsedTime / time;
            amount = Math.min(1.0, amount);
            amount = 1 - amount;
            let ease = amount * (2 - amount);
            this.three.ConeMaterial = { openAngle: 0, phase: hue, scale: ease };
            if (elapsedTime > time) {
                break;
            }
        }
    }

    async animateConeFadeIn(id, hue, time) {
        if (time <= 0) return;
        let startTime = performance.now();
        while (this.animateConeAsync[id]) {
            await App.delay(App.delayTime);
            let elapsedTime = performance.now() - startTime;
            let amount = elapsedTime / time;
            amount = Math.min(1.0, amount);
            let ease = amount * (2 - amount);

            let openAngle = 2 * Math.PI * (1 - ease);
            this.three.ConeMaterial = { openAngle, phase: hue, scale: 1 };
            if (elapsedTime > time) {
                break;
            }
        }
    }
    render() {
        const style = {
            width: this.props.size.width + "px",
            height: this.props.size.height + "px",
            backgroundColor: "red",
        }

        const hsv = this.props.picker_color;

        return (
            <div id="main">
                <div id="items">
                    <div id="canvs" style={style} ref={v => (this.domElement = v)} />
                    <div id="picker" onMouseDown={this.handleMouseDown.bind(this)}>
                        <div >
                            <PhotoshopPicker disableAlpha={true} width={"5120px"} height={"512px"}
                                presetColors={App.colors} onChange={this.handleChangeColor.bind(this)}
                                //onChangeComplete={ this.handleChangeComplete.bind(this)  } 
                                color={hsv} />
                        </div>
                        <HSVSlider />
                    </div>
                </div>
            </div>
        );
    }
}

