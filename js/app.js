import{ rgbToHex, hexToRgb, hsvToRgb, rgbToHsv, rgbToHsl, hslToRgb } from './utils/color_convert.js';
import { ColorWheel } from './components/wheel.js';
import { initWallpaper } from './components/wallpaper.js';
// Element references
const nativeColor = document.getElementById('native-color');
const swatch = document.getElementById('swatch');
const colorText = document.getElementById('color-text');
const copyBtn = document.getElementById('copy');

// HSV wheel elements
const hsvValueSlider = document.getElementById('hsv-value');
const hsvVText = document.getElementById('hsv-v-text');
const hsvHsvText = document.getElementById('hsv-hsv-text');
const hsvRgbText = document.getElementById('hsv-rgb-text');

// HSL wheel elements
const hslLightnessSlider = document.getElementById('hsl-lightness');
const hslLText = document.getElementById('hsl-l-text');
const hslHslText = document.getElementById('hsl-hsl-text');
const hslRgbText = document.getElementById('hsl-rgb-text');

const rgbReadout = document.getElementById('rgb-text');
const swatchR = document.querySelector('.swatch-r');
const swatchG = document.querySelector('.swatch-g');
const swatchB = document.querySelector('.swatch-b');  

// Centralized apply function (updates UI + storage)
function setHex(hex, origin = 'unknown') {
    if (origin !== 'native') {
        try { nativeColor.value = hex; } catch (_) { }
    }
    swatch.style.background = hex;
    colorText.textContent = hex;
    document.body.style.setProperty('--accent', hex);
    try { localStorage.setItem('colorAnalyser.lastColor', hex); } catch (_) { }
}

// Restore last color, else use current input default
(function restore() {
    try {
        const saved = localStorage.getItem('colorAnalyser.lastColor');
        if (saved && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3,4}|[0-9a-fA-F]{8})$/.test(saved)) {
            setHex(saved, 'restore');
        } else {
            setHex(nativeColor.value, 'restore');
        }
    } catch (_) { setHex(nativeColor.value, 'restore'); }
})();

// Copy current hex to clipboard (with fallback)
copyBtn.addEventListener('click', async () => {
    const hex = colorText.textContent || '';
    try {
        await navigator.clipboard.writeText(hex);
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied';
        setTimeout(() => (copyBtn.textContent = original), 900);
    } catch (_) {
        const sel = window.getSelection();
        const range = document.createRange();
        const tempTextNode = document.createTextNode(hex);
        document.body.appendChild(tempTextNode);
        range.selectNode(tempTextNode);
        sel.removeAllRanges();
        sel.addRange(range);
        try { document.execCommand('copy'); } catch (_) { }
        sel.removeAllRanges();
        document.body.removeChild(tempTextNode);
    }
});

// 全局颜色同步函数
function setFromHex(hex, exclude = null) {
    setHex(hex, 'sync')
    const { r, g, b } = hexToRgb(hex);
    rgbReadout.textContent = `RGB(${r}, ${g}, ${b})`;
    swatchR.style.background = `rgb(${r}, 0, 0)`;
    swatchG.style.background = `rgb(0, ${g}, 0)`;
    swatchB.style.background = `rgb(0, 0, ${b})`;
    if (typeof hsvWheel !== 'undefined' && exclude != 'HSV') {
        hsvWheel.setFromHex(hex);
    }
    if (typeof hslWheel !== 'undefined' && exclude != 'HSL') {
        hslWheel.setFromHex(hex);
    }
}


// Keep wheel in sync when native color changes
nativeColor.addEventListener('input', (e) => setFromHex(e.target.value));

// 创建 HSV 色轮实例
const hsvWheel = new ColorWheel('hsv-wheel', 'HSV', hsvValueSlider, {
    hsvText: hsvHsvText,
    rgbText: hsvRgbText,
    vText: hsvVText
}, { onHexChange: setFromHex });

// 创建 HSL 色轮实例
const hslWheel = new ColorWheel('hsl-wheel', 'HSL', hslLightnessSlider, {
    hslText: hslHslText,     
    rgbText: hslRgbText,
    lText: hslLText
}, { onHexChange: setFromHex });

// 初始化轮盘
const initialHex = colorText.textContent || nativeColor.value;
hsvWheel.setFromHex(initialHex);
hslWheel.setFromHex(initialHex);

// 初始化壁纸（可配置与可禁用）
const wallpaper = initWallpaper(document.body, {
  enabled: true,
  // proxyURL: 'https://corsproxy.io/?', // 可按需替换或置空
  ttlHours: 24,
  blur: 7,
});

// Advanced picker (Pickr) reference removed for release build; see docs if needed.
