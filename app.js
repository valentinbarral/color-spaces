// ===== THEME MANAGEMENT =====

function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.remove('dark');
    } else {
        document.body.classList.add('dark');
    }
}

// ===== HAMBURGER MENU =====

function toggleMenu() {
    document.getElementById('headerControls').classList.toggle('open');
}

document.addEventListener('click', function(e) {
    const controls = document.getElementById('headerControls');
    const hamburger = document.querySelector('.hamburger');
    if (!controls.contains(e.target) && e.target !== hamburger) {
        controls.classList.remove('open');
    }
});

// ===== SISTEMA DE INTERNACIONALIZACIÓN =====

const translations = {
    en: {
        header: {
            title: "Color Space Comparison",
            subtitle: "sRGB vs AdobeRGB - CIE xy Diagram"
        },
        left: {
            title: "Color Control (HSL)",
            hue: "Hue (H)",
            saturation: "Saturation (S)",
            lightness: "Lightness (L)",
            selectedColor: "Selected Color",
            spectrumTitle: "RGB Intensity Distribution"
        },
        right: {
            title: "CIE 1931 Chromaticity Diagram",
            legend: {
                srgbGamut: "sRGB Gamut",
                adobeGamut: "AdobeRGB Gamut",
                currentSrgb: "Current color (sRGB)",
                currentAdobe: "Current color (AdobeRGB)"
            },
            coordinates: {
                title: "CIE xy Coordinates"
            }
        },
        footer: {
            created: "Created by",
            licensed: "Licensed under",
            freeToShare: "Free to share and adapt with attribution"
        }
    },
    es: {
        header: {
            title: "Comparación de Espacios de Color",
            subtitle: "sRGB vs AdobeRGB - Diagrama CIE xy"
        },
        left: {
            title: "Control de Color (HSL)",
            hue: "Tono (H)",
            saturation: "Saturación (S)",
            lightness: "Luminosidad (L)",
            selectedColor: "Color Seleccionado",
            spectrumTitle: "Distribución de Intensidad RGB"
        },
        right: {
            title: "Diagrama de Cromaticidad CIE 1931",
            legend: {
                srgbGamut: "Gamut sRGB",
                adobeGamut: "Gamut AdobeRGB",
                currentSrgb: "Color actual (sRGB)",
                currentAdobe: "Color actual (AdobeRGB)"
            },
            coordinates: {
                title: "Coordenadas CIE xy"
            }
        },
        footer: {
            created: "Creado por",
            licensed: "Licenciado bajo",
            freeToShare: "Libre para compartir y adaptar con atribución"
        }
    },
    gl: {
        header: {
            title: "Comparación de Espazos de Cor",
            subtitle: "sRGB vs AdobeRGB - Diagrama CIE xy"
        },
        left: {
            title: "Control de Cor (HSL)",
            hue: "Ton (H)",
            saturation: "Saturación (S)",
            lightness: "Luminosidade (L)",
            selectedColor: "Cor Seleccionada",
            spectrumTitle: "Distribución de Intensidade RGB"
        },
        right: {
            title: "Diagrama de Cromaticidade CIE 1931",
            legend: {
                srgbGamut: "Gamut sRGB",
                adobeGamut: "Gamut AdobeRGB",
                currentSrgb: "Cor actual (sRGB)",
                currentAdobe: "Cor actual (AdobeRGB)"
            },
            coordinates: {
                title: "Coordenadas CIE xy"
            }
        },
        footer: {
            created: "Creado por",
            licensed: "Licenciado baixo",
            freeToShare: "Libre para compartir e adaptar con atribución"
        }
    }
};

function changeLang(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations[lang];

        for (const k of keys) {
            translation = translation[k];
        }

        if (translation) {
            element.textContent = translation;
        }
    });

    localStorage.setItem('lang', lang);
    document.title = translations[lang].header.title + ": sRGB vs AdobeRGB";
}

function initLang() {
    const saved = localStorage.getItem('lang') || 'es';
    const langSelect = document.getElementById('langSelect');
    langSelect.value = saved;
    changeLang(saved);
}

