/**
 * author : yangbo
 * date : 2021/10/22 11:32:58
 * fileName: index.jsx
 * description : 颜色转换
 **/
import { reg, _cutType, guid } from './utils';
import _, { get } from 'lodash';

const default_gradient = {
    gradientRotate: 0, // 渐变角度
    gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
    gradientLocations: [0, 1], // 渐变位置数组
}

// 获取6位纯色
export const getPureHex = (color = '#FFFFFF') => color.replace(/#/, '').toUpperCase();

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

// 6~8位hex分离hex色值和透明度
export const transPureColor = (color = '#FFFFFFFF') => {
    // 替换掉#
    color = color.replace('#', '');
    // 默认色值
    let _hex = 'FFFFFFFF';
    // 默认透明度
    let _opt = 100;

    // 8位色值
    if (color.length > 6) {
        _hex = color.slice(0, 6);
        _opt = Math.round((parseInt(color.slice(6), 16) / 255) * 100);
    } else if (color.length === 6) {
        // 6位色值
        _hex = color.slice(0, 6);
    }

    // 返回值
    return {
        hex: '#' + _hex.toUpperCase(),
        A: _opt,
    };
};

// hex色值转 RGBA
export const HEX2RGBA = color => {
    const HEX = transPureColor(color);
    const rgb = HEX2RGB(HEX.hex);
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${HEX.A / 100})`;
};

export const drawRGBA = str => {
    let reg = /^rgba\(([\w\W]+)\)/;
    let color = str.match(reg);
    let rgba = get(color, '[1]', '255,255,255,1').split(',');
    return rgba;
};

// rgba 转 hex
export const RGBA2HEX = color => {
    let _reg = /^rgba\(([\w\W]+)\)/;
    let _color = color.match(_reg);
    let _rgba = get(_color, '[1]', '255, 255, 255, 1').split(',');
    let hex = RGB2HEX(`rgb(${_rgba[0]},${_rgba[1]},${_rgba[2]})`);

    let _opt = Math.round(_rgba[3] * 100 * 2.55)
        .toString(16)
        .toUpperCase(); // 透明度转 16 进制
    _opt = _opt.length < 2 ? '0' + _opt : _opt; // 界限判断

    return {
        hex_8: `${hex}${_opt}`,
        hex: hex,
        A: _rgba[3] * 100,
    };
};

// 计算过渡渐变色
export const computeTranColor = (c1, c2, stride) => {
    let _C1 = drawRGBA(c1);
    let _C2 = drawRGBA(c2);
    let step_r = Math.round(_C2[0] - _C1[0]) / stride;
    let step_g = Math.round(_C2[1] - _C1[1]) / stride;
    let step_b = Math.round(_C2[2] - _C1[2]) / stride;
    let step_a = Math.round(_C2[3] - _C1[3]) / stride;

    return [step_r, step_g, step_b, step_a];
};

// 生成渐变颜色保存格式
export const createSaveGrad = (grad, rotate = 0, type = 2) => {
    let gradColor_3d = `${type}-${rotate}-`;
    grad.forEach((item, i) => {
        const c = RGBA2HEX(item.color);
        gradColor_3d += `${item.pos}:${c.hex_8}${grad.length === i + 1 ? '' : '-'
        }`;
    });

    return gradColor_3d;
}

// 生成前端使用的渐变色色值
export const createGradient = (colors, rotate = 0, type = 2) => {
    let grad_color = [];
    // 循环处理，可使用颜色点
    colors.forEach((item) => {
        if (item.key) {
            grad_color.push(`${item.color} ${Math.round(item.pos * 100)}%`);
        }
    });
    const _colors = grad_color.join(',');

    if (type === 2) {
        return `linear-gradient(${(rotate + 90) % 360}deg,${_colors})`;
    }
    return `radial-gradient(${grad_color.join(',')})`;

}

// 生成前端使用的径向渐变色色值
export const createRadialGradient = (colors) => {
    let grad_color = [];
    // 循环处理，可使用颜色点
    colors.forEach((item) => {
        if (item.key) {
            grad_color.push(`${item.color} ${Math.round(item.pos * 100)}%`);
        }
    });

    return `radial-gradient(${grad_color.join(',')})`;
}

// 透明色十六进制和十进制转换
export const opt_sysConvert = (opt, convert = 10) => {
    let _opt;
    switch (convert) {
        case 10:
            return Math.floor((parseInt(opt, 16) / 255) * 100);
        case 16:
            _opt = Math.ceil(opt * 2.55).toString(16).toUpperCase();
            return _opt.length < 2 ? '0' + _opt : _opt;
        default:
            return 100;
    }
}

// 格式化渐变色（对象格式）
export const transGradient = (data = {}) => {
    let _gradientRotate = get(data, 'gradientRotate', 0); // 旋转角度
    let _gradientColors = get(data, 'gradientColors', []); //
    let _gradientLocation = get(data, 'gradientLocations', []);

    let res = {
        rotate: _gradientRotate,
        colorData: [],
    };

    // 录入颜色
    _gradientColors.forEach((item, i) => {
        res.colorData.push({
            id: guid(),
            color: HEX2RGBA(item),
            pos: _gradientLocation[i],
            key: true,
        });
    });

    res.gradient = createGradient(res.colorData);
    res.gradColor_3d = createSaveGrad(res.colorData, res.rotate)

    return res;
};

// 格式化渐变色（字符串格式）
export const transStrColor = (data = '1-0-0:#FFFFFFF') => {
    // 纯色
    if (/^#/.test(data)) {
        return {
            type: 1,
            rotate: 0,
            colorData: data,
            gradColor_3d: `1-0-${data}`
        }
    }

    // 定义导出数据
    let res = {};

    let _g = data.split('-') || [];
    // 颜色类型
    let type = _g[0] === void 0 ? 1 : +_g.shift();
    // 渐变色角度
    let deg = _g[0] === void 0 ? 90 : _g.shift();

    // TODO 容错 处理错误格式
    if (isNaN(Number(deg))) {
        const _t = deg.split('#');
        deg = +_t[0];
        _g.push(`#${_t[1]}`)
    }

    // 导出数据赋值
    res.type = type;
    res.rotate = +deg;
    res.colorData = [];

    // 透明或纯色
    if (type === 0 || type === 1) {
        // 如果值不存在
        if (_g[0] === void 0) _g[0] = '#FFFFFFFF';
        // 如果取出的色值不是 8 位hex色值
        if (!/^#([0-9a-fA-F]){8}/.test(_g[0])) _g[0] = '#FFFFFFFF';
        // 纯色或者透明色
        res.colorData = _g[0];
        // 保存进入色值
        res.gradColor_3d = `${type}-0-${_g[0]}`;
        return res;
    }

    // 渐变色
    _g.forEach(c => {
        c = c.split(':');
        res.colorData.push({
            id: guid(),
            color: HEX2RGBA(c[1]),
            pos: c[0],
            key: true,
        });
    })

    res.gradient = createGradient(res.colorData);
    // 保存渐变进入色值
    res.gradColor_3d = createSaveGrad(res.colorData, res.rotate, type);
    // 面板渐变色背景使用色值
    res.gradient_bg = createGradient(res.colorData, res.rotate, type);

    return res;
}

