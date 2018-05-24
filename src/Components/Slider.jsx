import React, { Component } from 'react';

export default class Slider extends Component {
    constructor(props) {
        super(props);
    }
    
    onChange(e, id) {
        this.props.callback(e, id);
    }

    render() {
        return (
            <div className="slider">
                <span className="label">{this.props.label}:</span>
                <input className="range" type="range" min={this.props.min} max={this.props.max} step={this.props.step} value={this.props.value} onChange={(e) => this.onChange(e, this.props.id)} />
                <input className="text" type="number" value={this.props.value} onChange={(e) => this.onChange(e, this.props.id)} />
            </div>
        );
    }
}

