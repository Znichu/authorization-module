import React, {memo, ReactElement} from 'react'
import {Switch} from "antd";
import s from './SwitchTable.module.scss'

export const SwitchTable = memo((props: any): ReactElement => {

    return(
        <div className={s.SwitchTable}>
            <Switch checkedChildren="My Packs"
                    unCheckedChildren="All Packs"
                    onClick={props.switchPacksHandler}
                    checked={props.packsToogle}/>
        </div>
    );
});


