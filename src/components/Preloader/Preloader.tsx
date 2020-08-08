import React from "react";
import {Spin} from "antd";
import style from "./Preloader.module.css"

export function Preloader() {
    return (
        <div className={style.example}>
            <Spin />
        </div>
    )
}