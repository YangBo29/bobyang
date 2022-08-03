import React, { useEffect, useRef } from 'react';
// import Spreadsheet from 'spreadsheet';
// import '@public/spreadsheet/spreadsheet.css';
import styles from './index.less';
import random from 'string-random';

const regData = [
    {
        pageId: random(32),
        pageName: '图表一',
        Title: '输入标题',
        Unit: '输入单位',
        Max: '',
        Dimension: [
            {
                Name: '系列1',
                Unit: '',
                Max: '',
                Group: [
                    {
                        Name: '',
                        Content: [
                            {
                                X: '类别1',
                                Y: 48,
                            },
                            {
                                X: '类别2',
                                Y: '47',
                            },
                            {
                                X: '类别3',
                                Y: '24',
                            },
                            {
                                X: '类别4',
                                Y: '48',
                            },
                            {
                                X: '类别5',
                                Y: '49',
                            },
                            {
                                X: '类别6',
                                Y: '66',
                            },
                        ],
                    },
                ],
            },
            {
                Name: '系列2',
                Unit: '',
                Max: '',
                Group: [
                    {
                        Name: '',
                        Content: [
                            {
                                X: '类别1',
                                Y: '67',
                            },
                            {
                                X: '类别2',
                                Y: '62',
                            },
                            {
                                X: '类别3',
                                Y: '69',
                            },
                            {
                                X: '类别4',
                                Y: '68',
                            },
                            {
                                X: '类别5',
                                Y: '66',
                            },
                            {
                                X: '类别6',
                                Y: '66',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        pageId: random(32),
        pageName: '图表二',
        Title: '输入标题',
        Unit: '输入单位',
        Max: '',
        Dimension: [],
    },
];

let config = {
    mode: 'edit', // edit | read
    showToolbar: false,
    showGrid: true,
    showContextmenu: true,
    sheetMaxLength: 7,
    view: {
        height: () => document.documentElement.clientHeight - 60,
        width: () => document.documentElement.clientWidth - 200,
    },
    row: {
        height: 24,
        len: 100,
    },
    col: {
        len: 26,
        width: 80,
        indexWidth: 60,
        minWidth: 60,
    },
    style: {
        bgcolor: '#151619',
        align: 'left',
        valign: 'middle',
        textwrap: false,
        strike: false,
        underline: false,
        color: '#fff',
        font: {
            name: 'Microsoft YaHei',
            size: 10,
            bold: false,
            italic: false,
        },
    },
};

function Excel(props) {
    const dom = useRef('');
    Spreadsheet.locale('zh-cn');
    useEffect(initSpreadsheet, []);

    function uts(data) {
        data = JSON.parse(JSON.stringify(data));
        let _data = data.rows;

        let res = {
            pageId: data.sheetId,
            pageName: data.name,
            Title: '输入标题',
            Unit: '输入单位',
            Max: '',
            Dimension: [],
        };

        // 编辑数据循环
        if (!_data[0]) {
            return res;
        }

        for (let r in _data['0'].cells) {
            let rd = _data['0'].cells[r];
            if (r === '0') continue;

            res.Dimension[r - 1] = {
                Name: rd.text,
                Unit: '',
                Max: '',
                Group: [
                    {
                        Name: '',
                        Content: [],
                    },
                ],
            };

            // 追加数据
            for (let c in _data) {
                if (c === '0' || c === 'len') continue;
                let cd = _data[c].cells;

                res.Dimension[r - 1].Group[0].Content[c - 1] = {
                    X: cd[0] ? cd[0].text || '' : '',
                    Y: cd[r] ? cd[r].text || '' : '',
                };
            }

            // 补足数据
            for (let i = 0; i < res.Dimension[r - 1].Group[0].Content.length; i++) {
                let id = res.Dimension[r - 1].Group[0].Content[i];

                if (!id) {
                    res.Dimension[r - 1].Group[0].Content[i] = {
                        X: '',
                        Y: '',
                    };
                }
            }
        }

        return res;
    }

    function loadTran(datas) {
        datas = JSON.parse(JSON.stringify(datas));

        datas = datas.map(d => {
            let _data = d.Dimension;
            let res = {
                autofilter: {},
                cols: { len: 26 },
                freeze: 'A1',
                merges: [],
                name: d.pageName,
                sheetId: d.pageId,
                rows: {},
                styles: [],
                validations: [],
            };

            for (let i = 0; i < _data.length; i++) {
                // 不存在新建
                if (!res.rows['0']) {
                    res.rows['0'] = { cells: {} };
                }

                // 追加数据
                res.rows['0'].cells[i + 1] = { text: _data[i].Name };

                for (let j = 0; j < _data[i].Group[0].Content.length; j++) {
                    let gd = _data[i].Group[0].Content;

                    // 如果行不存在
                    if (!res.rows[`${j + 1}`]) {
                        res.rows[`${j + 1}`] = { cells: {} };
                    }

                    // 如果列不存在
                    if (!res.rows[`${j + 1}`].cells[j]) {
                        res.rows[`${j + 1}`].cells['0'] = { text: gd[j].X };
                        res.rows[`${j + 1}`].cells[i + 1] = { text: gd[j].Y };
                    }

                    res.rows[`${j + 1}`].cells[i + 1] = { text: gd[j].Y };
                }
            }

            return res;
        });

        return datas;
    }

    function initSpreadsheet() {
        if (dom.current) {
            const s = new Spreadsheet('#x-spreadsheet-demo', config)
                .loadData(loadTran(regData)) // load data
                .change((data, dispatch) => {
                    let sheets = s.getData();

                    sheets = sheets.map(data => uts(data));

                    console.log(sheets);
                    // console.log(JSON.stringify(data.rows));
                });

            // 单格选中
            s.on('cell-selected', (cell, ri, ci) => {
                // console.log('cell-selected', cell, { ri, ci });
            });

            // 单格编辑
            s.on('cell-edited', (text, ri, ci) => {
                // console.log('cell-edited', text, ri, ci);
            });

            // 框选操作
            s.on('cells-selected', (cell, { sri, sci, eri, eci }) => {
                // console.log('cells-selected', cell, { sri, sci, eri, eci });
            });

            // 数据发生变化
            // s.change(function(data) {
            //     console.log('change', data);
            //     uts(data.rows);
            // });

            // 追加数据
            // let k = s
            //     .cellText(5, 5, 'xxxx')
            //     .cellText(6, 5, 'yyy')
            //     .cellText(6, 6, 'zzz');
            // k.reRender();

            // s.addSheet('追加表1');"
        }
    }

    return (
        <div>
            <div id="x-spreadsheet-demo" className={styles.div} ref={dom}></div>
        </div>
    );
}

export default Excel;