// ===== INIT =====

function init() {
    initTheme();
    initLang();
}

// ===== DATOS REALES DE LOS ESPACIOS DE COLOR =====

const sRGB_PRIMARIES = {
    red: { x: 0.6400, y: 0.3300 },
    green: { x: 0.3000, y: 0.6000 },
    blue: { x: 0.1500, y: 0.0600 },
    white: { x: 0.3127, y: 0.3290 }
};

const ADOBE_RGB_PRIMARIES = {
    red: { x: 0.6400, y: 0.3300 },
    green: { x: 0.2100, y: 0.7100 },
    blue: { x: 0.1500, y: 0.0600 },
    white: { x: 0.3127, y: 0.3290 }
};

const sRGB_TO_XYZ_MATRIX = [
    [0.4124564, 0.3575761, 0.1804375],
    [0.2126729, 0.7151522, 0.0721750],
    [0.0193339, 0.1191920, 0.9503041]
];

const ADOBE_RGB_TO_XYZ_MATRIX = [
    [0.5767309, 0.1855540, 0.1881852],
    [0.2973769, 0.6273491, 0.0752741],
    [0.0270343, 0.0706872, 0.9911085]
];

const SPECTRUM_LOCUS = [
    { λ: 380, x: 0.1741, y: 0.0050 },
    { λ: 385, x: 0.1740, y: 0.0050 },
    { λ: 390, x: 0.1738, y: 0.0050 },
    { λ: 395, x: 0.1736, y: 0.0049 },
    { λ: 400, x: 0.1733, y: 0.0049 },
    { λ: 405, x: 0.1730, y: 0.0048 },
    { λ: 410, x: 0.1726, y: 0.0048 },
    { λ: 415, x: 0.1721, y: 0.0048 },
    { λ: 420, x: 0.1714, y: 0.0051 },
    { λ: 425, x: 0.1703, y: 0.0058 },
    { λ: 430, x: 0.1689, y: 0.0069 },
    { λ: 435, x: 0.1669, y: 0.0086 },
    { λ: 440, x: 0.1644, y: 0.0109 },
    { λ: 445, x: 0.1611, y: 0.0138 },
    { λ: 450, x: 0.1566, y: 0.0177 },
    { λ: 455, x: 0.1510, y: 0.0227 },
    { λ: 460, x: 0.1440, y: 0.0297 },
    { λ: 465, x: 0.1355, y: 0.0399 },
    { λ: 470, x: 0.1241, y: 0.0578 },
    { λ: 475, x: 0.1096, y: 0.0868 },
    { λ: 480, x: 0.0913, y: 0.1327 },
    { λ: 485, x: 0.0687, y: 0.2007 },
    { λ: 490, x: 0.0454, y: 0.2950 },
    { λ: 495, x: 0.0235, y: 0.4127 },
    { λ: 500, x: 0.0082, y: 0.5384 },
    { λ: 505, x: 0.0039, y: 0.6548 },
    { λ: 510, x: 0.0139, y: 0.7502 },
    { λ: 515, x: 0.0389, y: 0.8120 },
    { λ: 520, x: 0.0743, y: 0.8338 },
    { λ: 525, x: 0.1142, y: 0.8262 },
    { λ: 530, x: 0.1547, y: 0.8059 },
    { λ: 535, x: 0.1929, y: 0.7816 },
    { λ: 540, x: 0.2296, y: 0.7543 },
    { λ: 545, x: 0.2658, y: 0.7243 },
    { λ: 550, x: 0.3016, y: 0.6923 },
    { λ: 555, x: 0.3373, y: 0.6589 },
    { λ: 560, x: 0.3731, y: 0.6245 },
    { λ: 565, x: 0.4087, y: 0.5896 },
    { λ: 570, x: 0.4441, y: 0.5547 },
    { λ: 575, x: 0.4788, y: 0.5202 },
    { λ: 580, x: 0.5125, y: 0.4866 },
    { λ: 585, x: 0.5448, y: 0.4544 },
    { λ: 590, x: 0.5752, y: 0.4242 },
    { λ: 595, x: 0.6029, y: 0.3965 },
    { λ: 600, x: 0.6270, y: 0.3725 },
    { λ: 605, x: 0.6482, y: 0.3514 },
    { λ: 610, x: 0.6658, y: 0.3340 },
    { λ: 615, x: 0.6801, y: 0.3197 },
    { λ: 620, x: 0.6915, y: 0.3083 },
    { λ: 625, x: 0.7006, y: 0.2993 },
    { λ: 630, x: 0.7079, y: 0.2920 },
    { λ: 635, x: 0.7140, y: 0.2859 },
    { λ: 640, x: 0.7190, y: 0.2809 },
    { λ: 645, x: 0.7230, y: 0.2770 },
    { λ: 650, x: 0.7260, y: 0.2740 },
    { λ: 655, x: 0.7283, y: 0.2717 },
    { λ: 660, x: 0.7300, y: 0.2700 },
    { λ: 665, x: 0.7311, y: 0.2689 },
    { λ: 670, x: 0.7320, y: 0.2680 },
    { λ: 675, x: 0.7327, y: 0.2673 },
    { λ: 680, x: 0.7334, y: 0.2666 },
    { λ: 685, x: 0.7340, y: 0.2660 },
    { λ: 690, x: 0.7344, y: 0.2656 },
    { λ: 695, x: 0.7346, y: 0.2654 },
    { λ: 700, x: 0.7347, y: 0.2653 },
    { λ: 705, x: 0.7347, y: 0.2653 },
    { λ: 710, x: 0.7347, y: 0.2653 },
    { λ: 715, x: 0.7347, y: 0.2653 },
    { λ: 720, x: 0.7347, y: 0.2653 },
    { λ: 725, x: 0.7347, y: 0.2653 },
    { λ: 730, x: 0.7347, y: 0.2653 }
];

