import React, { useState, useRef, useEffect } from 'react';
import styles from './index.less';
import {
    HEX2RGB, // hex 转 rgb
    RGB2HEX, // rgb 转 hex
    RGB2HSB, // rgb 转 hsb
    HSB2RGB, // hsb 转 rgb
    noop,
    guid,
    isObject,
} from './colorUtils';
import _ from 'lodash';
import ReactDom from 'react-dom';
import { sysColor } from './sysColor';

// 预存背景色 （当选中颜色为无彩系 且 不是非填充状态 时用到）
let color_panel_bg = '#FFFFFF';
// 缓存初始色值
let color_init = '';
// 常用颜色
let custom = JSON.parse(localStorage.getItem('custom')) || [];
// 显示状态
// let resStore = '';

const baseProps = {
    defaultColor: sysColor, // 系统设置颜色
    params: {
        colorType: 1,
        solidColor: '#4E98CBFF', // 默认色值
        gradientColor: {
            gradientRotate: 0, // 渐变角度
            gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
            gradientLocations: [0, 1], // 渐变位置数组
        },
    },
    top: '25%', // 初始定位置 y 轴  str/num
    left: '14%', // 初始定位置 x 轴 str/num
    getColor: noop, // 获取返回值 func
    closePanel: noop, // 关闭面板 func
    show: false, // 组件显隐开关
    pure: false, // 开启纯色模式
    isTran: true, // 是否支持透明色
    pointNode: 5, // 渐变色节点数量
};

// 格式化渐变色数据
function transGradient(data) {
    let _gradientRotate = _.get(data, 'gradientRotate', 0); // 旋转角度
    let _gradientColors = _.get(data, 'gradientColors', []); //
    let _gradientLocation = _.get(data, 'gradientLocations', []);

    let res = {
        rotate: _gradientRotate,
        gradData: [],
    };

    // 录入颜色
    _gradientColors.forEach((item, i) => {
        res.gradData.push({
            id: guid(),
            color: transHex_8(item),
            pos: _gradientLocation[i],
            key: true,
        });
    });

    return res;
}

// 渐变色 8位色值转换
function transHex_8(color) {
    if (color.length > 7) {
        let _rgb = HEX2RGB(color.slice(0, 7));
        let _opt = parseInt(color.slice(7), 16);

        _opt = Math.round((_opt / 255) * 100) / 100;
        return `rgba(${_rgb[0]},${_rgb[1]},${_rgb[2]},${_opt})`;
    }

    const _c = HEX2RGB(color);
    return `rgba(${_c[0]},${_c[1]},${_c[2]},1)`;
}

// 纯色 8位色值转换
function transPureColor(color) {
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
}

// rgba 转 16进制
function RGBA2HEX(color) {
    let _reg = /^rgba\(([\w\W]+)\)/;
    let _color = color.match(_reg);
    let _rgba = _.get(_color, '[1]', '255, 255, 255, 1').split(',');
    let rgb = RGB2HEX(`rgb(${_rgba[0]},${_rgba[1]},${_rgba[2]})`);

    let _opt = Math.round(_rgba[3] * 100 * 2.55)
        .toString(16)
        .toUpperCase(); // 透明度转 16 进制
    _opt = _opt.length < 2 ? '0' + _opt : _opt; // 界限判断

    return `${rgb}${_opt}`;
}

// 提取 rgba 中的 rgba 值
function drawRGB(str) {
    let reg = /^rgba\(([\w\W]+)\)/;
    let color = str.match(reg);
    let rgba = _.get(color, '[1]', '255,255,255,1').split(',');
    return rgba;
}

// 计算过渡色
function computeTranColor(c1, c2, stride) {
    let _C1 = drawRGB(c1);
    let _C2 = drawRGB(c2);
    let step_r = Math.round(_C2[0] - _C1[0]) / stride;
    let step_g = Math.round(_C2[1] - _C1[1]) / stride;
    let step_b = Math.round(_C2[2] - _C1[2]) / stride;
    let step_a = Math.round(_C2[3] - _C1[3]) / stride;

    return [step_r, step_g, step_b, step_a];
}

// 对比两个渐变色是否相等
function comparisonTranColor(c1, c2) {
    let c1_data = _.get(c1, 'gradData', []);
    let c2_data = _.get(c2, 'gradData', []);
    let c1_rotate = _.get(c1, 'rotate', NaN);
    let c2_rotate = _.get(c2, 'rotate', NaN);

    if (c1_data.length === 0 || c2_data.length === 0) return false;
    if (c1_data.length !== c2_data.length) return false;

    let grad_color1 = [];
    let grad_color2 = [];

    c1_data.forEach((item, i) => {
        grad_color1.push(`${item.color} ${Math.round(item.pos * 100)}%`);
        grad_color2.push(`${c2_data[i].color} ${Math.round(c2_data[i].pos * 100)}%`);
    });

    const _colors1 = grad_color1.join(',');
    const _colors2 = grad_color2.join(',');

    return c1_rotate === c2_rotate && _colors1 === _colors2;
}

