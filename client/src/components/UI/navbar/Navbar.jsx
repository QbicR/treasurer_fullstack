import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HISTORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, USER_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite'
import userImg from '../../../img/user.png'
import classes from './Navbar.module.scss'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, getUserInfo, loadUser, logOut } from '../../../store/user';


const Navbar = observer(() => {
    const [activePage, setActivePage] = useState()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const auth = useSelector(getIsLoggedIn())

    let id
    if (auth) {
        const token = localStorage.getItem('token')
        id = jwt_decode(token).id
    }

    const dispatch = useDispatch()

    const user = useSelector(getUserInfo())

    const logOutFromAcc = () => {
        dispatch(logOut())
        navigate(LOGIN_ROUTE)
        localStorage.removeItem('token')
    }

    useEffect(() => {
        dispatch(loadUser(id))
        if (pathname === MAIN_ROUTE) {
            setActivePage('Главная')
        } if (pathname === HISTORY_ROUTE) {
            setActivePage('История')
        } if (pathname === USER_ROUTE) {
            setActivePage('')
        }
    }, [])

    const handleMainPage = (event) => {
        navigate(MAIN_ROUTE)
        setActivePage(event.target.innerText)
    }

    const handleHistoryPage = (event) => {
        navigate(HISTORY_ROUTE)
        setActivePage(event.target.innerText)
    }

    const handleUserPage = () => {
        navigate(USER_ROUTE)
        setActivePage('')
    }

    return (
        (auth) && (
            <div className={classes.navbar}>
                <div className={classes.navbar_info}>
                    <div className={classes.navigate_btns}>
                        <button
                            className={activePage === 'Главная' ? classes.navbar_btn_active : classes.navbar_btn}
                            onClick={(handleMainPage)}
                        >
                            Главная
                        </button>
                        <button
                            className={activePage === 'История' ? classes.navbar_btn_active : classes.navbar_btn}
                            onClick={handleHistoryPage}
                        >
                            История
                        </button>
                    </div>
                    <div >
                        {pathname === '/user'
                            ?
                            <button
                                className={classes.navbar_btn}
                                onClick={() => logOutFromAcc()}
                            // disabled={(user === null || user === undefined)}
                            >
                                Выйти
                            </button>
                            :
                            <div className={classes.navbar_user_img}>
                                {(user !== null && user !== undefined) ?
                                    (user.img ?
                                        <img className={classes.navbar_user_img_icon} src={process.env.REACT_APP_API_URL + user.img} alt={userImg} />
                                        :
                                        <img className={classes.navbar_user_img_icon} src={userImg} alt={userImg} />
                                    )
                                    :
                                    <img className={classes.navbar_user_img_icon} src={userImg} alt={userImg} />
                                }
                                <button
                                    className={classes.navbar_btn}
                                    onClick={handleUserPage}
                                >
                                    {(user !== null && user !== undefined) ?
                                        (user.nickName ?
                                            user.nickName
                                            :
                                            "Профиль"
                                        )
                                        :
                                        "Профиль"
                                    }
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div >
        )
    );
})

export default Navbar;