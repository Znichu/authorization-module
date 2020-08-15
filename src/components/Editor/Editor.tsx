import React, {useState} from "react";
import style from './Editor.module.css'

import ReactPlayer from 'react-player'
import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import {CloudDownloadOutlined, SaveOutlined, CloudUploadOutlined} from '@ant-design/icons';


export const Editor = () => {

    const [value, setValue] = useState('')

    const onChange = ({ target: { value } }:any ) => {
        setValue(value)
    }
    const saveTextFile = (fileName: string, value: string) => {
        const link = document.createElement("a");

        // создаём Blob из строк которые находятся в стэйте
        const file = new Blob([value], {type: 'text/plain'});

        //URL.createObjectURL берёт Blob и создаёт уникальный URL для него в формате blob:<origin>/<uuid>.
        //пример: blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
        link.href = URL.createObjectURL(file);
        link.download = fileName;
        link.click();
        //удаляет внутреннюю ссылку на объект
        URL.revokeObjectURL(link.href)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.textEditor}>
                <TextArea
                    value={value}
                    autoSize={{minRows: 3, maxRows: 5}}
                    onChange={onChange}
                />
                <div className={style.btnGroup}>
                    <Button onClick={() => saveTextFile('Text.txt', value + `\r\n`)} type="primary" icon={<SaveOutlined />} >Save</Button>
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

