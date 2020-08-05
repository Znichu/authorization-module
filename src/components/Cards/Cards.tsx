import React from "react";
import Search from "antd/es/input/Search";
import style from './Cards.module.css'
import {Pagination} from "antd";

const Cards = () => {
    return (
        <div>
            <div>
                <Search
                    className={style.searchBar}
                    placeholder='input search text'
                    onSearch={value => console.log(value)}
                    enterButton="Search"
                />
            </div>
            <div>
                <Pagination defaultCurrent={1} total={100}/>
            </div>
        </div>
    )
};


export default Cards;