let currentHSL = { h: 0, s: 100, l: 50 };
let currentRGB = { r: 255, g: 0, b: 0 };

const hueSlider = document.getElementById('hue');
const saturationSlider = document.getElementById('saturation');
const lightnessSlider = document.getElementById('lightness');

const hueValue = document.getElementById('hue-value');
const saturationValue = document.getElementById('saturation-value');
const lightnessValue = document.getElementById('lightness-value');

const hueCanvas = document.getElementById('hue-gradient');
const saturationCanvas = document.getElementById('saturation-gradient');
const lightnessCanvas = document.getElementById('lightness-gradient');

const colorBox = document.getElementById('color-box');
const rgbValue = document.getElementById('rgb-value');
const hslDisplay = document.getElementById('hsl-display');
const srgbXY = document.getElementById('srgb-xy');
const adobergbXY = document.getElementById('adobergb-xy');

const cieDiagram = document.getElementById('cie-diagram');
const rgbSpectrumCanvas = document.getElementById('rgb-spectrum');

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r, g, b;

    if (h >= 0 && h < 60) {
        [r, g, b] = [c, x, 0];
    } else if (h >= 60 && h < 120) {
        [r, g, b] = [x, c, 0];
    } else if (h >= 120 && h < 180) {
        [r, g, b] = [0, c, x];
    } else if (h >= 180 && h < 240) {
        [r, g, b] = [0, x, c];
    } else if (h >= 240 && h < 300) {
        [r, g, b] = [x, 0, c];
    } else {
        [r, g, b] = [c, 0, x];
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}

function srgbGamma(value) {
    const v = value / 255;
    if (v <= 0.04045) {
        return v / 12.92;
    } else {
        return Math.pow((v + 0.055) / 1.055, 2.4);
    }
}

function adobeRgbGamma(value) {
    return Math.pow(value / 255, 2.2);
}

function rgbToXYZ(rgb, matrix, gammaFunction) {
    const rLinear = gammaFunction(rgb.r);
    const gLinear = gammaFunction(rgb.g);
    const bLinear = gammaFunction(rgb.b);

    const X = matrix[0][0] * rLinear + matrix[0][1] * gLinear + matrix[0][2] * bLinear;
    const Y = matrix[1][0] * rLinear + matrix[1][1] * gLinear + matrix[1][2] * bLinear;
    const Z = matrix[2][0] * rLinear + matrix[2][1] * gLinear + matrix[2][2] * bLinear;

    return { X, Y, Z };
}

