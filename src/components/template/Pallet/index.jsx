/**
 * author : yangbo
 * date : 2021/10/22 14:10:13
 * fileName: index.jsx
 * description : 调色板
 **/
/* eslint-disable */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './index.less';
import {
    HEX2RGB, // hex 转 rgb
    RGB2HEX, // rgb 转 hex
    RGB2HSB, // rgb 转 hsb
    HSB2RGB, // hsb 转 rgb
    HEX2RGBA, // hex 转 rgba
    RGBA2HEX, // rgba 转 hex
    // getPureHex, // 获取纯色色值
    createGradient, // 渐变色数据 转 字符串渐变色
    initColor, // 初始化色值
    opt_sysConvert, // 透明度进制转换
    drawRGBA, // 提取rgb值
    computeTranColor, // 计算渐变色过渡色
    transStrColor, // 字符串颜色转换
    transPureColor, // 6~8位hex分离hex色值和透明度
    createSaveGrad, // 生成渐变颜色保存格式
} from './colorTrans';
import {
    noop, // 空函数
    guid, // id
    stopEvent,
} from './utils';
import _ from 'lodash';
import ReactDom from 'react-dom';
import { solidColor, gradientColor } from './data';
import DYE from './dye.svg';
import DYE_ACT from './dye_act.svg';

// 默认数据
const baseProps = {
    // 组件显隐开关 <bool>
    show: false,
    // 支持透明色 <bool>
    tranColor: true,
    // 支持线性渐变色 <bool>
    linearGrad: true,
    // 支持径向渐变 <bool>
    radialGrad: true,
    // 支持吸取颜色
    dyeAbsorption: true,
    // 渐变色最大节点数量 <number[2 ~ ∞]>
    pointNode: 5,
    // 默认颜色
    defaultColor: solidColor,
    /**
     * 色值参数
     * color<string|object>
     * string：2-90-0:#FFFFFFFF-0.5:#FFFFFFFF-1:#FFFFFFFF;
     * object:
     *          colorType: 颜色类型
     *          solidColor<string['#4E98CBFF']>: 纯色
     *          gradientColor：渐变色
     *                  gradientRotate: 渐变色角度
     *                  gradientColors：渐变颜色数组
     *                  gradientLocations：渐变位置数组
     */
    color: {
        colorType: 1,
        solidColor: '#4E98CBFF', // 默认色值
        gradientColor: {
            gradientRotate: 0, // 渐变角度
            gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
            gradientLocations: [0, 1], // 渐变位置数组
        },
    },
    // 初始定位置 y 轴 <string|number>
    top: '25%',
    // 初始定位置 x 轴 <string|number>
    left: '14%',
    // 色值获取回调
    getColor: noop, // 获取返回值 func
    // 面板关闭回调
    closePallet: noop, // 关闭面板 func
};

