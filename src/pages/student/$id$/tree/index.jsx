import React, {
    useState,
    useRef,
    //    useEffect,
    // useMemo,
} from 'react';
import { propData, checkedData } from './data';
import styles from './index.less';
import _ from 'lodash';

function Tree(props) {
    const {
        // eventId = '',
        data2d = propData, // 2D数据
        data3d = [], // 3D数据
        checked = checkedData, // 选中项数据
    } = props;
    // // 2D 搜索结果
    // const [s2, setS2] = useState([]);
    // // 3D 搜索结果
    // const [s3, setS3] = useState([]);
    // // 选中项集合
    const [select] = useState(checked.linkUrl);

    // // 搜索内容
    // const selectValue = useRef([]);
    // // 搜索开启
    const [search] = useState(false);
    // 搜索组件
    const search_input = useRef(null);

    // 选中项发生改变时更新选中文案
    // const selectList = useMemo(() => {
    //     if (select.length === 0) return '请选择目标';
    //     let _list = [];

    //     function findSelect(select, data2d) {
    //         const data = extractData(data2d, data2d.componentType);
    //         // 根据选中项查找选中目标列表
    //         select.forEach(link => {
    //             // 查找目标
    //             let _obj = [];

    //             if (data2d.componentType === '4901' && link.chainPage) {
    //                 _obj = data.map(p => {
    //                     return p.componentList.filter(cpt => cpt.componentId === link.chainId);
    //                 });
    //             } else {
    //                 _obj = data.filter(cpt => cpt.componentId === link.chainId);
    //             }

    //             // 寻找目标存在
    //             if (_obj.length) {
    //                 if (link.chainNext !== null) {
    //                     findSelect(link.chainNext, _obj[0]);
    //                 } else {
    //                     _list.push(_obj[0].componentName);
    //                 }
    //             }
    //         });
    //     }

    //     findSelect(select, data2d);

    //     return _list.join('') || '请检查选中项中是否存在';
    // }, [select, data2d]);

    // 数据结构分选
    function extractData(data, type) {
        switch (type) {
            case '5001':
                return _.get(data, 'groupModel.groupList', []);
            case '4901':
                return _.get(data, 'dynamicModel.pageList', []);
            default:
                return data;
        }
    }

    // 树结构
    function create2dTree(trees = [], select = []) {
        if (!_.isArray(trees)) return <div>数据错误</div>;

        return trees.length
            ? trees.map(cpt => createClassify(cpt, { event: true, active: select }))
            : null;
    }

    /**
     * 根节点开始生成结构
     * cpt: 组件数据
     * option: 传递配置项
     *        event: 子集是否可操作
     *        active: 选中项链结构
     *        current: 选中项id
     * */
    function createClassify(cpt = {}, option = { event: true, active: null }, pageId) {
        // 数据整合提取
        const data = extractData(cpt, cpt.componentType);

        switch (cpt.componentType) {
            case '5001':
            case '4901':
                return createItems(cpt, data, option, pageId);
            default:
                return createItem(data, option, pageId);
        }
    }

    /**
     *  查找激活元素
     * select: 同级选中项
     * id：寻找组件id
     * type: 组件类型
     * event: 子集是否响应事件
     */
    function findActive(select = null, cpt, event = true, pageId) {
        if (!select) {
            return {
                active: null,
                event,
            };
        }

        // 选中项集合
        let active = null;
        // 子集是否响应事件
        let _event = event;
        // 选中项id
        let current = '';
        // 选中项名称
        let name = '';
        // 查找目标项
        let _t = [];

        if (pageId) {
            _t = select.filter(c => c.chainId === cpt.componentId && c.chainPage === pageId);
        } else {
            _t = select.filter(c => c.chainId === cpt.componentId);
        }

        if (_t.length > 0) {
            active = _t[0];
        }

        if (active?.chainNext === null) {
            switch (cpt.componentType) {
                case '5001':
                case '4901':
                    _event = false;
                    break;
                default:
                    _event = true;
                    break;
            }

            current = cpt.componentId;
            name = cpt.componentName;
        } else {
            _event = true;
        }

        return {
            active: active ? active.chainNext : null,
            event: _event,
            current,
            name,
        };
    }

    /**
     * 生成集合项
     * title: 标题名字
     * items: 数据集合
     * option: 传递配置项
     *        event: 子集是否可操作
     *        active: 选中项链结构
     *        current: 选中项id
     * */

    function createItems(cpt, items = [], option = { event: true, active: null }, pageId = '') {
        if (!_.isArray(items)) return null;

        // 计算父级节点时候处于可编辑状态
        let _option = findActive(option.active, cpt, option.event, pageId);

        return (
            <dl
                className={`${styles.item} ${
                    cpt.componentId === _option.current ? styles.item_act : ''
                }`}
            >
                <dt className={`${option.event ? styles.item_base : styles.item_dis}`}>
                    {cpt.componentName}
                </dt>
                {items.map(item => {
                    switch (item.componentType) {
                        case '5001':
                            return createClassify(item, _option);
                        case '4901':
                            return createDynamic(item, _option);
                        default:
                            return createItem(item, _option);
                    }
                })}
            </dl>
        );
    }

    // 生成单选项
    function createItem(cpt, option = { event: true, active: null }, pageId = '') {
        if (!_.isObject(cpt)) return null;

        // 计算父级节点时候处于可编辑状态
        let _option = findActive(option.active, cpt, option.event, pageId);

        return (
            <dd
                className={`${styles.item} ${option.event ? styles.item_base : styles.item_dis} ${
                    cpt.componentId === _option.current ? styles.item_act : ''
                }`}
                key={cpt.componentId || cpt.id}
                data-item={cpt.componentId || cpt.id}
            >
                {cpt.componentName}
            </dd>
        );
    }

    // 生成页集合项
    function createDynamic(cpt, option = { event: true, active: null }) {
        if (!_.isObject(cpt)) return null;
        let data = extractData(cpt, cpt.componentType);

        // 计算父级节点时候处于可编辑状态
        let _option = findActive(option.active, cpt, option.event);

        return (
            <dl
                className={`${styles.item} ${
                    cpt.componentId === _option.current ? styles.item_act : ''
                }`}
            >
                <dt
                    className={`${option.event ? styles.item_base : styles.item_dis}`}
                    data-id={cpt.componentId}
                >
                    {cpt.componentName}
                </dt>
                {data.length
                    ? data.map(page => {
                        return (
                            <dl className={styles.item} key={page.pageId}>
                                <dt
                                    className={`${
                                        option.event ? styles.item_base : styles.item_dis
                                    } ${
                                        cpt.componentId === _option.current ? styles.item_act : ''
                                    }`}
                                    data-id={page.pageId}
                                >
                                    {page.pageName}
                                </dt>
                                {page?.componentList?.length
                                    ? page.componentList.map(item => {
                                        switch (item.componentType) {
                                            case '5001':
                                                return createClassify(
                                                    item,
                                                    _option,
                                                    page.pageId,
                                                );
                                            default:
                                                return createItem(item, _option, page.pageId);
                                        }
                                    })
                                    : null}
                            </dl>
                        );
                    })
                    : null}
            </dl>
        );
    }

    // 提取选中项展示文案

    return (
        <div className={styles.tree_list} style={{ width: '300px' }}>
            <div className={styles.view_area}>
                {/* 选中项名称列表， 单选显示名，多闲显示首选项 + ... */}
                {/* <p className={styles.active_list}>{selectList}</p> */}
                <p className={styles.active_list}>空项</p>
                {/* 搜索组件 */}
                {search ? (
                    <div className={styles.search_cpt}>
                        <input type="text" className={styles.search_input} ref={search_input} />
                        <span className={styles.search_icon}></span>
                    </div>
                ) : null}
            </div>

            <dl className={styles.tree_list_group}>
                <dt className={`${styles.item_base}`}>UI层</dt>
                {/* 2d 数据结构生成 */}
                {create2dTree(data2d, select)}
            </dl>

            <dl className={styles.tree_list_group}>
                <dt className={`${styles.item_base}`}>场景层</dt>
                {/* 2d 数据结构生成 */}
                {create2dTree(data3d)}
            </dl>
        </div>
    );

    // return createTree(data);
    // return (
    //     <div className={styles.tree_list}>
    //         <div className={styles.tree_list_group}>
    //             <p className={styles.tree_list_group_s}>层级</p>
    //             <dl className={styles.items}>
    //                 <dt className={styles.items_title}>标题</dt>
    //                 <dd className={styles.item}>选项一</dd>
    //                 <dd className={styles.item}>选项二</dd>
    //                 <dd className={styles.item}>选项三</dd>
    //                 <dl className={styles.items}>
    //                     <dt className={styles.items_title}>标题</dt>
    //                     <dd className={styles.item}>选项一</dd>
    //                     <dd className={styles.item}>选项二</dd>
    //                     <dd className={styles.item}>选项三</dd>
    //                     <dl className={styles.items}>
    //                         <dt className={styles.items_title}>标题</dt>
    //                         <dd className={styles.item}>选项一</dd>
    //                         <dd className={styles.item}>选项二</dd>
    //                         <dd className={styles.item}>选项三</dd>
    //                         <dd className={styles.item}>选项四</dd>
    //                     </dl>
    //                 </dl>
    //             </dl>
    //         </div>
    //     </div>
    // );
}

export default Tree;
