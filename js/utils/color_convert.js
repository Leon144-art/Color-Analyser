// Color conversion helpers
export function rgbToHex(r, g, b) {
    const toHex = (n) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
}

export function hexToRgb(hex) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (h.length !== 6) return null;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return { r, g, b };
}

export function hsvToRgb(h, s, v) {
    const c = v * s;
    const hh = (h % 360) / 60;
    const x = c * (1 - Math.abs((hh % 2) - 1));
    let r1 = 0, g1 = 0, b1 = 0;
    if (0 <= hh && hh < 1) [r1, g1, b1] = [c, x, 0];
    else if (1 <= hh && hh < 2) [r1, g1, b1] = [x, c, 0];
    else if (2 <= hh && hh < 3) [r1, g1, b1] = [0, c, x];
    else if (3 <= hh && hh < 4) [r1, g1, b1] = [0, x, c];
    else if (4 <= hh && hh < 5) [r1, g1, b1] = [x, 0, c];
    else if (5 <= hh && hh < 6) [r1, g1, b1] = [c, 0, x];
    const m = v - c;
    const r = Math.round((r1 + m) * 255);
    const g = Math.round((g1 + m) * 255);
    const b = Math.round((b1 + m) * 255);
    return { r, g, b };
}

export function rgbToHsv(r, g, b) {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
        if (max === rn) h = 60 * (((gn - bn) / d) % 6);
        else if (max === gn) h = 60 * (((bn - rn) / d) + 2);
        else h = 60 * (((rn - gn) / d) + 4);
    }
    if (h < 0) h += 360;
    const s = max === 0 ? 0 : d / max;
    const v = max;
    return { h, s, v };
}

export function rgbToHsl(r, g, b) {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
        if (max === rn) h = 60 * (((gn - bn) / d) % 6);
        else if (max === gn) h = 60 * (((bn - rn) / d) + 2);
        else h = 60 * (((rn - gn) / d) + 4);
    }
    if (h < 0) h += 360;
    const l = (max + min) / 2;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    return { h, s, l };
}

export function hslToRgb(h, s, l) {
    const sn = s / 100, ln = l / 100;
    const c = (1 - Math.abs(2 * ln - 1)) * sn;
    const h_prime = h / 60;
    const x = c * (1 - Math.abs(h_prime % 2 - 1));
    let [r1, g1, b1] = h_prime < 1 ? [c, x, 0] :
        h_prime < 2 ? [x, c, 0] :
            h_prime < 3 ? [0, c, x] :
                h_prime < 4 ? [0, x, c] :
                    h_prime < 5 ? [x, 0, c] : [c, 0, x];
    const m = ln - c / 2;
    return { r: Math.round((r1 + m) * 255), g: Math.round((g1 + m) * 255), b: Math.round((b1 + m) * 255) };
}
