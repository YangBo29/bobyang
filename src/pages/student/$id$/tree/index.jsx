import React, {
    useState,
    useRef,
    //    useEffect,
    useMemo,
} from 'react';
import { propData, checkedData } from './data';
import { getCptPosition } from './cptPosition';
import styles from './index.less';
import _ from 'lodash';

function Tree(props) {
    const {
        // eventId = '',
        data2d = propData, // 2D数据
        data3d = [], // 3D数据
        checked = checkedData, // 选中项数据
    } = props;
    // 2D 搜索结果
    const [s2, setS2] = useState(data2d);
    // 3D 搜索结果
    const [s3, setS3] = useState(data3d);
    // 选中项集合
    const [select, setSelect] = useState(checked.linkId);

    // 搜索之缓存
    const storeSearchValue = useRef('');
    // 搜索开启
    const [search, setSearch] = useState(false);
    // 搜索组件
    const search_input = useRef(null);

    // 选中项发生改变时更新选中文案
    const selectList = useMemo(() => {
        if (select.length === 0) return '请选择目标';
        let _list = [];

        function findSelect(select, cpt) {
            if (!_.isArray(select)) return;
            // 数据识别
            const data = extractData(cpt, cpt.componentType);
            // 根据选中项查找选中目标列表
            select.forEach(link => {
                // 查找目标
                let _obj = [];

                if (cpt.componentType === '4901' && link.chainPage) {
                    let _dynamic = data.map(p => {
                        return p.componentList.filter(cpt => cpt.componentId === link.chainId);
                    });

                    _dynamic.forEach(cpt => {
                        _obj = [..._obj, ...cpt];
                    });
                } else {
                    _obj = data.filter(cpt => cpt.componentId === link.chainId);
                }

                // 寻找目标存在
                if (_obj.length) {
                    if (link.chainNext !== null) {
                        findSelect(link.chainNext, _obj[0] || []);
                    } else {
                        _list.push(_obj[0].componentName);
                    }
                }
            });
        }

        findSelect(select, data2d);

        switch (_list.length) {
            case 0:
                return '请检查选中项中是否存在';
            default:
                return _list.join('、');
        }
    }, [select, data2d]);

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
        // 判断组件类型
        let cpt_type = cpt.componentId ? '2D' : '3D';

        return (
            <dl
                className={`${styles.item} ${
                    cpt.componentId === _option.current ? styles.item_act : ''
                }`}
                key={cpt.componentId || cpt.id}
            >
                <dt
                    className={`${option.event ? styles.item_base : styles.item_dis}`}
                    onClick={
                        option.event
                            ? checkCpt.bind(null, cpt.componentId || cpt.id, cpt_type)
                            : null
                    }
                >
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
        // 判断组件类型
        let cpt_type = cpt.componentId ? '2D' : '3D';

        return (
            <dd
                className={`${styles.item} ${option.event ? styles.item_base : styles.item_dis} ${
                    cpt.componentId === _option.current ? styles.item_act : ''
                }`}
                key={cpt.componentId || cpt.id}
                data-item={cpt.componentId || cpt.id}
                onClick={
                    option.event ? checkCpt.bind(null, cpt.componentId || cpt.id, cpt_type) : null
                }
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
        // 判断组件类型
        let cpt_type = cpt.componentId ? '2D' : '3D';

        return (
            <dl
                className={`${styles.item} ${
                    cpt.componentId === _option.current ? styles.item_act : ''
                }`}
                key={cpt.componentId}
            >
                <dt
                    className={`${option.event ? styles.item_base : styles.item_dis}`}
                    data-id={cpt.componentId}
                    onClick={
                        option.event
                            ? checkCpt.bind(null, cpt.componentId || cpt.id, cpt_type)
                            : null
                    }
                >
                    {cpt.componentName}
                </dt>
                {data.length
                    ? data.map(page => {
                        return page?.componentList?.length ? (
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
                                {page.componentList.map(item => {
                                    switch (item.componentType) {
                                        case '5001':
                                            return createClassify(item, _option, page.pageId);
                                        default:
                                            return createItem(item, _option, page.pageId);
                                    }
                                })}
                            </dl>
                        ) : null;
                    })
                    : null}
            </dl>
        );
    }

    // 组件选中
    function checkCpt(ids, type) {
        let list = type === '2D' ? s2 : s3;
        let getPath = getCptPosition({ [ids]: { apiType: type } }, list, false);

        // 获取选择目标路径
        if (getPath.__path__[ids]) {
            let _select_ = _.cloneDeep(select);
            // 已选中项
            let gist = _select_;
            // 点击项路径层级
            let len = getPath.__path__[ids].length;
            // 上一层级数据缓存
            let prevGist = null;

            for (let i = 0; i < len; i++) {
                let _t = getPath.__path__[ids][i];
                // 查找目标项
                let find = gist.filter(g => g.chainId === _t.chainId);

                // 找到目标
                if (find.length > 0) {
                    // 寻找目标存在下层路径
                    if (find[0].chainNext) {
                        if (i === len - 1) {
                            // TODO 下层路径存在，但路径已经是尾部，用上层路径替换下层路径
                            let n;

                            // 如果没有上层数据，说明是顶层路径
                            if (!prevGist) {
                                prevGist = _select_;
                            }

                            // 遍历查找目标
                            for (let j = 0; j < prevGist.length; j++) {
                                let p = prevGist[j];

                                if (p.chainId === _t.chainId) {
                                    n = j;
                                    break;
                                }
                            }

                            // 如果找到位置信息
                            if (n !== undefined) {
                                // 上层路径替换下层路径
                                prevGist.splice(n, 1, _t);
                            }

                            // 更新选中项列表
                            setSelect(_select_);
                            break;
                        }

                        // 找到该路径，且还有下一层路径
                        gist = find[0].chainNext;

                        // 如果出现层级结构，缓存上一层级数据
                        prevGist = gist;
                    } else {
                        // 查找项位置
                        let n;

                        // 找到最终目标
                        if (prevGist && prevGist.length > 1) {
                            // 遍历查找目标
                            for (let j = 0; j < prevGist.length; j++) {
                                let p = prevGist[j];

                                if (p.chainId === _t.chainId) {
                                    n = j;
                                    break;
                                }
                            }

                            // 如果找到位置信息
                            if (n !== undefined) {
                                // 移除该项
                                prevGist.splice(n, 1);
                            }

                            // 移除项并且更新
                            setSelect(_select_);
                            break;
                        } else {
                            // TODO 单层路径处理

                            // 遍历查找目标
                            for (let j = 0; j < _select_.length; j++) {
                                let p = _select_[j];

                                if (p.chainId === getPath.__path__[ids][0].chainId) {
                                    n = j;
                                    break;
                                }
                            }

                            // 如果找到位置信息
                            if (n !== undefined) {
                                // 移除该项
                                _select_.splice(n, 1);
                            }

                            // 移除项并且更新
                            setSelect(_select_);
                            break;
                        }
                    }
                } else {
                    // 未找到目标
                    if (i === 0) {
                        // 如果第一级就没有找到目标，那就是没有选中
                        setSelect(select => [...select, getPath[ids]]);
                    } else {
                        // 如果没找目标位置非最后一项，合并剩余路径
                        if (i < len - 1) {
                            _t = getPath.__path__[ids].slice(i).reduceRight((a, b) => {
                                b.chainNext = [a];
                                return b;
                            });
                        }

                        // 合并操作
                        prevGist.push({
                            chainId: _t.chainId,
                            chainType: _t.chainType,
                            chainPage: _t.chainPage,
                            chainNext: _t.chainNext,
                        });

                        // 更新选中项
                        setSelect(_select_);
                    }

                    // 跳出循环
                    break;
                }
            }
        }

        console.log(getPath[ids], select);
    }

    // 进入搜索
    function openSearch() {
        setSearch(true);
    }

    // 退出搜索
    function closeSearch() {
        setSearch(false);
    }

    // 搜索内容
    function changeSearchValue(e) {
        let val = _.trim(e.target.value);

        // 执行数据过滤 2D
        filterData(val, data2d, '2D');
        // 执行数据过滤 3D
        // filterData(val,data3d, '3D');
    }

    // 过滤数据
    function filterData(value, originData, classify) {
        // 重复内容不做处理
        if (storeSearchValue.current === value) return;
        let _originData = _.cloneDeep(originData);

        // 缓存搜索内容
        storeSearchValue.current = value;

        // 输入有效值
        if (value) {
            // 过滤执行
            filterHandle(value, _originData);

            // 移除空项
            removeEmpty(_originData);
        }

        // 没有搜索内容
        if (classify === '2D') {
            setS2(_originData);
        } else if (classify === '3D') {
            setS3(_originData);
        }
    }

    // 移除空项执行函数
    function removeEmpty(data = []) {
        data.forEach((cpt, i) => {
            let _data = extractData(cpt, cpt.componentType);

            switch (cpt.componentType) {
                case '5001':
                    if (_data.length === 0) {
                        // 空项处理
                        data.splice(i, 1);
                    } else {
                        removeEmpty(_data);
                    }
                    break;
                case '4901':
                    // 处理动态面板内的空项
                    _data.forEach(p => {
                        p.componentList.forEach((cpt, i) => {
                            let _data = extractData(cpt, cpt.componentType);

                            switch (cpt.componentType) {
                                case '5001':
                                    if (_data.length === 0) {
                                        p.componentList.splice(i, 1);
                                    } else {
                                        removeEmpty(_data);
                                    }
                            }
                        });
                    });

                    // 检查动态面板内是否完全不符合条件
                    // eslint-disable-next-line no-case-declarations
                    let dynamicEmpty = _data.every(p => p.componentList.length === 0);

                    if (dynamicEmpty) {
                        data.splice(i, 1);
                    }
            }
        });
    }

    // 过滤函数执行
    function filterHandle(value = '', data = []) {
        if (!_.isArray(data)) return data;

        for (let i = 0; i < data.length; i++) {
            let cpt = data[i];
            let _data = extractData(cpt, cpt.componentType);

            if (!cpt.componentName.includes(value)) {
                switch (cpt.componentType) {
                    case '5001':
                        filterHandle(value, _data);
                        break;
                    case '4901':
                        _data.map(p => {
                            return p.componentList.map((cpt, i) => {
                                let _data = extractData(cpt, cpt.componentType);

                                if (!cpt.componentName.includes(value)) {
                                    switch (cpt.componentType) {
                                        case '5001':
                                            return filterHandle(value, _data);
                                        default:
                                            return p.componentList.splice(i, 1);
                                    }
                                }

                                return cpt;
                            });
                        });
                        break;
                    default:
                        data.splice(i, 1);
                        i--;
                        break;
                }
            }
        }
    }

    return (
        <div className={styles.tree_list} style={{ width: '300px' }}>
            <div className={styles.view_area}>
                {/* <p className={styles.active_list}>空项</p> */}
                {/* 搜索组件 */}
                {search ? (
                    <div className={styles.search_cpt}>
                        <input
                            type="text"
                            className={styles.search_input}
                            ref={search_input}
                            onMouseDown={closeSearch}
                            onInput={changeSearchValue}
                        />
                        <span className={styles.search_icon}></span>
                    </div>
                ) : (
                    // 选中项名称列表， 单选显示名，多闲显示首选项 + ...
                    <p className={styles.active_name} onMouseDown={openSearch}>
                        {selectList}
                    </p>
                )}
            </div>

            <dl className={styles.tree_list_group}>
                <dt className={`${styles.item_base}`}>UI层</dt>
                {/* 2d 数据结构生成 */}
                {create2dTree(s2, select)}
            </dl>

            <dl className={styles.tree_list_group}>
                <dt className={`${styles.item_base}`}>场景层</dt>
                {/* 2d 数据结构生成 */}
                {create2dTree(s3, select)}
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