// 初始化色值
export const initColor = (data) => {
    let colorParams = {}

    // 对象色值
    if (_.isObject(data)) {
        // 转换渐变色
        let _grad = transGradient(data.gradientColor || default_gradient)
        // 将纯色转成 hex + a 格式
        let _c = transPureColor(data.solidColor)
        switch (+data.colorType) {
            case 0:
            case 1:
                // 透明色值 && 纯色
                colorParams = {
                    type: +data.colorType,
                    hex_8: data.solidColor,
                    color: _c.hex,
                    A: _c.A,
                    grad: _grad,
                    gradColor_3d: `${+data.colorType}-0-${data.solidColor}`
                }
                break;
            case 2:
                // 渐变色
                // 将渐变色第一个点的rgba值转换成hex + a 格式
                _c = RGBA2HEX(_grad.colorData[0].color)
                colorParams = {
                    type: 2,
                    hex_8: _c.hex_8,
                    color: _c.hex,
                    A: _c.A,
                    grad: _grad,
                    gradColor_3d: _grad.gradColor_3d
                }
                break;
            default:
                colorParams = {
                    type: 1,
                    hex_8: '#FFFFFFFF',
                    color: '#FFFFFF',
                    A: 100,
                    deg: 0,
                    grad: _grad,
                    gradColor_3d: `1-0-${data.solidColor}`
                }
                break
        }
    } else if (_.isString(data)) {
        // 转换渐变色
        let _grad = transGradient(default_gradient)
        // 字符串颜色转换
        const _res = transStrColor(data);
        let _c;

        switch (_res.type) {
            case 0:
            case 1:
                // 透明色值 && 纯色
                _c = transPureColor(_res.colorData ?? '#FFFFFFF')
                colorParams = {
                    type: _res.type,
                    hex_8: _res.colorData,
                    color: _c.hex,
                    A: _c.A,
                    grad: _grad,
                }
                break;
            case 2:
            case 3:
                // 渐变色
                // 将渐变色第一个点的rgba值转换成hex + a
                _c = RGBA2HEX(_res.colorData[0].color);
                colorParams = {
                    type: _res.type,
                    hex_8: _c.hex_8,
                    color: _c.hex,
                    A: _c.A,
                    grad: {
                        gradient: _res.gradient,
                        rotate: _res.rotate,
                        colorData: _res.colorData,
                    },
                }
                break;
            default:
                colorParams = {
                    type: 1,
                    hex_8: '#FFFFFFFF',
                    color: '#FFFFFF',
                    A: 100,
                    grad: _grad,
                }
                break;

        }

        colorParams.gradColor_3d = _res.gradColor_3d;
    }
    return colorParams;
}