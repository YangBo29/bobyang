import React from 'react';
import propData from './data';
import styles from './index.less';
import _ from 'lodash';

function Tree(props) {
    const { data2d = propData, data3d = [] } = props;

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
    function createTree(trees = [], event = true) {
        if (!_.isArray(trees)) return <div>数据错误</div>;
        return (
            <div className={styles.tree_list}>
                {trees.map((tree, i) => {
                    if (!_.isArray(tree)) return null;

                    return (
                        <div className={styles.tree_list_group} key={i}>
                            <p className={styles.tree_list_group_title}>{i ? '场景层' : 'UI层'}</p>
                            {/* 2d 数据结构生成 */}
                            {create2dContent(tree, event)}
                            {/* { i ? create2dContent(tree,event) : create2dContent(tree, event)} */}
                        </div>
                    );
                })}
            </div>
        );
    }

    // 类型数据区分
    function create2dContent(tree = [], event = true) {
        if (!_.isArray(tree)) return null;

        // 2d | 3d 数据结构完成分配
        return tree.length ? tree.map(cpt => createClassify(cpt, event)) : null;
    }

    // 根节点开始生成结构
    function createClassify(cpt = {}, event = true, type = false) {
        // 数据整合提取
        let data = extractData(cpt, cpt.componentType);

        switch (cpt.componentType) {
            case '5001':
            case '4901':
                return createItems(cpt.componentName, data, event);
            default:
                return createItem(data.componentId || data.id, data.componentName, event);
        }
    }

    // 生成集合项
    function createItems(title = '', items = [], event = true) {
        if (!_.isArray(items)) return null;

        return (
            <dl className={styles.items}>
                <dt className={styles.items_title}>{title}</dt>
                {items.map(item => {
                    switch (item.componentType) {
                        case '5001':
                            return createClassify(item, event);
                        case '4901':
                            return createDynamic(item, event);
                        default:
                            return createItem(item, event);
                    }
                })}
            </dl>
        );
    }

    // 生成页集合项
    function createDynamic(item, event = true) {
        if (!_.isObject(item)) return null;
        let data = extractData(item, item.componentType);

        return (
            <dl className={styles.items}>
                <dt className={styles.items_title} data-id={item.componentId}>
                    {item.componentName}
                </dt>
                {data.length
                    ? data.map(page => {
                        return (
                            <dl className={styles.items} key={page.pageId}>
                                <dt className={styles.items_title} data-id={page.pageId}>
                                    {page.pageName}
                                    {createDynamicPage(page, event)}
                                </dt>
                            </dl>
                        );
                    })
                    : null}
            </dl>
        );
    }

    // 生成动态面板页
    function createDynamicPage(page = {}, event = true) {
        if (!_.isObject(page)) return null;

        return page?.componentList?.length
            ? page.componentList.map(item => {
                switch (item.componentType) {
                    case '5001':
                        return createClassify(item, event);
                    default:
                        return createItem(item, event);
                }
            })
            : null;
    }

    // 生成单选项
    function createItem(item, event) {
        switch (item.componentType) {
            case '5001':
            case '4901':
                return createClassify(item, event);
            default:
                return (
                    <dd
                        className={styles.item}
                        key={(item.componentId || item.id, item.componentName)}
                        data-item={(item.componentId || item.id, item.componentName)}
                    >
                        {item.componentName}
                    </dd>
                );
        }
    }

    return createTree([data2d, data3d]);

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