function Pallet(props) {
    // 属性
    const {
        // 组件显隐开关 <bool>
        show = props.show,
        // 初始定位置 y 轴 <string|number>
        top = baseProps.top,
        // 初始定位置 x 轴 <string|number>
        left = baseProps.left,
        // 支持透明色 <bool>
        tranColor = baseProps.tranColor,
        // 支持线性渐变色 <bool>
        linearGrad = baseProps.linearGrad,
        // 支持径向渐变 <bool>
        radialGrad = baseProps.radialGrad,
        // 支持吸取颜色
        dyeAbsorption = baseProps.dyeAbsorption,
        // 渐变色最大节点数量 <number[2 ~ ∞]>
        pointNode = baseProps.pointNode,
        // 默认颜色
        // defaultColor = baseProps.defaultColor,
        // 色值
        colorData = baseProps.color,
        // update 主动更新色值
        update = NaN,
    } = props;
    // 函数
    const {
        // 面板关闭回调
        closePallet = baseProps.closePallet,
        // 色值获取回调
        getColor = baseProps.getColor,
    } = props;
    // 色值类型
    const [type, setType] = useState(1);
    const __type__ = useRef(1);
    // 初始透明度
    const [A, setA] = useState(100);
    // 纯色色值
    const [color, setColor] = useState('');
    // 渐线性渐变色值
    const [grad, setGrad] = useState(null);
    // 渐变色的当前选中点
    const [point, setPoint] = useState({});
    // 预选颜色<s:system>和最近使用<r:recently>和自定义颜色<c:custom> tab 切换 / cg: color group 色值分组
    const [cg, setCG] = useState('s');
    // 当前选中色值
    const [cg_Point, setCG_Point] = useState(null);
    // 吸色控制
    const [dye, setDye] = useState(false);

    // 缓存纯色色值
    const storeSolid = useRef('');
    // 缓存渐变色
    const storeGradient = useRef({});
    // 获取光标时缓存值输入框初始值
    const store_init_val = useRef({});

    // 面板
    const colorPanel = useRef(null);
    // 渐变色背景色
    const grad_area = useRef(null);
    // 渐变色阀值操作区域
    const gradArea = useRef(null);
    // 渐变色角度操作区域
    const angleWarp = useRef(null);
    // 渐变色角度输入框
    const angleInput = useRef(null);
    // 透明度条
    const opt_rail = useRef(null);
    // 色域条
    const h_rail = useRef(null);
    // 当前色域面板
    const base_layer = useRef(null);
    // 当前选中色
    const select_color = useRef(null);
    // 颜色面板
    const s_v_panel = useRef(null);
    // 颜色面板点
    const c_pointer = useRef(null);
    // 色域点
    const h_point = useRef(null);
    // 透明度点
    const opt_point = useRef(null);

    // 色值dom
    const color_r = useRef(null); // r 值
    const color_g = useRef(null); // g 值
    const color_b = useRef(null); // b 值
    const color_a = useRef(null); // a 值
    const hex = useRef(null); // hex 值

    // 记录常用色
    const custom = useRef(JSON.parse(localStorage.getItem('custom')) || []);
    // 无色彩背景 （当选中颜色为无彩系 且 不是非填充状态时用到）
    const achromatization = useRef('#FFFFFF');
    // 首次打开颜色面板时的颜色
    const initParams = useRef({});

    // 色值更新
    useEffect(() => {
        const _initColor = initColor(colorData);
        const rgb = HEX2RGB(_initColor.color);
        // hsb 相关色值
        let _hsb = RGB2HSB(rgb[0], rgb[1], rgb[2]);
        let ext = HSB2RGB(_hsb[0], 1, 1);
        let h = _hsb[0];
        let s = _hsb[1];
        let b = _hsb[2];
        let x = s * 100;
        let y = (1 - b) * 100;

        // 色域点色值设置
        if (h_point.current) {
            h_point.current.style.top = `${Math.round((h * 100) / 360)}%`;
            h_point.current.style.background = `rgb(${ext[0]},${ext[1]},${ext[2]})`;
        }
        // sb 点位置
        if (c_pointer.current) {
            c_pointer.current.style.top = `${y}%`;
            c_pointer.current.style.left = `${x}%`;
        }
        // 变更色域面板色值
        if (base_layer.current) {
            base_layer.current.style.background = achromatization.current = RGB2HEX(
                `rgb(${ext[0]},${ext[1]},${ext[2]})`,
            );
        }
        // 透明度点
        if (opt_point.current) {
            opt_point.current.style.top = `${_initColor.A}%`;
            opt_point.current.style.background = `rgba(${rgb[0]}, ${rgb[1]}, ${
                rgb[2]
            },${_initColor.A / 100}) `;
        }

        // 更新 R,G,B,A,hex
        updateColorParams(_initColor.color, rgb);

        // 透明度条
        if (opt_rail.current) {
            opt_rail.current.style.background = `linear-gradient(to bottom,transparent 0%,rgb(${rgb[0]},${rgb[1]},${rgb[2]}) 100%)`;
        }
        // 更新 A 值
        if (color_a.current) {
            color_a.current.value = _initColor.A;
        }
        // 更新当前选中色
        if (select_color.current) {
            select_color.current.style.background = HEX2RGBA(_initColor.hex_8);
        }
        console.log(_initColor);
        // 缓存首次更新的颜色
        initParams.current = _.cloneDeep(_initColor);
        // 设置A
        setA(_initColor.A);

        if (_initColor.type === 2 && linearGrad) {
            // 设置线性渐变类型
            setType(2);
        } else if (_initColor.type === 3 && radialGrad) {
            // 设置径向渐变类型
            setType(3);
        } else if (_initColor.type === 0) {
            setType(0);
        } else {
            setType(1);
        }
        __type__.current = _initColor.type;
        // 当前颜色
        setColor(_initColor.color);
        // 设置渐变色
        setGrad(_initColor.grad);
        // 设置默认渐变色点
        setPoint(_initColor.grad.colorData[0]);
        // 设置渐变色角度值
        if (angleInput.current) {
            angleInput.current.value = _initColor.grad.rotate;
        }
        // 更新常用色
        custom.current = JSON.parse(localStorage.getItem('custom')) || [];
        // 切换颜色时清空选中色
        setCG_Point(null);
    }, [update]);

    // 渐变色条背景变更
    useEffect(() => {
        // 初始渐变色色值
        if (grad_area.current && [2, 3].includes(type)) {
            grad_area.current.style.background = grad.gradient;
        }
    }, [grad, type]);

    // 缓存当前渐变色
    useEffect(() => {
        storeGradient.current = grad;
    }, [grad]);

    // 返回新色值数据
    useEffect(() => {
        if (!color || !grad) return;
        let res = {
            colorType: type,
            solidColor: '', // 默认色值da
            gradientColor: {
                gradientRotate: 0, // 渐变角度
                gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
                gradientLocations: [0, 1], // 渐变位置数组
            },
            // webGrad: grad.gradient.replace(/(\d+)deg/g, `${grad.rotate + 90}deg`),
            // webSolid: ``,
            gradColor_3d: '',
            webHex: color,
            webOpt: A,
        };

        // 返回3D使用色值
        let gradColor_3d = `${type}-`;
        // 添加纯色色值
        const _color = `${color}${opt_sysConvert(A, 16)}`;
        res.solidColor = _color;

        if (type === 0 || type === 1) {
            // 添加3D可用色值
            res.gradColor_3d = `${gradColor_3d}0-${_color}`;

            // 页面引用色
            let rgb = HEX2RGB(color);
            res.webSolid = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${A / 100})`;
        } else if ([2, 3].includes(type)) {
            // 渐变色数据模板
            let _gradientColor = {
                gradientRotate: 0, // 渐变角度
                gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
                gradientLocations: [0, 1], // 渐变位置数组
            };

            // 角度赋值
            gradColor_3d += `${grad.rotate}-`;
            // 迭代渐变色数据
            _gradientColor.gradientRotate = grad.rotate; // 角度
            // 色值 | 位置
            grad.colorData.forEach((item, i) => {
                const c = RGBA2HEX(item.color);
                _gradientColor.gradientColors[i] = c.hex_8;
                _gradientColor.gradientLocations[i] = item.pos;
                gradColor_3d += `${item.pos}:${c.hex_8}${
                    grad.colorData.length === i + 1 ? '' : '-'
                }`;
            });

            res.gradientColor = _gradientColor; // 2D 渐变色
            res.gradColor_3d = gradColor_3d; // 3D 渐变色
            res.webGradient = createGradient(grad.colorData, grad.rotate, type);
        }

        if (getColor && typeof getColor === 'function') {
            // 如果首次进入的颜色和想传出的颜色不相等时，视为改变颜色，将颜色值返回外界
            if (initParams.current?.gradColor_3d !== res.gradColor_3d) {
                // 防止同色值多次导出（也防止在改变色值后，再次改成进入颜色无法生效的问题）
                initParams.current.gradColor_3d = res.gradColor_3d;
                console.log(res);
                getColor(res);
            }
        }
    }, [color, A, type, grad]);

    const storeCustom = useCallback(() => {
        // 关闭组件时保存本次选择颜色
        let temp_custom = JSON.parse(localStorage.getItem('custom')) || [];
        let _c = `${storeSolid.current.hex}${opt_sysConvert(storeSolid.current.A, 16)}`;

        if (__type__.current === 1 || __type__.current === 0) {
            if (!storeSolid.current.hex) return;
            let n = -1;

            // 查找常用色内是否已经存在
            temp_custom.forEach((item, i) => {
                if (item === _c) {
                    n = i;
                }
            });

            if (n > 0) {
                temp_custom.splice(n, 1);
            }

            temp_custom.unshift(_c);
        } else if ([2, 3].includes(__type__.current)) {
            let n = -1;
            let _gradColor = createSaveGrad(
                storeGradient.current.colorData,
                storeGradient.current.rotate,
                __type__.current,
            );

            temp_custom.forEach((item, i) => {
                if (item === _gradColor) {
                    n = i;
                }
            });

            if (n > 0) {
                temp_custom.splice(n, 1);
            }

            temp_custom.unshift(_gradColor);
        }

        temp_custom = [...new Set(temp_custom)].slice(0, 18);
        localStorage.setItem('custom', JSON.stringify(temp_custom));
    }, []);

    // 组件销毁时保存当前颜色
    useEffect(() => {
        return () => {
            if (show) storeCustom();
        };
    }, [show]);

    // 点击任意处关闭调色板
    useEffect(() => {
        function closeView() {
            if (closePallet && typeof closePallet === 'function') {
                closePallet(false);
            }
        }

        if (show) {
            document.addEventListener('mousedown', closeView, false);
        } else {
            document.removeEventListener('mousedown', closeView);
        }

        return () => {
            document.removeEventListener('mousedown', closeView);
        };
    }, [closePallet, show]);

    // 面板显示隐藏发生变更后 TODO： 顺序1 (顺序不能改变)
    useEffect(() => {
        if (!show) {
            // 关闭面板时清空选中色
            setCG_Point(null);
        } else {
            // 更新常用色
            custom.current = JSON.parse(localStorage.getItem('custom')) || [];
        }
    }, [show]);

    // （渐变色模式）选择颜色后同步更新到选中点 TODO： 顺序2 (顺序不能改变)
    useEffect(() => {
        // 纯色模式下发生颜色变化
        if (type === 1) {
            storeSolid.current = {
                hex: color,
                A,
            };
        }
    }, [color, A, type]);

    // 面板拖拽
    function dragPanel(ev) {
        ev.persist();
        stopEvent(ev);
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

    // 颜色值变更后更新RGB,hex值、透明度点和条的颜色
    function updateColorParams(HEX = '#FFFFFF', RGB = [255, 255, 255], A = 1) {
        hex_rgb_update(HEX, RGB);
        // 更新当前选中色
        if (select_color.current) {
            select_color.current.style.background = `${HEX}${opt_sysConvert(A, 16)}`;
        }

        // 透明度条
        if (opt_rail.current) {
            opt_rail.current.style.background = `linear-gradient(to bottom,transparent 0%,rgb(${RGB[0]},${RGB[1]},${RGB[2]}) 100%)`;
        }

        // 透明度点
        if (opt_point.current) {
            opt_point.current.style.background = `rgba(${RGB[0]}, ${RGB[1]}, ${RGB[2]},${A})`;
        }
    }

    // 更新RGB 和 HEX
    function hex_rgb_update(HEX = '#FFFFFF', RGB = [255, 255, 255]) {
        rgb_update(RGB);
        // 更新 HEX 值
        if (hex.current) {
            hex.current.value = HEX.replace('#', '');
        }
    }

    function rgb_update(RGB = [255, 255, 255]) {
        // 更新 R 值
        if (color_r.current) {
            color_r.current.value = RGB[0];
        }
        // 更新 G 值
        if (color_g.current) {
            color_g.current.value = RGB[1];
        }
        // 更新 B 值
        if (color_b.current) {
            color_b.current.value = RGB[2];
        }
    }

    // 更新 透明度
    function aUpdate(A = 1) {
        // 更新 A 值
        if (color_a.current) {
            color_a.current.value = A;
        }
        if (opt_point.current) {
            opt_point.current.style.top = `${A}%`;
        }
    }

    // 面板更换色值
    function changeAllParams(hex = '#FFFFFF', rgb = [255, 255, 255], a = 100) {
        setA(a);
        setColor(hex);

        aUpdate(a);
        colorHandle(hex, a);
        hex_rgb_update(hex, rgb);
    }

    // 更新 渐变色背景
    function gradUpdate(RGB = [255, 255, 255], a = A) {
        setPoint(state => {
            state.color = `rgba(${RGB[0]},${RGB[1]},${RGB[2]},${a / 100})`;
            return { ...state };
        });

        setGrad(state => {
            state.colorData.map(item => {
                if (item.id === point.id) {
                    item.color = `rgba(${RGB[0]},${RGB[1]},${RGB[2]},${a / 100})`;
                }

                return item;
            });

            state.gradient = createGradient(state.colorData);

            return { ...state };
        });
    }

    // 透明度变化时需要更新的参数
    function optChange(RGB = [255, 255, 255], A = 1, pos) {
        // 透明度点位置和颜色
        if (opt_point.current) {
            if (pos) {
                opt_point.current.style.top = `${A}%`;
            }
            opt_point.current.style.background = `rgba(${RGB[0]}, ${RGB[1]}, ${RGB[2]},${A /
                100}) `;
        }

        // 更新当前选中色
        if (select_color.current) {
            select_color.current.style.background = `rgba(${RGB[0]}, ${RGB[1]}, ${RGB[2]},${A /
                100})`;
        }

        // 透明度条
        if (opt_rail.current) {
            opt_rail.current.style.background = `linear-gradient(to bottom,transparent 0%,rgb(${RGB[0]},${RGB[1]},${RGB[2]}) 100%)`;
        }
    }

    // 手动修改后需要同步参数
    function colorHandle(_hex = '#FFFFFF', A = 1) {
        // 将当前色值转成 rgb 格式
        let rgb = HEX2RGB(_hex);
        // 当前色的 hsb 值
        let _hsb = RGB2HSB(rgb[0], rgb[1], rgb[2]);
        let ext = HSB2RGB(_hsb[0], 1, 1);
        let h = _hsb[0];
        let s = _hsb[1];
        let b = _hsb[2];
        let x = s * 100;
        let y = (1 - b) * 100;

        // 非纯色
        if (!(rgb[0] === rgb[1] && rgb[1] === rgb[2])) {
            // 色域点色值设置
            h_point.current.style.top = `${Math.round((h * 100) / 360)}%`;
            h_point.current.style.background = `rgb(${ext[0]},${ext[1]},${ext[2]})`;
        }

        // sb 点位置
        c_pointer.current.style.top = `${y}%`;
        c_pointer.current.style.left = `${x}%`;

        if (rgb[0] === rgb[1] && rgb[1] === rgb[2]) {
            // 非彩色值
            base_layer.current.style.background = achromatization.current;
        } else {
            // 变更色域面板色值
            base_layer.current.style.background = achromatization.current = RGB2HEX(
                `rgb(${ext[0]},${ext[1]},${ext[2]})`,
            );
        }

        // 更新 HEX 值
        if (hex.current) {
            hex.current.value = _hex.replace('#', '');
        }

        // 更新预显颜色
        optChange(rgb, A, true);
        // 更新色值
        setColor(_hex);
    }

    // 渐变色切换点需要更新数据
    function switchPoint(point, hex = '#FFFFFF', rgb = [255, 255, 255], A = 100) {
        setA(A);
        setColor(hex);
        setPoint(point);

        colorHandle(hex, A);
        hex_rgb_update(hex, rgb);
        aUpdate(A);
    }

    // 颜色面板区域选择
    function dragColorPanel(ev) {
        ev.persist();
        stopEvent(ev);
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

    // 颜色面板区域拖拽计算
    function dragPanelFn(ev) {
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
        let rgb = HEX2RGB(color);
        // 获取当前色的HSB值
        let HSB = RGB2HSB(rgb[0], rgb[1], rgb[2]);
        // 根据当前的s,b 获取计算后的rgb值
        let RGB = HSB2RGB(HSB[0], s, b);

        if (rgb[0] === rgb[1] && rgb[1] === rgb[2]) {
            // 无彩系处理，获取预存背景色
            let BGRGB = HEX2RGB(achromatization.current);
            let BGHSB = RGB2HSB(BGRGB[0], BGRGB[1], BGRGB[2]);
            RGB = HSB2RGB(BGHSB[0], s, b);
        }

        // 获取 hex 值
        let HEX = RGB2HEX(`rgb(${RGB[0]},${RGB[1]},${RGB[2]})`);

        // 更新色值参数
        updateColorParams(HEX, RGB, A);
        // 设置相应控制面板参数
        setColor(HEX);

        if (type === 0) {
            setType(1);
            __type__.current = 1;
        } else if ([2, 3].includes(type)) {
            // 如果当前是渐变色编辑时
            gradUpdate(RGB);
        }
    }

    // 色域拖动计算函数
    function dragHBar(ev) {
        ev.persist();
        stopEvent(ev);
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
        const { pageY } = window.event;
        const { top, height } = opt_rail.current.getBoundingClientRect();
        let dy = ((pageY - top) * 100) / height;
        dy = dy > 99.999999 ? 99.999999 : dy <= 0 ? 0 : dy;

        // h 从进度条范围转换到H范围 即 0-100 --> 0-360 不能等于360
        let _h = dy * 3.6;
        // 获取当前色的RGB值
        let rgb = HEX2RGB(color);
        // 获取当前色的HSB值
        let HSB = RGB2HSB(rgb[0], rgb[1], rgb[2]);
        // 获取极值颜色
        let ext = HSB2RGB(_h, 1, 1);
        // 获取当前色和当前选中h对应色域的RGB
        let RGB = HSB2RGB(_h, HSB[1], HSB[2]);
        let HEX = RGB2HEX(`rgb(${RGB[0]},${RGB[1]},${RGB[2]})`);

        // 变更色域面板色值
        base_layer.current.style.background = `rgb(${ext[0]},${ext[1]},${ext[2]})`;
        // 缓存当前极值色值
        achromatization.current = RGB2HEX(`rgb(${ext[0]},${ext[1]},${ext[2]})`);

        // 色域点色值设置
        h_point.current.style.top = `${dy}%`;
        h_point.current.style.background = `rgb(${ext[0]},${ext[1]},${ext[2]})`;

        // 更新色值参数
        updateColorParams(HEX, RGB, A);

        // 当前色是无彩系且不是无填充状态
        if (type === 0 && rgb[0] === rgb[1] && rgb[1] === [2]) return;

        // 设置 hsb 对应的值
        setColor(HEX.toUpperCase());

        // 如果当前是透明模式时，颜色发生变化则转为纯色
        if (type === 0) {
            setType(1);
            __type__.current = 1;
        } else if ([2, 3].includes(type)) {
            gradUpdate(RGB);
        }
    }

    // 透明度拖动条
    function dragOpacityBar(ev) {
        ev.persist();
        stopEvent(ev);
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
        const { pageY } = window.event;
        const { top, height } = opt_rail.current.getBoundingClientRect();
        let dy = Math.round(((pageY - top) * 100) / height);
        dy = dy >= 100 ? 100 : dy <= 0 ? 0 : dy;

        // 将当前色值转成 rgb 格式
        let RGB = HEX2RGB(color);
        // 更新透明度变化影响的展示效果
        aUpdate(dy);
        optChange(RGB, dy);
        // 保存当前透明度
        setA(dy);

        // 如果当前是透明模式时，颜色发生变化则转为纯色
        if (type === 0) {
            setType(1);
            __type__.current = 1;
        } else if ([2, 3].includes(type)) {
            gradUpdate(RGB, dy);
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

    // 手动修改 rgba 值
    function rgbaChange(ev) {
        ev.persist();
        // 阻止冒泡
        stopEvent(ev);
        // 获取输入框的值
        let val = ev.target.value;

        if (val.length > 1) {
            val = val.replace(/^0/g, '');
        }

        ev.target.value = val.replace(/[^0-9]/g, '');
    }

    // 手动修改 hex 值
    function hexChange(ev) {
        ev.persist();
        // 阻止冒泡
        stopEvent(ev);

        let val = ev.target.value;
        ev.target.value = val.replace(/[^0-9a-fA-F]/g, '');

        // 中文模式下输入超过6个字符，后面的截取掉
        if (val.length > 6) {
            ev.target.value = ev.target.value.substr(0, 6);
        }
    }

    // 获取光标缓存初始值
    function storeValue(_type, ev) {
        let val = ev.target.value;

        if (_type === 'hex') {
            store_init_val.current.hex = val;
        } else if (_type === 'R') {
            store_init_val.current.R = val;
        } else if (_type === 'G') {
            store_init_val.current.G = val;
        } else if (_type === 'B') {
            store_init_val.current.B = val;
        } else if (_type === 'A') {
            store_init_val.current.A = val;
        }
    }

    // 保存修改
    function saveValue(_type, ev) {
        let val = ev.target.value;
        let reg = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        let _hex = '';
        // 获取当前色的RGB值
        let rgb = HEX2RGB(color);

        // 如果传入的值是空或者不是数字，恢复初始值
        if (_.trim(val) === '') {
            ev.target.value = store_init_val.current[_type];
            return;
        }

        if (_type === 'hex') {
            if (!reg.test(val)) return; // 不符合条件禁止修改色值
            if (val.length === 3) {
                val = [val[0], val[0], val[1], val[1], val[2], val[2]].join('');
            }
            _hex = `#${val.toUpperCase()}`;
            rgb_update(HEX2RGB(_hex));
        } else if (_type === 'R') {
            val = val > 255 ? 255 : val < 0 ? 0 : val;
            _hex = RGB2HEX(`rgb(${val},${rgb[1]},${rgb[2]})`);
            color_r.current.value = val;
        } else if (_type === 'G') {
            val = val > 255 ? 255 : val < 0 ? 0 : val;
            _hex = RGB2HEX(`rgb(${rgb[0]},${val},${rgb[2]})`);
            color_g.current.value = val;
        } else if (_type === 'B') {
            val = val > 255 ? 255 : val < 0 ? 0 : val;
            _hex = RGB2HEX(`rgb(${rgb[0]},${rgb[1]},${val})`);
            color_b.current.value = val;
        } else if (_type === 'A') {
            val = val > 100 ? 100 : val < 0 ? 0 : val;
            // 更新透明度影响参数
            aUpdate(val);
            optChange(rgb, val, true);
            setA(val);
            gradUpdate(rgb, val);
            return;
        }

        // 手动修改色值后更新
        colorHandle(_hex, A);

        if ([2, 3].includes(type)) {
            gradUpdate(HEX2RGB(_hex), A);
        }
    }

    // 增加渐变色阀值
    function createThreshold() {
        if (grad.colorData.length >= pointNode) return;
        let ev = window.event;
        let { pageX } = ev;
        let { left, width } = gradArea.current.getBoundingClientRect();
        let space = pageX - left - 5;

        let position = Math.round((space * 100) / (width - 10)); //触发点
        let maxPos = grad.colorData.length - 1; // 最右边下角标
        let minPos = 0; // 最左边定位

        // 寻找增加点两侧的相邻点
        grad.colorData.forEach((item, i) => {
            if (item.pos > grad.colorData[minPos].pos && item.pos < position / 100) {
                minPos = i;
            }

            if (item.pos < grad.colorData[maxPos].pos && item.pos > position / 100) {
                maxPos = i;
            }
        });

        // 计算相邻两点的距离
        let stride = (grad.colorData[maxPos].pos - grad.colorData[minPos].pos) * 100;

        // 计算增长步幅
        let inc = computeTranColor(
            grad.colorData[minPos].color,
            grad.colorData[maxPos].color,
            stride === 0 ? 1 : stride,
        );
        // 计算后 得到改变后的信息
        let newPoint_inc = Math.round(position - grad.colorData[minPos].pos * 100);
        let prev_c = drawRGBA(grad.colorData[minPos].color);
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

        // 更新切换点数据
        switchPoint(newGrad, hex, [computed_r, computed_g, computed_b], computed_a * 100);

        // 增加点
        setGrad(state => {
            state.colorData.push(newGrad);
            state.colorData.sort((a, b) => a.pos - b.pos);
            // 生产渐变色字符串
            const _gradient = createGradient(state.colorData);
            return { ...state, gradient: _gradient };
        });
        setPoint(newGrad);
    }

    // 拖拽阀值点
    function dragThreshold(obj, ev) {
        ev.persist();
        stopEvent(ev);
        if (ev.button !== 0) return;
        const event = window.event;
        event.preventDefault();
        const {
            left: referL,
            top: referT,
            width: referW,
        } = gradArea.current.getBoundingClientRect(); // 获取容器位置信息
        let isBreak = false; // y 轴是否脱离位置

        if (obj.id !== point.id) {
            // 设置选中点
            setPoint(obj);
            // 更新点数据
            let rgba = drawRGBA(obj.color);
            let hex = RGB2HEX(`rgb(${rgba[0]},${rgba[1]},${rgba[2]})`);
            switchPoint(obj, hex, [rgba[0], rgba[1], rgba[2]], rgba[3] * 100);
        }

        document.onmousemove = function() {
            const event = window.event;
            event.preventDefault();

            const { pageX, pageY } = event;
            let move_x = pageX - referL - 5; // x 偏移量
            let move_y = pageY - referT; // y 偏移量
            let position_x = Math.round((move_x * 100) / (referW - 10)); // 计算移动增量
            position_x = position_x > 100 ? 100 : position_x <= 0 ? 0 : position_x; // 边界判断

            // 变更当前阀值数据
            let _temp = grad.colorData
                .map(item => {
                    if (item.id === obj.id) {
                        item.pos = position_x / 100;
                    }
                    return item;
                })
                .sort((a, b) => a.pos - b.pos);

            // 当点数超过2个， Y 轴上下超出25px；
            if (grad.colorData.length > 2 && Math.abs(move_y) > 25) {
                isBreak = true;

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
                // 恢复样式
                ev.target.style.top = '-1px';
                ev.target.style.left = `${position_x}%`;
                ev.target.style.position = 'absolute';
                ev.target.style.opacity = 1;

                // 生产渐变色字符串
                const _gradient = createGradient(_temp);

                setGrad({ ...grad, colorData: _temp, gradient: _gradient });
            }
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;

            // y 轴脱离范围删除阀值
            if (isBreak) {
                let moved = grad.colorData.filter(item => item.id !== obj.id);
                // 同步面板信息
                let rgba = drawRGBA(moved[0].color);
                let hex = RGB2HEX(`rgb(${rgba[0]},${rgba[1]},${rgba[2]})`);
                // 更新颜色输入框，透明度，当前颜色
                hex_rgb_update(hex, [rgba[0], rgba[1], rgba[2]]);
                colorHandle(hex, rgba[3] * 100);
                // 删除后默认选中第一个点
                setPoint(moved[0]);
                // 生产渐变色字符串
                const _gradient = createGradient(moved);
                setGrad({ ...grad, colorData: moved, gradient: _gradient });
            }
        };
    }

    // 角度拖拽
    function dragAnglePoint(ev) {
        ev.persist();
        stopEvent(ev);
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

        const angle = Math.round(angle_dx * 360);
        // 保存点初始位置
        setGrad(state => {
            state.rotate = angle;
            // state.gradient = createGradient(state.colorData);
            return { ...state };
        });

        angleInput.current.value = angle;
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
        setGrad(state => {
            return { ...state, rotate: Number(check_val) };
        });
    }

    // 预设颜色选区
    function selectColor(_color_, mark) {
        let COLOR = JSON.parse(JSON.stringify(_color_));

        // 设置当前选中色
        setCG_Point(mark);

        if ([2, 3].includes(_color_.type)) {
            // 预选颜色渐变色节点大于当前允许增加的最大节点数
            if (pointNode < _.get(COLOR, 'colorData', []).length) {
                COLOR.colorData = COLOR.colorData.slice(0, pointNode);
                const len = COLOR.colorData.length - 1;

                COLOR.colorData = COLOR.colorData.map((c, i) => {
                    // 计算新节点位置
                    let pos = Math.round((i / len) * 100) / 100;
                    // 更换节点位置
                    c.pos = pos;
                    return c;
                });
            }

            // 颜色面板同步更新第一个阀点的颜色信息
            let _hex = RGBA2HEX(COLOR.colorData[0].color);
            let _rgb = HEX2RGB(_hex.hex);
            changeAllParams(_hex.hex, _rgb, _hex.A);

            // 当前面板支持渐变色模式
            if (linearGrad || radialGrad) {
                // 切换到渐变色页面
                __type__.current = _color_.type;
                setType(_color_.type);
                // 变更渐变色数据
                setGrad(COLOR);
                // 默认选中第一个阀点
                setPoint(COLOR.colorData[0]);
                // 更换角度数值
                if (angleInput.current) {
                    angleInput.current.value = COLOR.rotate;
                }
            } else {
                // 切换到渐变色页面
                setType(1);
                __type__.current = 1;
            }
            return;
        } else if (_color_.type === 1 || _color_.type === 0) {
            // 单色
            let _hex = transPureColor(COLOR.colorData);
            let _rgb = HEX2RGB(_hex.hex);
            changeAllParams(_hex.hex, _rgb, _hex.A);
        }

        if (tranColor) {
            setType(_color_.type);
            __type__.current = _color_.type;
        } else {
            setType(1);
            __type__.current = 1;
        }
    }

    // ---------- 切换调色板模式 ----------
    function switchType(n) {
        if (n === 1 || n === 0) {
            // 切换到透明色 or 纯色
            let _rgb = HEX2RGB(storeSolid.current.hex);

            changeAllParams(storeSolid.current.hex, _rgb, n === 1 ? storeSolid.current.A : 0);
        } else if ([2, 3].includes(n)) {
            // 如果是渐变色 默认选中当前第一个点的颜色
            let _hex = RGBA2HEX(storeGradient.current.colorData[0].color);
            let _rgb = HEX2RGB(_hex.hex);

            setPoint(storeGradient.current.colorData[0]);
            if (grad_area.current) {
                grad_area.current.style.background = storeGradient.current.gradient;
            }
            changeAllParams(_hex.hex, _rgb, _hex.A);
        }

        setType(n);
        __type__.current = n;
    }

    // ---------- 切换颜色组 ----------
    function switchColorGroup(type) {
        setCG(type);
    }

    // ---------- 创建颜色选择组 ----------
    const createColorGroup = useCallback(
        (cg, type) => {
            let defaultColor = solidColor;
            let cg_mark = 's';
            // 根据模式更换默认数据
            switch (cg) {
                case 's':
                    if ([2, 3].includes(type)) {
                        defaultColor = gradientColor;
                    }
                    break;
                case 'r':
                    defaultColor = custom.current;
                    cg_mark = 'r';
                    break;
                default:
                    break;
            }

            return _.isArray(defaultColor) && defaultColor.length > 0
                ? defaultColor.map((item, i) => {
                      let _color, isAct;
                      if (_.isObject(item)) {
                          _color = {
                              type: 2,
                              gradient: createGradient(item.gradData),
                              rotate: item.rotate,
                              colorData: item.gradData,
                              gradient_bg: createGradient(item.gradData, item.rotate),
                          };
                      } else {
                          _color = transStrColor(item);
                      }
                      const _c = [2, 3].includes(_color.type)
                          ? _color.gradient_bg
                          : HEX2RGBA(_color.colorData);
                      // 判断选中色
                      isAct = cg_Point === `${cg_mark}_${i}`;

                      return (
                          <li
                              className={`${styles.custom_palette_color} ${
                                  isAct ? styles.sys_act : ''
                              }`}
                              key={_c}
                              onClick={selectColor.bind(null, _color, `${cg_mark}_${i}`)}
                          >
                              <span
                                  className={styles.system_color_default}
                                  style={{ background: _c }}
                              ></span>
                          </li>
                      );
                  })
                : null;
        },
        [update, show, cg_Point],
    );

    // ---------- 关闭面板 ----------
    function closePanel() {
        if (closePallet && typeof closePallet === 'function') {
            closePallet(false);
        }
    }

    // 拾取颜色
    function eyeDropper() {
        // 如果此功能不支持 EyeDropper
        if (!window.EyeDropper) return;

        const _eyeDropper = new window.EyeDropper();
        const abortController = new AbortController();
        setDye(true);

        _eyeDropper
            .open({ signal: abortController.signal })
            .then(result => {
                setDye(false);
                let _c = result.sRGBHex.toUpperCase();
                rgb_update(HEX2RGB(_c));

                // 手动修改色值后更新
                colorHandle(_c, A);

                if ([2, 3].includes(type)) {
                    gradUpdate(HEX2RGB(_c), A);
                }
            })
            .catch(e => {
                setDye(false);
                abortController.abort();
            });
    }

    return ReactDom.createPortal(
        <div
            className={styles.color_panel}
            style={{ top, left, display: show ? 'block' : 'none' }}
            onClick={stopEvent}
            onMouseDown={stopEvent}
            ref={colorPanel}
        >
            <div className={styles.drag_move} onMouseDown={dragPanel}></div>
            <div className={styles.close_panel} onClick={closePanel}></div>
            {/* 颜色填充类型选择 */}
            <div className={styles.color_panel_main}>
                <div className={styles.color_panel_header}>
                    {tranColor ? (
                        <span
                            className={`${styles.tran_color} ${type === 0 ? styles.color_act : ''}`}
                            onClick={switchType.bind(null, 0)}
                        ></span>
                    ) : null}
                    <span
                        className={`${styles.pure_color} ${type === 1 ? styles.color_act : ''}`}
                        onClick={switchType.bind(null, 1)}
                    ></span>
                    {linearGrad ? (
                        <span
                            className={`${styles.grad_color} ${type === 2 ? styles.color_act : ''}`}
                            onClick={switchType.bind(null, 2)}
                        ></span>
                    ) : null}
                    {radialGrad ? (
                        <span
                            className={`${styles.radial_grad_color} ${
                                type === 3 ? styles.color_act : ''
                            }`}
                            onClick={switchType.bind(null, 3)}
                        ></span>
                    ) : null}
                </div>

                {[2, 3].includes(type) ? (
                    <>
                        {/* 渐变色阀值设置 */}
                        <div className={styles.grad_setting}>
                            <div className={styles.grad_area} ref={gradArea}>
                                <div className={styles.grad_area_bg}>
                                    <div
                                        className={styles.grad_area_color}
                                        onClick={createThreshold}
                                        // style={{ background: grad.gradient }}
                                        ref={grad_area}
                                    >
                                        <div className={styles.grad_path}>
                                            {grad.colorData.map((item, i) => {
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
                                                        onClick={stopEvent}
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
                        {type === 2 ? (
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
                                            style={{ width: `${(grad.rotate * 100) / 360}%` }}
                                        ></span>
                                        <div className={styles.angle_bar_pos}>
                                            <span
                                                className={styles.angle_point}
                                                style={{
                                                    left: `${(grad.rotate * 100) / 360}%`,
                                                }}
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.angle_input_group}>
                                    <input
                                        type="text"
                                        className={styles.angle_input}
                                        defaultValue={grad.rotate}
                                        onChange={changeAngle}
                                        ref={angleInput}
                                        maxLength={3}
                                        onKeyDown={stopEvent}
                                    />
                                    <span className={styles.icon_deg}>°</span>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : null}

                <div className={styles.color_picker_body}>
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
                                    <div className={styles.rail}>
                                        <span className={styles.wrap} ref={opt_point} />
                                    </div>
                                    <span className={styles.rail_bg} ref={opt_rail}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 手动设置色值 */}
                    <div className={styles.hand_section}>
                        {/* 当前选中色 */}
                        <div className={styles.view_color}>
                            <div className={styles.view_select_color} ref={select_color} />
                            {window.EyeDropper ? (
                                <div
                                    className={styles.eye_dropper}
                                    onClick={eyeDropper}
                                    style={{
                                        background: dye ? '#1d71b6' : null,
                                    }}
                                >
                                    <img src={dye ? DYE_ACT : DYE} alt="" />
                                </div>
                            ) : null}
                        </div>
                        <label className={`${styles.color_input} ${styles.hex_input}`}>
                            <input
                                type="text"
                                // defaultValue={getPureHex(color)}
                                onBlur={ev => saveValue('hex', ev)}
                                onFocus={ev => storeValue('hex', ev)}
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
                                onFocus={ev => storeValue('R', ev)}
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
                                onFocus={ev => storeValue('G', ev)}
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
                                onFocus={ev => storeValue('B', ev)}
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
                                // defaultValue={A}
                                onBlur={ev => saveValue('A', ev)}
                                onFocus={ev => storeValue('A', ev)}
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

                {/* 常用色值列表 */}
                <div className={styles.custom_color_list}>
                    <p>
                        <span
                            className={`${styles.custom_tab} ${cg === 's' ? styles.tab_act : ''}`}
                            data-id={'system'}
                            onClick={switchColorGroup.bind(null, 's')}
                        >
                            预设颜色
                        </span>
                        <span
                            className={`${styles.custom_tab} ${cg === 'r' ? styles.tab_act : ''}`}
                            data-id={'custom'}
                            onClick={switchColorGroup.bind(null, 'r')}
                        >
                            最近使用
                        </span>
                    </p>
                    <ul className={styles.custom_palette}>{createColorGroup(cg, type)}</ul>
                </div>
            </div>
        </div>,
        document.body,
    );
}

export default Pallet;
