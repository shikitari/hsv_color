export function setColors(colors) {
    return {
        type: 'SET_COLORS',
        payload: colors
    };
}

export function setPickerColor(color) {
    return {
        type: 'SET_PICKER_COLOR',
        payload: color
    };
}

export function setMouseDown(v) {
    
    return {
        type: 'SET_MOUSE_DOWN',
        payload: v
    };
}

export function setSliderValues(v) {
    return {
        type: 'SET_SLIDER_VALUES',
        payload: v
    };
}

