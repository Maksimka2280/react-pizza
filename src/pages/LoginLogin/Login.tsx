import cn from 'classnames';
import './Login.css';
import InputLogin from '../../components/Input/InputLogin.tsx';
import Button from '../../components/Button/Button.tsx';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { typeAppDispatch } from '../../store/store.ts';
import { login, userActions } from '../../store/user.slice.ts';
import { Loginresponse } from '../../interfaces/auth.enterface.ts';

export interface LoginForm {
    email: {
        value: string,
    },
    password: {
        value: string,
    }
}

function LoginPage() {

    const [error, seterror] = useState<string | null>()
    const navigate = useNavigate()
    const dispatch = useDispatch<typeAppDispatch>();
    const jwt = useSelector((s: RootState) => s.user.jwt);
    useEffect(() => {
        if (jwt) {
            navigate('/')
        }
    }, [jwt, navigate])

    const submit = (e: FormEvent) => {
        e.preventDefault();
        seterror(null)
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        sendLogin(email.value, password.value);
    };

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
        // try { // в  axios все коды выше 200, 300, 400, обратываются как ошибки 
        //     const { data } = await axios.post<Loginresponse>(`${PREFIX}/auth/login`, {
        //         email,
        //         password,
        //     });
        //     console.log('Login successful:', data);

        //     dispatch(userActions.addJsw(data.access_token));
        //     navigate('/');
        // } catch (error) {

        //     seterror(error.response?.data?.message);
        // }
    };

    return (
        <div className={cn('big-container')}>
            <div className={cn('two-container')}>
                <form className={cn('login-container')} onSubmit={submit}>

                    <h1>Вход</h1>
                    <div className={cn('container-input')}>
                        {error && <div className={cn('error-div')}>{error}</div>}
                        <label htmlFor="email" className={cn('label-input')}>Ваш Email</label>
                        <InputLogin
                            type="email"
                            placeholder="Email"
                            name="email"
                            id='email'
                        />
                    </div>
                    <div className={cn('container-input2')}>
                        <label htmlFor="password" className={cn('label-input')}>Ваш пароль</label>
                        <InputLogin
                            type="password"
                            placeholder="Password"
                            name="password"
                            id='password'
                        />

                    </div>
                    <div className={cn('button-container')}>
                        <Button type="submit" appersnce="big">Вход</Button>
                    </div>
                    <div className={cn('text-container')}>
                        <p className={cn('text-1')}>Нет аккаунта?</p>
                        <p className={cn('text-2')}>Зарегистрироваться</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
