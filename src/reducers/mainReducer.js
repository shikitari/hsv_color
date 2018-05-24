export default function reducer(state = {}, {type, payload}) {
    switch(type) {
        case "SET_COLORS":
        {   
            return {
                ...state, colors: payload
            }
        }
        case "SET_PICKER_COLOR":
        {   
            return {
                ...state, picker_color: payload
            }
        }
        case "SET_PICKER_COLOR_TIME":
        {  
            return {
                ...state, picked_color_time: payload
            }
        }
        case "SET_MOUSE_DOWN":
        {  
            return {
                ...state, mouse_down: payload
            }
        }
        case "SET_SLIDER_VALUES":
        {  
            return {
                ...state, slider_values: payload
            }
        }
     }
    return state;
}