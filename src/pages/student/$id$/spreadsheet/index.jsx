import React, { useEffect, useRef } from 'react';
import Spreadsheet from 'x-data-spreadsheet';
import zhCN from 'x-data-spreadsheet/dist/locale/zh-cn';
import styles from './index.less';

function Excel(props) {
    const dom = useRef('');

    useEffect(() => {
        Spreadsheet.locale('zh-cn', zhCN);
        if (dom.current) {
            console.log(
                document.documentElement.clientWidth,
                document.documentElement.clientHeight,
            );

            const s = new Spreadsheet('#x-spreadsheet-demo')
                .loadData({
                    mode: 'edit', // edit | read
                    showToolbar: true,
                    showGrid: true,
                    showContextmenu: true,
                    view: {
                        height: () => document.documentElement.clientHeight,
                        width: () => document.documentElement.clientWidth,
                    },
                    row: {
                        len: 150,
                        height: 30,
                    },
                    col: {
                        len: 30,
                        width: 140,
                        indexWidth: 60,
                        minWidth: 60,
                    },
                    style: {
                        bgcolor: '#ffffff',
                        align: 'left',
                        valign: 'middle',
                        textwrap: false,
                        strike: false,
                        underline: false,
                        color: '#0a0a0a',
                        font: {
                            name: 'Helvetica',
                            size: 10,
                            bold: false,
                            italic: false,
                        },
                    },
                }) // load data
                .change(data => {
                    // save data to db
                }); // data validation

            console.log(s);
            s.validate();
            s.on('cells-selected', (cell, { sri, sci, eri, eci }) => {
                console.log(cell, { sri, sci, eri, eci });
            });
        }
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div id="x-spreadsheet-demo" className={styles.div} ref={dom}></div>
        </div>
    );
}

export default Excel;