function xyzToXy(xyz) {
    const sum = xyz.X + xyz.Y + xyz.Z;
    if (sum === 0) {
        return { x: 0, y: 0 };
    }
    return {
        x: xyz.X / sum,
        y: xyz.Y / sum
    };
}

const cieBackgroundImage = new Image();
let imageLoaded = false;

cieBackgroundImage.onload = function() {
    imageLoaded = true;
    drawCIEDiagram();
};

cieBackgroundImage.onerror = function() {
    imageLoaded = false;
    drawCIEDiagram();
};

cieBackgroundImage.src = "CIExy1931.svg";

if (cieBackgroundImage.complete) {
    imageLoaded = true;
    drawCIEDiagram();
}

function drawHueGradient() {
    const ctx = hueCanvas.getContext('2d');
    const width = hueCanvas.width = hueCanvas.offsetWidth;
    const height = hueCanvas.height = hueCanvas.offsetHeight;

    const gradient = ctx.createLinearGradient(0, 0, width, 0);

    for (let i = 0; i <= 360; i += 30) {
        const rgb = hslToRgb(i, 100, 50);
        gradient.addColorStop(i / 360, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function drawSaturationGradient() {
    const ctx = saturationCanvas.getContext('2d');
    const width = saturationCanvas.width = saturationCanvas.offsetWidth;
    const height = saturationCanvas.height = saturationCanvas.offsetHeight;

    const gradient = ctx.createLinearGradient(0, 0, width, 0);

    for (let i = 0; i <= 100; i += 10) {
        const rgb = hslToRgb(currentHSL.h, i, currentHSL.l);
        gradient.addColorStop(i / 100, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function drawLightnessGradient() {
    const ctx = lightnessCanvas.getContext('2d');
    const width = lightnessCanvas.width = lightnessCanvas.offsetWidth;
    const height = lightnessCanvas.height = lightnessCanvas.offsetHeight;

    const gradient = ctx.createLinearGradient(0, 0, width, 0);

    for (let i = 0; i <= 100; i += 10) {
        const rgb = hslToRgb(currentHSL.h, currentHSL.s, i);
        gradient.addColorStop(i / 100, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function drawRGBSpectrum() {
    const ctx = rgbSpectrumCanvas.getContext('2d');
    const width = rgbSpectrumCanvas.width = rgbSpectrumCanvas.offsetWidth;
    const height = rgbSpectrumCanvas.height = rgbSpectrumCanvas.offsetHeight;

    rgbSpectrumCanvas.width = width;
    rgbSpectrumCanvas.height = height;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    const padding = 20;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;

    function gaussian(x, center, width, amplitude) {
        return amplitude * Math.exp(-Math.pow(x - center, 2) / (2 * width * width));
    }

    const points = [];
    const numPoints = plotWidth;
    const maxRGB = 255;

    for (let i = 0; i < numPoints; i++) {
        const x = i / numPoints;

        const redContribution = gaussian(x, 0.15, 0.15, currentRGB.r / maxRGB);
        const greenContribution = gaussian(x, 0.5, 0.12, currentRGB.g / maxRGB);
        const blueContribution = gaussian(x, 0.85, 0.12, currentRGB.b / maxRGB);

        points.push({
            x: x,
            r: redContribution,
            g: greenContribution,
            b: blueContribution,
            total: redContribution + greenContribution + blueContribution
        });
    }

    const maxValue = 1.0;

    const drawChannel = (channel, color, withFill = true) => {
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);

        for (let i = 0; i < points.length; i++) {
            const x = padding + i;
            const y = height - padding - (points[i][channel] / maxValue) * plotHeight;
            ctx.lineTo(x, y);
        }

        ctx.lineTo(padding + plotWidth, height - padding);
        ctx.closePath();

        if (withFill) {
            ctx.fillStyle = color;
            ctx.fill();
        }

        ctx.strokeStyle = color.replace('0.4', '0.8').replace('0.2', '1');
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    drawChannel('b', 'rgba(0, 0, 255, 0.4)');
    drawChannel('g', 'rgba(0, 200, 0, 0.4)');
    drawChannel('r', 'rgba(255, 0, 0, 0.4)');

    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
        const x = padding + i;
        const y = height - padding - (points[i].total / maxValue) * plotHeight;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    ctx.font = '11px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('780nm', padding + 10, height - 5);
    ctx.fillText('380nm', width - padding - 10, height - 5);
    ctx.textAlign = 'right';
    ctx.fillText('Intensidad', padding - 5, padding + 10);

    const legendY = padding + 15;
    const legendX = width - padding - 10;

    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'right';

    ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
    ctx.fillText(`R: ${currentRGB.r}`, legendX, legendY);

    ctx.fillStyle = 'rgba(0, 150, 0, 0.9)';
    ctx.fillText(`G: ${currentRGB.g}`, legendX, legendY + 15);

    ctx.fillStyle = 'rgba(0, 0, 255, 0.9)';
    ctx.fillText(`B: ${currentRGB.b}`, legendX, legendY + 30);
}

function drawCIEDiagram() {
    const canvas = cieDiagram;
    const svgWidth = 476;
    const svgHeight = 540;
    canvas.width = svgWidth;
    canvas.height = svgHeight;
    const ctx = canvas.getContext('2d');

    const imageMarginLeft = 47.8;
    const imageMarginBottom = 47.2;
    const imageMarginTop = 32;

    const plotWidth = 409.6;
    const plotHeight = 460.8;

    const xMin = 0;
    const xMax = 0.8;
    const yMin = 0;
    const yMax = 0.9;

    function xyToCanvas(x, y) {
        const xNorm = (x - xMin) / (xMax - xMin);
        const yNorm = (y - yMin) / (yMax - yMin);
        return {
            x: imageMarginLeft + xNorm * plotWidth,
            y: svgHeight - imageMarginBottom - yNorm * plotHeight
        };
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, svgWidth, svgHeight);

    if (imageLoaded && cieBackgroundImage.complete) {
        ctx.drawImage(cieBackgroundImage, 0, 0, svgWidth, svgHeight);
    } else {
        ctx.beginPath();
        SPECTRUM_LOCUS.forEach((point, i) => {
            const pos = xyToCanvas(point.x, point.y);
            if (i === 0) {
                ctx.moveTo(pos.x, pos.y);
            } else {
                ctx.lineTo(pos.x, pos.y);
            }
        });

        const firstPoint = xyToCanvas(SPECTRUM_LOCUS[0].x, SPECTRUM_LOCUS[0].y);
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();

        ctx.fillStyle = 'rgba(240, 240, 240, 0.5)';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    ctx.beginPath();
    const srgbRed = xyToCanvas(sRGB_PRIMARIES.red.x, sRGB_PRIMARIES.red.y);
    const srgbGreen = xyToCanvas(sRGB_PRIMARIES.green.x, sRGB_PRIMARIES.green.y);
    const srgbBlue = xyToCanvas(sRGB_PRIMARIES.blue.x, sRGB_PRIMARIES.blue.y);

    ctx.moveTo(srgbRed.x, srgbRed.y);
    ctx.lineTo(srgbGreen.x, srgbGreen.y);
    ctx.lineTo(srgbBlue.x, srgbBlue.y);
    ctx.closePath();

    ctx.strokeStyle = '#0066FF';
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.stroke();

    ctx.beginPath();
    const adobeRed = xyToCanvas(ADOBE_RGB_PRIMARIES.red.x, ADOBE_RGB_PRIMARIES.red.y);
    const adobeGreen = xyToCanvas(ADOBE_RGB_PRIMARIES.green.x, ADOBE_RGB_PRIMARIES.green.y);
    const adobeBlue = xyToCanvas(ADOBE_RGB_PRIMARIES.blue.x, ADOBE_RGB_PRIMARIES.blue.y);

    ctx.moveTo(adobeRed.x, adobeRed.y);
    ctx.lineTo(adobeGreen.x, adobeGreen.y);
    ctx.lineTo(adobeBlue.x, adobeBlue.y);
    ctx.closePath();

    ctx.strokeStyle = '#00AA00';
    ctx.lineWidth = 4;
    ctx.stroke();

    const srgbXYZ = rgbToXYZ(currentRGB, sRGB_TO_XYZ_MATRIX, srgbGamma);
    const srgbXy = xyzToXy(srgbXYZ);

    const adobeXYZ = rgbToXYZ(currentRGB, ADOBE_RGB_TO_XYZ_MATRIX, adobeRgbGamma);
    const adobeXy = xyzToXy(adobeXYZ);

    const srgbPos = xyToCanvas(srgbXy.x, srgbXy.y);
    ctx.beginPath();
    ctx.arc(srgbPos.x, srgbPos.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#0066FF';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '12px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.fillText(`(${srgbXy.x.toFixed(3)}, ${srgbXy.y.toFixed(3)})`, srgbPos.x + 12, srgbPos.y - 5);

    const adobePos = xyToCanvas(adobeXy.x, adobeXy.y);
    ctx.beginPath();
    ctx.arc(adobePos.x, adobePos.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#00AA00';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '12px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.fillText(`(${adobeXy.x.toFixed(3)}, ${adobeXy.y.toFixed(3)})`, adobePos.x + 12, adobePos.y + 15);
}

function updateAll() {
    currentRGB = hslToRgb(currentHSL.h, currentHSL.s, currentHSL.l);

    colorBox.style.backgroundColor = `rgb(${currentRGB.r}, ${currentRGB.g}, ${currentRGB.b})`;

    rgbValue.textContent = `RGB: (${currentRGB.r}, ${currentRGB.g}, ${currentRGB.b})`;
    hslDisplay.textContent = `HSL: (${currentHSL.h}°, ${currentHSL.s}%, ${currentHSL.l}%)`;

    const srgbXYZ = rgbToXYZ(currentRGB, sRGB_TO_XYZ_MATRIX, srgbGamma);
    const srgbXy = xyzToXy(srgbXYZ);

    const adobeXYZ = rgbToXYZ(currentRGB, ADOBE_RGB_TO_XYZ_MATRIX, adobeRgbGamma);
    const adobeXy = xyzToXy(adobeXYZ);

    srgbXY.textContent = `x: ${srgbXy.x.toFixed(4)}, y: ${srgbXy.y.toFixed(4)}`;
    adobergbXY.textContent = `x: ${adobeXy.x.toFixed(4)}, y: ${adobeXy.y.toFixed(4)}`;

    drawSaturationGradient();
    drawLightnessGradient();
    drawRGBSpectrum();
    drawCIEDiagram();
}

hueSlider.addEventListener('input', (e) => {
    currentHSL.h = parseInt(e.target.value);
    hueValue.textContent = `${currentHSL.h}°`;
    updateAll();
});

saturationSlider.addEventListener('input', (e) => {
    currentHSL.s = parseInt(e.target.value);
    saturationValue.textContent = `${currentHSL.s}%`;
    updateAll();
});

lightnessSlider.addEventListener('input', (e) => {
    currentHSL.l = parseInt(e.target.value);
    lightnessValue.textContent = `${currentHSL.l}%`;
    updateAll();
});

window.addEventListener('load', () => {
    init();

    currentHSL.h = parseInt(hueSlider.value) || 0;
    currentHSL.s = parseInt(saturationSlider.value) || 100;
    currentHSL.l = parseInt(lightnessSlider.value) || 50;

    hueSlider.value = currentHSL.h;
    saturationSlider.value = currentHSL.s;
    lightnessSlider.value = currentHSL.l;

    hueValue.textContent = `${currentHSL.h}°`;
    saturationValue.textContent = `${currentHSL.s}%`;
    lightnessValue.textContent = `${currentHSL.l}%`;

    drawHueGradient();
    updateAll();
});

window.addEventListener('resize', () => {
    drawHueGradient();
    drawSaturationGradient();
    drawLightnessGradient();
    drawRGBSpectrum();
    drawCIEDiagram();
});
