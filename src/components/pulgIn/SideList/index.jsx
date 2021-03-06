import React, { useMemo } from 'react';
import styles from './index.less';
import { Link } from 'umi';

// 列表配置
import sideConfig from '@rules/sideConfig';

function SideList(props) {
    // 生成菜单列表

    const createList = useMemo(() => {
        return sideConfig.map(item => {
            if (item.linkNext) {
                return (
                    <div key={item.linkKey}>
                        {item.linkActive ? createTitJump(item) : createTitle(item)}
                        <ul className={styles.content_list}>
                            {item.linkNext.map(next => {
                                return createLink(next);
                            })}
                        </ul>
                    </div>
                );
            }
            return item.linkActive ? createTitJump(item) : null;
        });
    }, []);

    // 生成操作标题栏
    function createTitle(item) {
        return (
            <p key={item.linkKey} className={styles.link_title}>
                {item.linkName}
            </p>
        );
    }

    // 生成标题式连接
    function createTitJump(item) {
        return (
            <div key={item.linkKey} className={styles.title_jump}>
                <Link to={`/student/${item.LinkKey}`}>{item.linkName}</Link>
            </div>
        );
    }

    // 生成连接
    function createLink(item) {
        return (
            <li key={item.linkKey}>
                {item.linkActive ? (
                    <Link to={`/student/${item.linkKey}`}>{item.linkName}</Link>
                ) : (
                    <span className={styles.dis_link}>{item.linkName}</span>
                )}
            </li>
        );
    }

    return <div className={styles.side_list}>{createList}</div>;
}

export default SideList;
