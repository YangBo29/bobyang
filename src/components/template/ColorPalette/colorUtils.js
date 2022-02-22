/**
 * author : yangbo
 * date : 2020/04/26 18:25:39
 * fileName: colorUtils.js
 * description : 调色板使用函数
 **/

// 截取类型判断字段
const _cutType = param => Object.prototype.toString.call(param).slice(8, -1);
const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/*RGB颜色转换为16进制*/
export const RGB2HEX = color => {
    if (/^(rgb|RGB)/.test(color)) {
        let aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
        return (
            '#' +
            (
                (1 << 24) +
                (parseInt(aColor[0], 10) << 16) +
                (parseInt(aColor[1], 10) << 8) +
                parseInt(aColor[2], 10)
            )
                .toString(16)
                .slice(1)
                .toUpperCase()
        );
    } else if (reg.test(color)) {
        let aNum = color.replace(/#/, '').split('');
        if (aNum.length === 6) {
            return color.toUpperCase();
        } else if (aNum.length === 3) {
            let numHex = '#';
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += aNum[i] + aNum[i];
            }
            return numHex.toUpperCase();
        }
    } else {
        return color.toUpperCase();
    }
};

/*16进制颜色转为RGB格式*/
export const HEX2RGB = color => {
    if (_cutType(color) !== 'String') return '#FFFFFF';
    let sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            let temp = Number(`0x${sColor.slice(i, i + 2)}`);
            sColorChange.push(temp);
        }
        return sColorChange;
    }
    return sColor;
};

// RGB 颜色转 HSB
export const RGB2HSB = (rgbR, rgbG, rgbB) => {
    rgbR = rgbR < 0 ? 0 : rgbR > 255 ? 255 : rgbR;
    rgbG = rgbR < 0 ? 0 : rgbG > 255 ? 255 : rgbG;
    rgbB = rgbB < 0 ? 0 : rgbB > 255 ? 255 : rgbB;

    let max = Math.max(rgbR, rgbG, rgbB);
    let min = Math.min(rgbR, rgbG, rgbB);
    let hsbB = max / 255;
    let hsbS = max === 0 ? 0 : (max - min) / max;
    let hsbH = 0;
    let denominator = max - min === 0 ? 1 : max - min;

    if (max === rgbR && rgbG >= rgbB) {
        hsbH = ((rgbG - rgbB) * 60) / denominator + 0;
    } else if (max === rgbR && rgbG < rgbB) {
        hsbH = ((rgbG - rgbB) * 60) / denominator + 360;
    } else if (max === rgbG) {
        hsbH = ((rgbB - rgbR) * 60) / denominator + 120;
    } else if (max === rgbB) {
        hsbH = ((rgbR - rgbG) * 60) / denominator + 240;
    }
    return [hsbH, hsbS, hsbB];
};

// HSB 颜色转 RGB
export const HSB2RGB = (h, s, v) => {
    // h = parseInt(h * 10, 10) / 10;
    // s = parseInt(s * 10, 10) / 10;
    // v = parseInt(v * 10, 10) / 10;
    let r = 0;
    let g = 0;
    let b = 0;
    let i = parseInt((h / 60) % 6, 10);
    let f = h / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        default:
            break;
    }

    // console.log(
    //     "i:" + i,
    //     "v:" + v,
    //     "f:" + f,
    //     "q:" + q,
    //     "p:" + p,
    //     "t:" + t,
    //     "r:" + r,
    //     "g:" + g,
    //     "b:" + b
    // );
    return [Math.round(r * 255, 10), Math.round(g * 255, 10), Math.round(b * 255, 10)];
};

// 纯色 8位色值转换
export const transPureColor = color => {
    if (color.length > 7) {
        let _hex = color.slice(0, 7);
        let _opt = parseInt(color.slice(7), 16);

        _opt = Math.round((_opt / 255) * 100);
        return {
            hex: _hex,
            A: _opt,
        };
    }

    return {
        hex: color,
        A: 100,
    };
};

// 纯色 8位色值转 RGBA
export const HEX2RGBA = color => {
    const HEX_A = transPureColor(color);
    const rgb = HEX2RGB(HEX_A.hex);
    const rgba = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${HEX_A.A / 100})`;

    return rgba;
};

// 空函数
export const noop = () => {};

// 判断是否是对象
export const isObject = param => _cutType(param) === 'Object';

// uuid
export const guid = (key = false) => {
    let res = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (Math.random() * 16) | 0;
        let v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    return key ? res : res.replace(/-/g, '');
};
