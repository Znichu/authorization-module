import React from "react";
import style from './Editor.module.css'

import ReactPlayer from 'react-player'
import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import {CloudDownloadOutlined, SaveOutlined, CloudUploadOutlined} from '@ant-design/icons';


export const Editor = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.textEditor}>
                <TextArea
                    autoSize={{minRows: 3, maxRows: 5}}
                />
                <div className={style.btnGroup}>
                    <Button type="primary" icon={<SaveOutlined />} >Save</Button>
                    <Button type="primary" icon={<CloudUploadOutlined />} >Send</Button>
                    <Button type="primary" icon={<CloudDownloadOutlined />} >Download</Button>
                </div>
            </div>
            <div className={style.player}>
                <ReactPlayer
                    url={'https://www.youtube.com/watch?v=pnkuI8KXW_8&t=43s'}
                    controls
                    width='560px'
                    height='315px'
                />
            </div>
        </div>
    )
}

