import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import jwt_decode from 'jwt-decode'
import CardsList from '../components/cards/CardsList';
import userImg from '../img/user.png'
import classes from './Pages.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getCards, loadCardList } from '../store/cards';
import { getUserInfo, loadUser, updateUser } from '../store/user';
import { loadOperationList } from '../store/operations';

const Userpage = observer(() => {
    const token = localStorage.getItem('token')
    const { id } = jwt_decode(token)
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()

    const user = useSelector(getUserInfo(id))

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addPhoto = () => {
        const fileData = new FormData()
        fileData.append('img', file)
        dispatch(updateUser(id, fileData))
        setFile(null)
    }

    useEffect(() => {
        dispatch(loadOperationList(id))
        dispatch(loadUser(id))
        dispatch(loadCardList(id))
    }, [])

    const cards = useSelector(getCards())

    return (
        <div className={classes.user_page_card}>
            <div className={classes.user_info}>
                {(user !== null && user !== undefined) ?
                    (user.img ?
                        <img className={classes.user_image} src={process.env.REACT_APP_API_URL + user.img} alt={userImg} />
                        :
                        <img className={classes.user_image} src={userImg} alt={userImg} />
                    )
                    :
                    <img className={classes.user_image} src={userImg} alt={userImg} />
                }
                <div className={classes.update_user_photo}>
                    <label className={classes.input_file}>
                        <input
                            type="file"
                            name='file'
                            onChange={selectFile}
                        />
                        <span>Выберите картинку</span>
                    </label>
                    <div>
                        <button
                            className={classes.update_photo_btn}
                            onClick={addPhoto}
                        >
                            Обновить
                        </button>
                    </div>
                </div>
                {(user !== null && user !== undefined) &&
                    <h2>{user.nickName}</h2>}
                <div>
                    <p>Количество счетов: {cards?.length}</p>
                </div>
            </div>
            <div className={classes.cards}>
                <div className={classes.cards_card}>
                    <h4>Ваши счета</h4>
                </div>
                <div className={classes.cards_list}>
                    <CardsList
                        cards={cards}
                    />
                </div>
            </div>
        </div>
    );
});

export default Userpage;