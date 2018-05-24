import React, { Component } from 'react';
import { connect } from "react-redux"
import Slider from "@/Components/Slider"
import {setSliderValues} from "@/actionCreator/mainActions"

@connect(s => ({
    slider_values: s.slider_values
}))
export default class HSVSlider extends Component {
    constructor(props) {
        super(props);
    }

    static sliders = 
    [
        {
            label: "Hue",
            min: 0.0,
            max: 360,
            step: 1
        },
        {
            label: "Saturation",
            min: 0.0,
            max: 100.0,
            step: 1
        },
        {
            label: "Value",
            min: 0.0,
            max: 100,
            step: 1
        }
    ]

    changeColorSlider(e, id) {
        let colors = [].concat(this.props.slider_values);//shallow copy
        colors[id] = parseFloat(e.target.value);
        
        let action = setSliderValues(colors);
        this.props.dispatch(action);
    }

    componentDidMount() {
    
    }

    render() {
        let items = [];
        for (let i = 0; i < HSVSlider.sliders.length; i++) {
            let item = <Slider key={"slider_" + i}
                                id={i}
                                label={HSVSlider.sliders[i]['label']}
                                min={HSVSlider.sliders[i]['min']}
                                max={HSVSlider.sliders[i]['max']}
                                step={HSVSlider.sliders[i]['step']}
                                value={this.props.slider_values[i]} 
                                callback={this.changeColorSlider.bind(this)} />
            items.push(item);
        }

        return (
            <div id="color_sliders">{items}</div>
        );
    }
}

