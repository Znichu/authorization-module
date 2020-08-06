import React from "react";
import Search from "antd/es/input/Search";
import style from './Cards.module.css'
import {Pagination} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setCards} from "../../redux/cards-reducer";
import {AppStateType} from "../../redux/store";


const Cards = () => {

    const dispatch = useDispatch();

    const testFunc = () => {
        dispatch(setCards())
    };

    const cards = useSelector((state: AppStateType) => state.cardsReducer.cards);

    return (
        <div>
            <div>
                <Search
                    className={style.searchBar}
                    placeholder='Enter search text'
                    onSearch={value => console.log(value)}
                    enterButton='Search'
                />
            </div>
            <div>
                <button onClick={testFunc}>Enter</button>
            </div>
            <div>
                {cards.map(card =>
                    <table>
                        <td>
                            <th>
                                {card._id}
                            </th>
                        </td>
                    </table>
                )}
            </div>
            <div>
                <Pagination defaultCurrent={1} total={100}/>
            </div>
        </div>
    )
};


export default Cards;