import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import * as yup from 'yup'
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from '../../utils/consts';
import classes from './AuthPage.module.scss'
import {useDispatch} from 'react-redux';
import {logIn, signUp} from '../../store/user';
import Slider from '../../components/UI/slider/Slider';
import AuthInput from "../../components/UI/inputs/authInput/AuthInput";

const AuthPage = observer(() => {
        const {pathname} = useLocation()
        const [login, setLogin] = useState('')
        const [nickName, setNickName] = useState('')
        const [password, setPassword] = useState('')
        const [errors, setErrors] = useState({})
        const navigate = useNavigate()
        const isLogin = pathname === LOGIN_ROUTE

        const dispatch = useDispatch()

        const checkLoginOrRegistration = async () => {
            try {
                if (isLogin) {
                    dispatch(logIn(login, password))
                } else {
                    dispatch(signUp(login, nickName, password))
                }
                navigate(MAIN_ROUTE)
            } catch (e) {
                console.log(e.response.data)
            }
        }

        const validateScheme = yup.object().shape({
            password: yup
                .string()
                .matches(/(?=.{4,})/, 'Минимальная длина 4 символа'),
            nickName: yup
                .string()
                .matches(/(?=.{4,})/, 'Минимальная длина 4 символа'),
            login: yup
                .string()
                .matches(/(?=.{4,})/, 'Минимальная длина 4 символа')
        })

        useEffect(() => {
            validate()
        }, [login, nickName, password])

        const registrationValidate = {
            login: login,
            nickName: nickName,
            password: password,
        }

        const validate = () => {
            validateScheme
                .validate(registrationValidate)
                .then(() => setErrors({}))
                .catch((err) => setErrors({[err.path]: err.message}))
            return Object.keys(errors).length === 0
        }

        const isValid = Object.keys(errors).length === 0;

        const handleSubmit = () => {
            const isValid = validate()
            if (isValid) return
        }

        const handleClearInputs = () => {
            setLogin('')
            setNickName('')
            setPassword('')
        }


        return (
            <div className={classes.auth_page}>
                <div className={classes.description}>
                    <Slider/>
                    <p>1. Простой и понятный интерфейс</p>
                    <p>2. Возможность поиска и сортировки операций</p>
                    <p>3. Информация отдельно по каждой карте</p>
                    <p>4. Можно поставить картинку в личном кабинете :)</p>
                </div>
                <div>
                    {isLogin ?
                        <div className={classes.login}>
                            <h2>Авторизация</h2>
                            <form className={classes.form}>
                                <div className={classes.textbox}>
                                    <AuthInput
                                        type='text'
                                        value={login}
                                        onChange={e => setLogin((e.target.value).trim())}
                                    />
                                    <label>Login</label>
                                </div>
                                <div className={classes.textbox}>
                                    <AuthInput
                                        type='password'
                                        value={password}
                                        onChange={e => setPassword((e.target.value).trim())}
                                    />
                                    <label>Password</label>
                                </div>
                            </form>
                            <div className={classes.auth_submit}>
                                <div>
                                    <Link
                                        onClick={() => handleClearInputs()}
                                        to={REGISTRATION_ROUTE}
                                        className={classes.auth_link}
                                    >
                                        Регистрация
                                    </Link>
                                </div>
                                <div>
                                    <button
                                        className={classes.auth_button}
                                        onClick={checkLoginOrRegistration}
                                    >
                                        Войти
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={classes.login}>
                            <h2>Регистрация</h2>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <div className={classes.textbox}>
                                    <AuthInput
                                        type='text'
                                        value={login}
                                        onChange={e => setLogin((e.target.value).trim())}
                                    />
                                    <label>Login</label>
                                    {(login !== '' && errors.login) && <p>{errors.login}</p>}
                                </div>
                                <div className={classes.textbox}>
                                    <AuthInput
                                        type='text'
                                        value={nickName}
                                        onChange={e => setNickName((e.target.value).trim())}
                                    />
                                    <label>Nickname</label>
                                    {(nickName !== '' && errors.nickName) && <p>{errors.nickName}</p>}
                                </div>
                                <div className={classes.textbox}>
                                    <AuthInput
                                        type='password'
                                        value={password}
                                        onChange={e => setPassword((e.target.value).trim())}
                                    />
                                    <label>Password</label>
                                    {(password !== '' && errors.password) && <p>{errors.password}</p>}
                                </div>
                            </form>
                            <div className={classes.auth_submit}>
                                <div>
                                    <Link
                                        onClick={() => handleClearInputs()}
                                        to={LOGIN_ROUTE}
                                        className={classes.auth_link}
                                    >
                                        Авторизация
                                    </Link>
                                </div>
                                <div>
                                    <button
                                        className={classes.auth_button}
                                        onClick={checkLoginOrRegistration}
                                        disabled={!isValid}
                                    >
                                        Зарегистрироваться
                                    </button>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
        );
    }
)

export default AuthPage;