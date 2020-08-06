import axios from 'axios'

const instance = axios.create({
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});

type Card = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    created: string
    updated: string
    __v: number
    _id: string
}

type ResponseType = {
    cards: Array<Card>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}


export const cardsApi = {
    getCards(cardsPack_id: string, sortCards: number, page: number, pageCount: number, token: string) {
        const queryParams = `?cardsPack_id=${cardsPack_id}&sortCards=${sortCards}grade&page=${page}&pageCount=${pageCount}&token=${token}`;
        return instance.get<ResponseType>(`cards/card${queryParams}`)
            .then(res => {
                return res.data;
            })
            .catch(e => {
                return e
            })
    }
};

//{
//     "newCardsPack": {
//         "_id": "5f2c540aaf0190000481bc95",
//         "user_id": "5f23099ae1cdfa2270c04854",
//         "user_name": "sindzi@gmail.com",
//         "private": false,
//         "name": "Sindzi",
//         "path": "/def",
//         "grade": 0,
//         "shots": 0,
//         "cardsCount": 0,
//         "type": "pack",
//         "rating": 0,
//         "created": "2020-08-06T19:03:38.403Z",
//         "updated": "2020-08-06T19:03:38.403Z",
//         "__v": 0
//     },
//     "success": true,
//     "token": "89075cf0-d817-11ea-b263-0b7d53cc2a7d",
//     "tokenDeathTime": 1597345418303
// }

//{
//     "newCard": {
//         "_id": "5f2c54f7af0190000481bc96",
//         "cardsPack_id": "5f2c540aaf0190000481bc95",
//         "user_id": "5f23099ae1cdfa2270c04854",
//         "answer": "no answer",
//         "question": "no question",
//         "grade": 0,
//         "shots": 0,
//         "type": "card",
//         "rating": 0,
//         "created": "2020-08-06T19:07:35.164Z",
//         "updated": "2020-08-06T19:07:35.164Z",
//         "__v": 0
//     },
//     "success": true,
//     "token": "1614fb70-d818-11ea-b263-0b7d53cc2a7d",
//     "tokenDeathTime": 1597345654951
// }