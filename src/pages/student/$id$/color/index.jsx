import React from 'react';
import styles from './index.less';
import { useState } from 'react';
import Pallet from '@components/template/Pallet';
import { useEffect } from 'react';

const cd = [
    {
        colorType: 1,
        solidColor: '#4E98CBFF', // 默认色值
        gradientColor: {
            gradientRotate: 0, // 渐变角度
            gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
            gradientLocations: [0, 1], // 渐变位置数组
        },
    },
    {
        colorType: 0,
        solidColor: '#4E98CBFF', // 默认色值
        gradientColor: {
            gradientRotate: 0, // 渐变角度
            gradientColors: ['#FFFFFFFF', '#000000FF'], // 渐变颜色数组
            gradientLocations: [0, 1], // 渐变位置数组
        },
    },
    {
        colorType: 2,
        solidColor: '#3094D9FF', // 默认色值
        gradientColor: {
            gradientRotate: 0, // 渐变角度
            gradientColors: ['#FFFFFFca', '#000000FF'], // 渐变颜色数组
            gradientLocations: [0, 1], // 渐变位置数组
        },
    },
    '#4E98CBFF',
    '2-90-0:#B876C300-0.5:#B9CEFFFF-1:#6B6B6BFF',
    '3-0-0:#B876C300-0.5:#B9CE00FF-1:#6Bc16BFF',
    '0-90-#4B6AB100',
    '1-0-#4B6AA1FF',
    '1-90#4B1AB1FF',
    '1-90-0:#4B1AB100',
];

export default function Color(props) {
    const [show, setShow] = useState(false);
    // 渐变色可选颜色点
    const pointNode = 5;
    // 开启纯色模式
    // const pure = false;
    // 是否支持透明色
    // const isTran = true;
    // 1纯色 2渐变色
    // const type = 1;
    // 色值
    const [c, setC] = useState('#FFFFFFFF');
    const [t, setT] = useState(-1);
    const [cbg, setCBG] = useState('rgba(255,255,255,1)');
    const [top, setTop] = useState(100);
    const [left, setLeft] = useState(400);

    function closeColor() {
        setShow(false);
    }

    function openColor(ev, c, t) {
        ev.persist();
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
        setC(c);
        setT(t);
        setShow(true);
        setTop(100 + 10 * t);
        setLeft(400 + 10 * t);
    }

    function callbackColorPalette(res) {
        if ([2, 3].includes(res.colorType)) {
            setCBG(res.webGradient);
        } else {
            setCBG(res.webSolid);
        }

        setC(res.gradColor_3d);
    }

    useEffect(() => {
        // console.log(cbg);
    }, [cbg]);

    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    top: 400,
                    left: 200,
                    width: '100px',
                    height: '100px',
                    background: cbg,
                    border: '2px solid #ccc',
                }}
            ></div>
            {cd.map((c, i) => {
                return (
                    <button
                        key={i}
                        className={styles.color_btn}
                        onMouseDown={ev => {
                            ev.persist();
                            ev.stopPropagation();
                            ev.nativeEvent.stopImmediatePropagation();
                        }}
                        onClick={ev => openColor(ev, cd[i], i)}
                    >
                        颜色面板{i + 1}
                    </button>
                );
            })}

            {/* <ColorPalette
                show={show}
                closePanel={closeColor}
                getColor={callbackColorPalette}
                pointNode={pointNode}
                pure={pure}
                isTran={isTran}
                top={100}
                left={300}
                colorType={type} // 1纯色 2渐变色
                solidColor={c} // 纯色
                // gradientColor={backtmpl.gradientColor} // 渐变色
            /> */}

            {show ? (
                <Pallet
                    show={show}
                    closePallet={closeColor}
                    getColor={callbackColorPalette}
                    pointNode={pointNode}
                    top={top}
                    left={left}
                    // linearGrad={false}
                    // radialGrad={false}
                    colorData={c} //纯色
                    update={t}
                />
            ) : null}
        </div>
    );
}
