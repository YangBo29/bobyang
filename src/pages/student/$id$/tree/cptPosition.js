/**
 * author : yangbo
 * date : 2021/07/26 14:22:30
 * fileName: cptPosition.js
 * description : 组件查找逻辑
**/

import { isEmpty, cloneDeep } from 'lodash';

/**
 * 根据 id 查找在集合中的所在位置
 * ids：定位id集合
 * 样例 {
 *    [id] : {
 *              apiType: '2D',
 *              ...要修改属性（仅限1级）
 *           }
 *      }
 *  list：查找范围
 *  dataUpdate：查找路径时，是否更新数据，即[id] 传入的属性
 */

export const getCptPosition = (ids = {}, list = [], dataUpdate) => {
    // 目标坐标
    let pos = {
        __path__: {},
    };

    let callback = function (state, id) {
        pos.__path__[id] = cloneDeep(state);
        pos[id] = state.reduceRight((a, b) => {
            b.chainNext = [a];
            return b;
        });
    };

    // 多次查找
    for (let key in ids) {
        for (let i = 0; i < list.length; i++) {
            // 找到目标中断后面循环
            if (isEmpty(ids)) break;
            batchProcessing({ [key]: ids[key] }, list[i], [], '', dataUpdate, callback);
        }
    }

    /**
     * 组件定位
     * ids：定位id集合
     * 样例 {
     *    [id] : {
     *              apiType: '2D',
     *              ...要修改属性（仅限1级）
     *           }
     *      }
     * node：组件数据
     * pos：借用数组，传空数组即可
     * dataUpdate：查找路径时，是否更新数据，即[id] 传入的属性
     * callback：返回路径集合和对应id
     */

    function locationCpt(ids = {}, node, pos = [], pageId = '', dataUpdate, callback) {
        if (ids[node.componentId]) {
            pos.push({
                chainId: node.componentId,
                chainType: ids[node.componentId].apiType || '2D',
                chainPage: pageId,
                chainNext: null,
            });

            // 执行回调
            if (callback && typeof callback === 'function') {
                // 默认不更新
                if (dataUpdate) {
                    for (let v in ids[node.componentId]) {
                        if (node[v]) {
                            node[v] = ids[node.componentId][v];
                        }
                    }
                }
                callback(pos, node.componentId);
            }

            // 删除处理后id
            delete ids[node.componentId];
            return;
        }

        // 如果传入组件是组合或者动态面板回到fn2执行
        if (node.componentType === '5001' || node.componentType === '4901') {
            batchProcessing(ids, node, pos, pageId, dataUpdate, callback);
        }
    }

    /**
     * 处理特殊类型组件
     * 参数同 locationCpt
     */
    function batchProcessing(ids = {}, node, pos = [], pageId = '', dataUpdate, callback) {
        // 找到目标中断后面循环
        if (isEmpty(ids)) return;

        // 动态面板和组合的第一层处理逻辑
        if (node.componentType === '5001' || node.componentType === '4901') {
            if (ids[node.componentId]) {
                locationCpt(ids, node, pos, '', dataUpdate, callback);
                return;
            }
        }

        if (node.componentType === '5001') {
            // 组合处理
            for (let i = 0; i < node.groupModel.groupList.length; i++) {
                // 找到目标中断后面循环
                if (isEmpty(ids)) break;

                // 赋值新入时路径
                const _pos = [...pos];

                // 补充本级路径
                _pos.push({
                    chainId: node.componentId,
                    chainType: '2D',
                    chainPage: pageId,
                    chainNext: null,
                });

                // 进入下一级处理
                locationCpt(ids, node.groupModel.groupList[i], _pos, '', dataUpdate, callback);
            }
        } else if (node.componentType === '4901') {
            // 动态面板处理
            for (let i = 0; i < node.dynamicModel.pageList.length; i++) {
                // 找到目标中断后面循环
                if (isEmpty(ids)) break;

                for (let j = 0; j < node.dynamicModel.pageList[i].componentList.length; j++) {
                    // 找到目标中断后面循环
                    if (isEmpty(ids)) break;

                    // 赋值新入时路径
                    const _pos = [...pos];

                    // 补充本级路径
                    _pos.push({
                        chainId: node.componentId,
                        chainType: '2D',
                        chainPage: '',
                        chainNext: null,
                    });

                    // 进入下一级处理
                    locationCpt(
                        ids,
                        node.dynamicModel.pageList[i].componentList[j],
                        _pos,
                        node.dynamicModel.pageList[i].pageId,
                        dataUpdate,
                        callback,
                    );
                }
            }
        } else {
            // 直接对比组件是否是查找目标
            locationCpt(ids, node, pos, '', dataUpdate, callback);
        }
    }

    // 返回组件路径结果
    return pos;
};