// 去除色值 # 号
let getPureHex = (color = '#FFFFFF') => color.replace(/#/, '').toUpperCase();

// 阻止冒泡
function stopEvent(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
}

function ColorPalette(props) {
    const {
        show = props.show, // 组件显示
        top = baseProps.top, // 初始 top 位置
        left = baseProps.left, // 初始 left 位置
        closePanel = baseProps.closePanel, // 关闭调色板
        getColor = baseProps.getColor, // 返回颜色结果
        defaultColor = baseProps.defaultColor, // 系统设置颜色
        colorType = baseProps.params.colorType, // 颜色类型
        solidColor = baseProps.params.solidColor, // 纯色色值
        gradientColor = baseProps.params.gradientColor, // 渐变色色值
        pure = baseProps.pure, // 纯色模式
        isTran = baseProps.isTran, // 是否支持透明色
        pointNode = baseProps.pointNode, // 渐变色节点数量
    } = props;
    // 缓存上一次色值
    const resStore = useRef('');

    // 格式化渐变色
    const storeGraduent = transGradient(gradientColor);

    // 格式化8位色值
    const init_color =
        colorType === 2
            ? RGBA2HEX(_.get(storeGraduent, 'gradData[0].color', '#FFFFFFFF'))
            : solidColor;
    color_init = transPureColor(init_color);

    // 缓存
    const storeSolid = useRef(color_init); // 缓存纯色色值

    // 初始化变量
    const [color, setColor] = useState(getPureHex(color_init.hex)); // 色值
    const [A, setA] = useState(color_init.A); // 初始 A 值
    const [type, setType] = useState(colorType !== undefined ? colorType : 1); // 颜色类型， 0：透明， 1：单色， 2：渐变色
    const [grad, setGrad] = useState(''); // 渐变色
    const [gradColor, setGradColor] = useState(storeGraduent); // 渐变色数据
    const [point, setPoint] = useState(storeGraduent.gradData[0]); // 渐变色的当前选中点
    const [yc, setYC] = useState(false); // 预选颜色<false>和最近使用<true> tab 切换

    // dom
    const colorPanel = useRef(null); // 面板
    const gradArea = useRef(null); // 渐变色阀值操作区域
    const angleWarp = useRef(null); // 渐变色角度操作区域
    const angleInput = useRef(null); // 渐变色角度输入框
    const opt_rail = useRef(null); // 透明度条
    const h_rail = useRef(null); // 色域条
    const base_layer = useRef(null); // 当前色域面板
    const select_color = useRef(null); // 当前选中色
    const s_v_panel = useRef(null); // 颜色面板
    const c_pointer = useRef(null); // 颜色面板点
    const h_point = useRef(null); // 色域点
    const opt_point = useRef(null); // 透明度点
    const color_r = useRef(null); // r 值
    const color_g = useRef(null); // g 值
    const color_b = useRef(null); // b 值
    const color_a = useRef(null); // a 值
    const hex = useRef(null); // hex 值

    // 点击任意处关闭调色板
    useEffect(() => {
        function closeView() {
            if (closePanel && typeof closePanel === 'function') {
                // 关闭组件时保存本次选择颜色
                let temp_custom = custom;

                if (type === 1) {
                    let _tempGrad = temp_custom.filter(item => {
                        let flag = false;

                        if (!isObject(item)) {
                            flag = item === `#${color}`;
                        }
                        return !flag;
                    });

                    _tempGrad.unshift(`#${color}`);
                    temp_custom = _tempGrad;
                } else if (type === 2) {
                    let _tempGrad = temp_custom.filter(item => {
                        let flag = false;

                        if (isObject(item)) {
                            flag = comparisonTranColor(item, gradColor);
                        } else {
                            flag = item === `#${color}`;
                        }

                        return !flag;
                    });

                    _tempGrad.unshift(gradColor);

                    temp_custom = _tempGrad;
                }

                temp_custom = temp_custom.slice(0, 24);
                localStorage.setItem('custom', JSON.stringify(temp_custom));
                closePanel();
            }
        }

        document.addEventListener('mousedown', closeView, false);

        return () => {
            document.removeEventListener('mousedown', closeView);
        };
    },[closePanel, color, gradColor, type]);

    // 初始化面板数据
    useEffect(() => {
        // 将当前色值转成 rgb 格式
        let inti_color = color_init;
        let rgb = HEX2RGB(`#${getPureHex(inti_color.hex)}`);
        // 当前色的 hsb 值
        let _hsb = RGB2HSB(rgb[0], rgb[1], rgb[2]);
        let extr = HSB2RGB(_hsb[0], 1, 1);
        let h = _hsb[0];
        let s = _hsb[1];
        let b = _hsb[2];
        let x = s * 100;
        let y = (1 - b) * 100;

        // 色域点色值设置
        h_point.current.style.left = `${Math.round((h * 100) / 360)}%`;
        h_point.current.style.background = `rgb(${extr[0]},${extr[1]},${extr[2]})`;

        // sb 点位置
        c_pointer.current.style.top = `${y}%`;
        c_pointer.current.style.left = `${x}%`;

        // 变更色域面板色值
        base_layer.current.style.background = color_panel_bg = RGB2HEX(
            `rgb(${extr[0]},${extr[1]},${extr[2]})`,
        );

        // 透明度点
        opt_point.current.style.background = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]},${inti_color.A /
            100}) `;

        // 透明度条
        opt_rail.current.style.background = `linear-gradient(to right,transparent 0%,rgb(${rgb[0]},${rgb[1]},${rgb[2]}) 100%)`;

        // 组件加载时更新常用色值
        custom = JSON.parse(localStorage.getItem('custom')) || [];
    }, []);

    // color 值发生改变时
    useEffect(() => {
        // 将当前色值转成 rgb 格式
        let rgb = HEX2RGB(`#${color}`);

        hex.current.value = color;
        color_r.current.value = rgb[0];
        color_g.current.value = rgb[1];
        color_b.current.value = rgb[2];

        opt_rail.current.style.background = `linear-gradient(to right,transparent 0%,rgb(${rgb[0]},${rgb[1]},${rgb[2]}) 100%)`;
    }, [color]);

    // 透明度和色值发生变化时
    useEffect(() => {
        // 将当前色值转成 rgb 格式
        let rgb = HEX2RGB(`#${color}`);

        color_a.current.value = A;
        opt_point.current.style.background = select_color.current.style.background = `rgba(${
            rgb[0]
        }, ${rgb[1]}, ${rgb[2]},${A / 100}) `;
    }, [color, A]);

    // （渐变色模式）选择颜色后同步更新到选中点
    useEffect(() => {
        // 纯色模式下发生颜色变化
        if (type === 1) {
            storeSolid.current = {
                hex: `#${color}`,
                A,
            };
        }
        // 渐变色面板激活处理
        if (type === 2) {
            // 将当前色值转成 rgb 格式
            let rgb = HEX2RGB(`#${color}`);
            setPoint(state => {
                state.color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]},${A / 100}) `;
                return { ...state };
            });
        }
    }, [color, A, type]);

    // 选中渐变色点发生变更时，同步更新到总数据中
    useEffect(() => {
        setGradColor(state => {
            state.gradData.map(item => {
                if (item.id === point.id) {
                    item.color = point.color;
                }

                return item;
            });
            return { ...state };
        });
    }, [point]);

    // 渐变色计算
    useEffect(() => {
        let grad_color = [];

        gradColor.gradData.forEach((item, i) => {
            if (item.key) {
                grad_color.push(`${item.color} ${Math.round(item.pos * 100)}%`);
            }
        });
        const _colors = grad_color.join(',');
        let template = `linear-gradient(90deg,${_colors})`;

        // 更新渐变色
        setGrad(template);
    }, [gradColor]);

    // 面板拖拽
    function dragPanel(ev) {
        ev.persist();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
        if (ev.button !== 0) return;
        const event = window.event;
        event.preventDefault();
        const { pageX, pageY } = event;
        const { left, top } = colorPanel.current.getBoundingClientRect(); // 获取容器位置信息

        let dx = pageX - left;
        let dy = pageY - top;

        document.onmousemove = function() {
            const event = window.event;
            event.preventDefault();
            const { pageX: mx, pageY: my } = event;

            const move_x = mx - dx;
            const move_y = my - dy;

            // 设置点的位置
            colorPanel.current.style.top = `${move_y}px`;
            colorPanel.current.style.left = `${move_x}px`;
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }

    // 输出新数据
    useEffect(() => {
        // 输出新数据
        function outputColor() {
            let res = {
                colorType: type,
                solidColor: '', // 默认色值da
                gradientColor: {
                    gradientRotate: 0, // 渐变角度
                    gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
                    gradientLocations: [0, 1], // 渐变位置数组
                },
                webGrad: grad.replace(/(\d+)deg/g, `${gradColor.rotate + 90}deg`),
                webSolid: ``,
                gradColor_3d: '',
                webHex: `#${color}`,
                webOpt: A,
            };

            // 返回3D使用色值
            let gradColor_3d = `${type}-`;

            if (type === 0) {
                // 添加3D可用色值
                res.gradColor_3d = `${gradColor_3d}0-#FFFFFF00`;
            } else if (type === 1) {
                let _opt = Math.round(A * 2.55)
                    .toString(16)
                    .toUpperCase(); // 透明度转 16 进制
                _opt = _opt.length < 2 ? '0' + _opt : _opt; // 界限判断
                let _color = `#${color}` + _opt;
                // 添加纯色色值
                res.solidColor = _color;
                // 添加3D可用色值
                res.gradColor_3d = `${gradColor_3d}0-${_color}`;

                // 页面引用色
                let rgb = HEX2RGB(`#${color}`);
                res.webSolid = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${A / 100})`;
            } else if (type === 2) {
                // 渐变色数据模板
                let _gradientColor = {
                    gradientRotate: 0, // 渐变角度
                    gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
                    gradientLocations: [0, 1], // 渐变位置数组
                };

                // 角度赋值
                gradColor_3d += `${gradColor.rotate}-`;
                // 迭代渐变色数据
                _gradientColor.gradientRotate = gradColor.rotate; // 角度
                // 色值 | 位置
                gradColor.gradData.forEach((item, i) => {
                    _gradientColor.gradientColors[i] = RGBA2HEX(item.color);
                    _gradientColor.gradientLocations[i] = item.pos;
                    gradColor_3d += `${item.pos}:${RGBA2HEX(item.color)}${
                        gradColor.gradData.length === i + 1 ? '' : '-'
                    }`;
                });

                res.gradientColor = _gradientColor; // 2D 渐变色
                res.gradColor_3d = gradColor_3d; // 3D 渐变色
            }

            if (getColor && typeof getColor === 'function') {
                let _old = resStore.current.replace(/\s/g, '');
                let _new = JSON.stringify(res).replace(/\s/g, '');
                if (_old === _new) return;
                resStore.current = _new;
                getColor(res);
            }
        }

        outputColor();
    });

    // 切换调色板模式
    function switchType(n) {
        setType(n);

        if (n === 1) {
            let rgb = HEX2RGB(storeSolid.current.hex);
            let rgba = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${storeSolid.current.A / 100})`;
            syncInfo(rgba, n);
        }

        // 如果是渐变色 默认选中当前第一个点的颜色
        if (n === 2) {
            syncInfo(gradColor.gradData[0].color, n);
            setPoint(gradColor.gradData[0]);
        }
    }

    // 预设颜色选区
    function selectSysColor(sysColor) {
        // 如过传入的色值是对象
        if (isObject(sysColor)) {
            let _sysColor = JSON.parse(JSON.stringify(sysColor));

            // 预选颜色渐变色节点大于当前允许增加的最大节点数
            if (pointNode < _.get(_sysColor, 'gradData', []).length) {
                _sysColor.gradData = _sysColor.gradData.slice(0, pointNode);
                const len = _sysColor.gradData.length - 1;

                _sysColor.gradData = _sysColor.gradData.map((c, i) => {
                    // 计算新节点位置
                    let pos = Math.round((i / len) * 100) / 100;
                    // 更换节点位置
                    c.pos = pos;
                    return c;
                });
            }

            // 变更渐变色数据
            setGradColor(_sysColor);
            // 默认选中第一个阀点
            setPoint(_sysColor.gradData[0]);
            // 颜色面板同步更新第一个阀点的颜色信息
            syncInfo(_sysColor.gradData[0].color);
            if (!pure) {
                // 切换到渐变色页面
                setType(2);
            }

            // 如果已经在渐变色页面上时，直接改变 dom 数值
            if (angleInput.current) {
                angleInput.current.value = Math.round(sysColor.rotate % 360);
            }
        } else {
            let rgbaColor = transHex_8(sysColor);
            syncInfo(rgbaColor);
        }
    }

    //　改变色值后 重新计算
    // hex: 6位色值
    // n: 切换模式编号，如果不存在既根据色值变化切换模式，如果传值说明是主动切换模式则跳过根据颜色识别模式处理
    function getExtr(hex, n) {
        // 将当前色值转成 rgb 格式
        let rgb = HEX2RGB(hex);
        // 当前色的 hsb 值
        let _hsb = RGB2HSB(rgb[0], rgb[1], rgb[2]);
        let extr = HSB2RGB(_hsb[0], 1, 1);
        let h = _hsb[0];
        let s = _hsb[1];
        let b = _hsb[2];
        let x = s * 100;
        let y = (1 - b) * 100;

        if (!(rgb[0] === rgb[1] && rgb[1] === rgb[2])) {
            // 色域点色值设置
            h_point.current.style.left = `${Math.round((h * 100) / 360)}%`;
            h_point.current.style.background = `rgb(${extr[0]},${extr[1]},${extr[2]})`;
        }

        // sb 点位置
        c_pointer.current.style.top = `${y}%`;
        c_pointer.current.style.left = `${x}%`;

        if (rgb[0] === rgb[1] && rgb[1] === rgb[2]) {
            // 非彩色值
            base_layer.current.style.background = color_panel_bg;
        } else {
            // 变更色域面板色值
            base_layer.current.style.background = color_panel_bg = RGB2HEX(
                `rgb(${extr[0]},${extr[1]},${extr[2]})`,
            );
        }

        // 如果处于非填充状态时
        !n && type === 0 && setType(1);
        // if (type === 0) {
        //     setType(1);
        // }

        // 设置
        setColor(getPureHex(hex));
    }

    // 渐变色点发生改变时，同步面板信息
    // rgbaColor: rgba色值
    // n: 切换模式编号，如果不存在既根据色值变化切换模式，如果传值说明是主动切换模式则跳过根据颜色识别模式处理
    function syncInfo(rgbaColor, n) {
        // 同步面板信息
        let rgba = drawRGB(rgbaColor);
        let hex = RGB2HEX(`rgb(${rgba[0]},${rgba[1]},${rgba[2]})`);
        getExtr(hex, n); //

        // 同步透明度
        setA(rgba[3] * 100);
    }

    // 增加渐变色阀值
    function createThreshold() {
        if (gradColor.gradData.length >= pointNode) return;
        let ev = window.event;
        let { pageX } = ev;
        let { left, width } = gradArea.current.getBoundingClientRect();
        let space = pageX - left - 5;

        let position = Math.round((space * 100) / (width - 10)); //触发点
        let maxPos = gradColor.gradData.length - 1; // 最右边下角标
        let minPos = 0; // 最左边定位

        // 寻找增加点两侧的相邻点
        gradColor.gradData.forEach((item, i) => {
            if (item.pos > gradColor.gradData[minPos].pos && item.pos < position / 100) {
                minPos = i;
            }

            if (item.pos < gradColor.gradData[maxPos].pos && item.pos > position / 100) {
                maxPos = i;
            }
        });

        // 计算相邻两点的距离
        let stride = (gradColor.gradData[maxPos].pos - gradColor.gradData[minPos].pos) * 100;

        // 计算增长步幅
        let inc = computeTranColor(
            gradColor.gradData[minPos].color,
            gradColor.gradData[maxPos].color,
            stride === 0 ? 1 : stride,
        );
        // 计算后 得到改变后的信息
        let newPoint_inc = Math.round(position - gradColor.gradData[minPos].pos * 100);
        let prev_c = drawRGB(gradColor.gradData[minPos].color);
        let computed_r = Math.round(Number(prev_c[0]) + newPoint_inc * inc[0]);
        let computed_g = Math.round(Number(prev_c[1]) + newPoint_inc * inc[1]);
        let computed_b = Math.round(Number(prev_c[2]) + newPoint_inc * inc[2]);
        let computed_a = Math.round((Number(prev_c[3]) + newPoint_inc * inc[3]) * 100) / 100;

        // 新增数据
        const newGrad = {
            id: guid(),
            color: `rgba(${computed_r},${computed_g},${computed_b},${computed_a})`,
            pos: position / 100,
            key: true,
        };

        // 同步面板信息
        let hex = RGB2HEX(`rgb(${computed_r},${computed_g},${computed_b})`);
        getExtr(hex);
        setA(computed_a * 100);

        // 增加点
        setGradColor(state => {
            state.gradData.push(newGrad);

            state.gradData.sort((a, b) => a.pos - b.pos);
            return { ...state };
        });
        setPoint(newGrad);
    }

    // 拖拽阀值点
    function dragThreshold(obj, ev) {
        ev.persist();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
        if (ev.button !== 0) return;
        const event = window.event;
        event.preventDefault();
        const {
            left: referL,
            top: referT,
            width: referW,
        } = gradArea.current.getBoundingClientRect(); // 获取容器位置信息
        let isBreak = false; // y 轴是否脱离位置

        // 设置选中点
        setPoint(obj);

        // 同步面板信息
        syncInfo(obj.color);

        document.onmousemove = function() {
            const event = window.event;
            event.preventDefault();

            const { pageX, pageY } = event;
            let move_x = pageX - referL - 5; // x 偏移量
            let move_y = pageY - referT; // y 偏移量
            let position_x = Math.floor((move_x * 100) / (referW - 10)); // 计算移动增量
            position_x = position_x > 100 ? 100 : position_x <= 0 ? 0 : position_x; // 边界判断

            // 变更当前阀值数据
            let _temp = gradColor.gradData
                .map(item => {
                    if (item.id === obj.id) {
                        item.pos = position_x / 100;
                    }
                    return item;
                })
                .sort((a, b) => a.pos - b.pos);

            // 当点数超过2个， Y 轴上下超出25px；
            if (gradColor.gradData.length > 2 && Math.abs(move_y) > 25) {
                isBreak = true;

                _temp.forEach(item => {
                    if (item.id === obj.id) {
                        item.key = false;
                    }
                });
                setGradColor({ ...gradColor, gradData: _temp });

                // 变更位移除样式
                ev.target.style.top = `${pageY - 5}px`;
                ev.target.style.left = `${pageX}px`;
                ev.target.style.position = 'fixed';
                ev.target.style.opacity = 0.3;
            } else {
                isBreak = false;

                _temp.forEach(item => {
                    if (item.id === obj.id) {
                        item.key = true;
                    }
                });
                setGradColor({ ...gradColor, gradData: _temp });

                // 恢复样式
                ev.target.style.top = '-3px';
                ev.target.style.left = `${position_x}%`;
                ev.target.style.position = 'absolute';
                ev.target.style.opacity = 1;
            }
        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;

            // y 轴脱离范围删除阀值
            if (isBreak) {
                let moved = gradColor.gradData.filter(item => item.id !== obj.id);
                // 同步面板信息
                syncInfo(moved[0].color);
                // 删除后默认选中第一个点
                setPoint(moved[0]);
                setGradColor({ ...gradColor, gradData: moved });
            }
        };
    }

    // 角度拖拽
    function dragAnglePoint(ev) {
        ev.persist();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
        if (ev.button !== 0) return;
        dragAngleFn();

        document.onmousemove = function() {
            const event = window.event;
            event.preventDefault();
            dragAngleFn();
        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }

    // 角度拖拽计算函数
    function dragAngleFn() {
        const { pageX } = window.event; // 鼠标X值
        const { left, width } = angleWarp.current.getBoundingClientRect(); // 操作区域
        const angle_x = pageX - left; // 获取当前区域中鼠标点的位置
        let angle_dx = Math.round(((angle_x - 4) * 100) / (width - 8)) / 100; // 计算初始点位置
        angle_dx = angle_dx <= 0 ? 0 : angle_dx >= 1 ? 1 : angle_dx; // 边界判断

        // 保存点初始位置
        setGradColor(state => {
            return { ...state, rotate: Math.round(angle_dx * 360) };
        });
        angleInput.current.value = Math.round(angle_dx * 360);
    }

    // 角度修改
    function changeAngle() {
        let val = angleInput.current.value;

        if (val.length > 1) {
            val = val.replace(/^0/, '');
        }

        let check_val = val.replace(/\D/g, '');
        check_val = check_val === 360 ? 360 : check_val > 360 ? check_val % 360 : check_val;
        angleInput.current.value = check_val; // 限制输入值在 0 - 360
        // 保存点初始位置
        setGradColor(state => {
            return { ...state, rotate: Number(check_val) };
        });
    }

    // 透明度拖动条
    function dragOpacityBar(ev) {
        ev.persist();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
        if (ev.button !== 0) return;
        dragOptFn();

        document.onmousemove = function() {
            const event = window.event;
            event.preventDefault();
            dragOptFn();
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }

    // 透明度拖动计算函数
    function dragOptFn() {
        const { pageX } = window.event;
        const { left, width } = opt_rail.current.getBoundingClientRect();
        let dx = Math.round(((pageX - left) * 100) / width);
        dx = dx >= 100 ? 100 : dx <= 0 ? 0 : dx;

        // 如果当前是透明模式时，颜色发生变化则转为纯色
        if (type === 0) {
            setType(1);
        }
        setA(dx);
    }

    // 色域拖动条
    function dragHBar(ev) {
        ev.persist();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
        if (ev.button !== 0) return;
        dragHFn();

        document.onmousemove = function() {
            const event = window.event;
            event.preventDefault();
            dragHFn();
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }

    // 色域拖动计算函数
    function dragHFn() {
        const { pageX } = window.event;
        const { left, width } = opt_rail.current.getBoundingClientRect();
        let dx = ((pageX - left) * 100) / width;
        dx = dx > 99.999999 ? 99.999999 : dx <= 0 ? 0 : dx;

        // h 从进度条范围转换到H范围 即 0-100 --> 0-360 不能等于360
        let _h = dx * 3.6;
        // 获取当前色的RGB值
        let rgb = HEX2RGB(`#${color}`);
        // 获取当前色的HSB值
        let HSB = RGB2HSB(rgb[0], rgb[1], rgb[2]);
        // 获取极值颜色
        let extr = HSB2RGB(_h, 1, 1);
        // 获取当前色和当前选中h对应色域的RGB
        let RGB = HSB2RGB(_h, HSB[1], HSB[2]);
        let HEX = RGB2HEX(`rgb(${RGB[0]},${RGB[1]},${RGB[2]})`);

        // 变更色域面板色值
        base_layer.current.style.background = `rgb(${extr[0]},${extr[1]},${extr[2]})`;
        // 缓存当前极值色值
        color_panel_bg = RGB2HEX(`rgb(${extr[0]},${extr[1]},${extr[2]})`);

        // 色域点色值设置
        h_point.current.style.left = `${dx}%`;
        h_point.current.style.background = `rgb(${extr[0]},${extr[1]},${extr[2]})`;

        // 当前色是无彩系且不是无填充状态
        if (type === 0 && rgb[0] === rgb[1] && rgb[1] === [2]) return;

        // 如果当前是透明模式时，颜色发生变化则转为纯色
        if (type === 0) {
            setType(1);
        }

        // 设置 hsb 对应的值
        setColor(getPureHex(HEX).toUpperCase());
    }

    // 颜色面板区域选择
    function dragColorPanel(ev) {
        ev.persist();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
        if (ev.button !== 0) return;
        dragPanelFn();

        document.onmousemove = function() {
            const event = window.event;
            event.preventDefault();
            dragPanelFn();
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }

    // 颜色面板区域计算
    function dragPanelFn() {
        const { pageX, pageY } = window.event;
        const { left, top, width, height } = s_v_panel.current.getBoundingClientRect(); // 颜色面板位置信息
        let dx = pageX - left;
        let dy = pageY - top;
        dx = dx > width ? width : dx <= 0 ? 0 : dx; // 边界判断
        dy = dy > height ? height : dy <= 0 ? 0 : dy; // 边界判断

        // 设置点的位置
        c_pointer.current.style.top = `${dy}px`;
        c_pointer.current.style.left = `${dx}px`;

        // x = s 左小右大 ; y = b 上大下小
        let s = dx / width;
        let b = 1 - dy / height;

        // 获取当前色的RGB值
        let rgb = HEX2RGB(`#${color}`);
        // 获取当前色的HSB值
        let HSB = RGB2HSB(rgb[0], rgb[1], rgb[2]);
        // 根据当前的s,b 获取计算后的rgb值
        let RBG = HSB2RGB(HSB[0], s, b);

        if (rgb[0] === rgb[1] && rgb[1] === rgb[2]) {
            // 无彩系处理，获取预存背景色
            let BGRGB = HEX2RGB(color_panel_bg);
            let BGHSB = RGB2HSB(BGRGB[0], BGRGB[1], BGRGB[2]);
            RBG = HSB2RGB(BGHSB[0], s, b);
        }

        // 获取 hex 值
        let HEX = RGB2HEX(`rgb(${RBG[0]},${RBG[1]},${RBG[2]})`);

        // 设置相应控制面板参数
        setColor(getPureHex(HEX));

        if (type === 0) {
            setType(1);
        }

        // 如果当前是渐变色编辑时
        if (type === 2) {
            setPoint(state => {
                state.color = `rgba(${RBG[0]},${RBG[1]},${RBG[2]},${A / 100})`;
                return { ...state };
            });

            setGradColor(state => {
                state.gradData.map(item => {
                    if (item.id === point.id) {
                        item.color = `rgba(${RBG[0]},${RBG[1]},${RBG[2]},${A / 100})`;
                    }

                    return item;
                });

                return { ...state };
            });
        }
    }

    // 手动修改 rgba 值
    function rgbaChange(ev) {
        ev.persist();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();

        let val = ev.target.value;

        if (val.length > 1) {
            val = val.replace(/^0/g, '');
        }

        ev.target.value = val.replace(/[^0-9]/g, '');
    }

    // 手动修改 hex 值
    function hexChange(ev) {
        ev.persist();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();

        let val = ev.target.value;
        ev.target.value = val.replace(/[^0-9a-fA-F]/g, '');

        // 中文模式下输入超过6个字符，后面的截取掉
        if (val.length > 6) {
            ev.target.value = ev.target.value.substr(0, 6);
        }
    }

    // 输入框回车事件
    function inputKeyUp(ev) {
        ev.persist();
        let key = ev.keyCode;
        if (key === 13) {
            ev.target.blur();
        }
    }

    // 保存修改
    function saveValue(type, ev) {
        let val = ev.target.value;
        let reg = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        let _hex = hex;
        // 获取当前色的RGB值
        let rgb = HEX2RGB(`#${color}`);

        if (type === 'hex') {
            if (!reg.test(val)) return; // 不符合条件禁止修改色值
            if (val.length === 3) {
                val = [val[0], val[0], val[1], val[1], val[2], val[2]].join('');
            }
            _hex = `#${val.toUpperCase()}`;
        } else if (type === 'R') {
            val = val > 255 ? 255 : val < 0 ? 0 : val;
            _hex = RGB2HEX(`rgb(${val},${rgb[1]},${rgb[2]})`);
            color_r.current.value = val;
        } else if (type === 'G') {
            val = val > 255 ? 255 : val < 0 ? 0 : val;
            _hex = RGB2HEX(`rgb(${rgb[0]},${val},${rgb[2]})`);
            color_g.current.value = val;
        } else if (type === 'B') {
            val = val > 255 ? 255 : val < 0 ? 0 : val;
            _hex = RGB2HEX(`rgb(${rgb[0]},${rgb[1]},${val})`);
            color_b.current.value = val;
        } else if (type === 'A') {
            val = val > 100 ? 100 : val < 0 ? 0 : val;
            color_a.current.value = val;
            setA(val);
            return;
        }

        getExtr(_hex);
    }

    // 切换备选颜色
    function switchCustom(type) {
        setYC(type);
    }

    if (!show) return null; // 关闭面板

    return ReactDom.createPortal(
        <div
            className={styles.color_panel}
            style={{ top, left }}
            onClick={ev => {
                ev.stopPropagation();
                ev.nativeEvent.stopImmediatePropagation();
            }}
            onMouseDown={ev => {
                ev.stopPropagation();
                ev.nativeEvent.stopImmediatePropagation();
            }}
            ref={colorPanel}
        >
            <div className={styles.drag_move} onMouseDown={dragPanel}></div>
            {/* 颜色填充类型选择 */}
            <div className={styles.color_panel_main}>
                <div className={styles.color_panel_header}>
                    {isTran ? (
                        <span
                            className={`${styles.tran_color} ${type === 0 ? styles.color_act : ''}`}
                            onClick={switchType.bind(null, 0)}
                        ></span>
                    ) : null}
                    <span
                        className={`${styles.pure_color} ${type === 1 ? styles.color_act : ''}`}
                        onClick={switchType.bind(null, 1)}
                    ></span>
                    {!pure ? (
                        <span
                            className={`${styles.grad_color} ${type === 2 ? styles.color_act : ''}`}
                            onClick={switchType.bind(null, 2)}
                        ></span>
                    ) : null}
                </div>

                {!pure && type === 2 ? (
                    <>
                        {/* 渐变色阀值设置 */}
                        <div className={styles.grad_setting}>
                            <div className={styles.grad_area} ref={gradArea}>
                                <div className={styles.grad_area_bg}>
                                    <div
                                        className={styles.grad_area_color}
                                        onClick={createThreshold}
                                        style={{ background: grad }}
                                    >
                                        <div className={styles.grad_path}>
                                            {gradColor.gradData.map((item, i) => {
                                                return (
                                                    <span
                                                        key={item.id}
                                                        style={{
                                                            left: `${item.pos * 100}%`,
                                                            background:
                                                                item.id === point.id
                                                                    ? point.color
                                                                    : item.color,
                                                            zIndex: i,
                                                        }}
                                                        className={`${styles.grad_point} ${
                                                            point.id === item.id
                                                                ? styles.grad_point_act
                                                                : ''
                                                        }`}
                                                        onMouseDown={dragThreshold.bind(null, item)}
                                                        onClick={ev => {
                                                            ev.stopPropagation();
                                                            ev.nativeEvent.stopImmediatePropagation();
                                                        }}
                                                        draggable
                                                    ></span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 渐变色角度调整 */}
                        <div className={styles.grad_angle}>
                            <p className={styles.angle_txt}>旋转角度</p>
                            <div
                                className={styles.angle_warp_area}
                                onMouseDown={dragAnglePoint}
                                ref={angleWarp}
                            >
                                <div className={styles.angle_warp}>
                                    <span
                                        className={styles.angle_bar}
                                        style={{ width: `${(gradColor.rotate * 100) / 360}%` }}
                                    ></span>
                                    <div className={styles.angle_bar_pos}>
                                        <span
                                            className={styles.angle_point}
                                            style={{
                                                left: `${(gradColor.rotate * 100) / 360}%`,
                                            }}
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.angle_input_group}>
                                <input
                                    type="text"
                                    className={styles.angle_input}
                                    defaultValue={gradColor.rotate}
                                    onChange={changeAngle}
                                    ref={angleInput}
                                    maxLength={3}
                                    onKeyDown={stopEvent}
                                />
                                <span className={styles.icon_deg}>°</span>
                            </div>
                        </div>
                    </>
                ) : null}

                <div className={styles.color_picker_body}>
                    <div className={styles.color_title}>颜色设置</div>
                    {/* 选色面板 */}
                    <div className={styles.hvs_picker}>
                        {/* 颜色选择 */}
                        <div
                            className={styles.s_v_panel}
                            onMouseDown={dragColorPanel}
                            ref={s_v_panel}
                        >
                            <div className={styles.base_layer} ref={base_layer} />
                            <div className={styles.s_layer} />
                            <div className={styles.v_layer} />
                            <i className={styles.pointer} ref={c_pointer} />
                        </div>
                        {/* 色值和透明度色值 */}
                        <div className={styles.row_layer}>
                            {/* 色域条 */}
                            <div className={styles.h_a_bands}>
                                <div className={styles.h_band} onMouseDown={dragHBar}>
                                    <div className={styles.rail} ref={h_rail}>
                                        <span className={styles.wrap} ref={h_point} />
                                    </div>
                                </div>
                                {/* 透明度条 */}
                                <div className={styles.a_band} onMouseDown={dragOpacityBar}>
                                    <div className={styles.rail} ref={opt_rail}>
                                        <span
                                            className={styles.wrap}
                                            style={{
                                                left: `${A}%`,
                                            }}
                                            ref={opt_point}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 当前选中色 */}
                            <div className={styles.view_color}>
                                <div className={styles.view_select_color} ref={select_color} />
                            </div>
                        </div>
                        {/* 手动设置色值 */}
                        <div className={styles.hand_section}>
                            <label className={`${styles.color_input} ${styles.hex_input}`}>
                                <input
                                    type="text"
                                    defaultValue={color.replace(/#/, '')}
                                    onBlur={ev => saveValue('hex', ev)}
                                    onKeyUp={inputKeyUp}
                                    onChange={hexChange}
                                    ref={hex}
                                    maxLength={6}
                                    onKeyDown={stopEvent}
                                />
                                <span>Hex</span>
                            </label>
                            <label className={styles.color_input}>
                                <input
                                    type="text"
                                    onBlur={ev => saveValue('R', ev)}
                                    onKeyUp={inputKeyUp}
                                    onChange={rgbaChange}
                                    maxLength={3}
                                    ref={color_r}
                                    onKeyDown={stopEvent}
                                />
                                <span>R</span>
                            </label>
                            <label className={styles.color_input}>
                                <input
                                    type="text"
                                    onBlur={ev => saveValue('G', ev)}
                                    onKeyUp={inputKeyUp}
                                    onChange={rgbaChange}
                                    maxLength={3}
                                    ref={color_g}
                                    onKeyDown={stopEvent}
                                />
                                <span>G</span>
                            </label>
                            <label className={styles.color_input}>
                                <input
                                    type="text"
                                    onBlur={ev => saveValue('B', ev)}
                                    onKeyUp={inputKeyUp}
                                    onChange={rgbaChange}
                                    maxLength={3}
                                    ref={color_b}
                                    onKeyDown={stopEvent}
                                />
                                <span>B</span>
                            </label>
                            <label className={styles.color_input}>
                                <input
                                    type="text"
                                    defaultValue={A}
                                    onBlur={ev => saveValue('A', ev)}
                                    onKeyUp={inputKeyUp}
                                    onChange={rgbaChange}
                                    maxLength={3}
                                    ref={color_a}
                                    onKeyDown={stopEvent}
                                />
                                <span>A</span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* 常用色值列表 */}
                <div className={styles.custom_color_list}>
                    <p>
                        <span
                            className={`${styles.custom_tab} ${!yc ? styles.tab_act : ''}`}
                            data-id={'system'}
                            onClick={switchCustom.bind(null, false)}
                        >
                            预设颜色
                        </span>
                        <span
                            className={`${styles.custom_tab} ${yc ? styles.tab_act : ''}`}
                            data-id={'custom'}
                            onClick={switchCustom.bind(null, true)}
                        >
                            最近使用
                        </span>
                    </p>
                    <ul className={styles.custom_palette}>
                        {!yc
                            ? defaultColor &&
                              defaultColor.map(item => {
                                  return (
                                      <li
                                          className={`${styles.custom_palette_color} ${
                                              `#${color}` === item ? styles.sys_act : ''
                                          }`}
                                          key={item}
                                          style={{ background: item }}
                                          onClick={selectSysColor.bind(null, item)}
                                      ></li>
                                  );
                              })
                            : custom &&
                              custom.map((item, i) => {
                                  let isObj = isObject(item);
                                  let template = '';
                                  let isAct = false;

                                  if (isObj) {
                                      // 计算渐变色
                                      let grad_color = [];
                                      item.gradData.forEach(gradC => {
                                          grad_color.push(
                                              `${gradC.color} ${Math.round(gradC.pos * 100)}%`,
                                          );
                                      });
                                      const _colors = grad_color.join(',');
                                      template = `linear-gradient(${item.rotate +
                                          90}deg,${_colors})`;

                                      isAct = type === 2 && comparisonTranColor(item, gradColor);
                                  } else {
                                      // 纯色比较
                                      template = item;
                                      isAct = `#${color}` === item;
                                  }

                                  return (
                                      <li
                                          className={`${styles.custom_palette_color} ${
                                              isAct ? styles.sys_act : ''
                                          }`}
                                          key={i}
                                          style={{ background: template }}
                                          onClick={selectSysColor.bind(null, item)}
                                      ></li>
                                  );
                              })}
                    </ul>
                </div>
            </div>
        </div>,
        document.body,
    );
}

export default ColorPalette;
