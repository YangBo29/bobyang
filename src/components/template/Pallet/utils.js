/**
 * author : yangbo
 * date : 2020/04/26 18:25:39
 * fileName: colorUtils.js
 * description : 调色板使用函数
 **/

// 截取类型判断字段
export const _cutType = param => Object.prototype.toString.call(param).slice(8, -1);
export const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
// 空函数
export const noop = () => { };
// 判断是否是对象
export const isObject = param => _cutType(param) === 'Object';
// uuid
export const guid = (key = false) => {
    let res = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (Math.random() * 16) | 0;
        let v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    return key ? res : res.replace(/-/g, '');
};
// 阻止冒泡
export const stopEvent = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
}

