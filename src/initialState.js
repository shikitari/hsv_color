
export const initialState = {
    size: {
        width: 512,
        height: 512,
    },
    colors: [1.0, 0.0, 0.0],//RGB
    picker_color: {h:0.0, s:1.0, v:1.0},
    picked_color_time: 0,
    mouse_down: 0,
    slider_values: [0, 100.0, 100.0]
}