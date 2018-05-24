export function rgb2hsv(rgb, isCone) {
	var r = rgb[0], g = rgb[1], b = rgb[2];
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var d = max - min;
	var v = max;
	var s = (v == 0)? 0 : d / max;//cylinder
	var s2 = (v == 0)? 0 : d;//cone
	var h;
	switch (min) {
		case max: h = 0; break;
		case r:   h = 60 * (b - g) / d + 180; break;
		case g:   h = 60 * (r - b) / d + 300; break;
		case b:   h = 60 * (g - r) / d +  60; break;
	}
	h = h % 360;
	return (isCone)? [h, s2, v] : [h, s, v];
}

export function mod(a, b) {
    return ((a % b) + b) % b;
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
 * 
 * https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
*/
export function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: r,
        g: g,
        b: b
    };
}