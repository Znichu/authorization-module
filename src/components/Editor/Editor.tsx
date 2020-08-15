import React from "react";
import style from './Editor.module.css'

import ReactPlayer from 'react-player'


export const Editor = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.youtubePlayer}>
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

