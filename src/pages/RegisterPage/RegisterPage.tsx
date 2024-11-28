import cn from 'classnames';
import './RegisterPage.css';
import InputLogin from '../../components/Input/InputLogin.tsx';
import Button from '../../components/Button/Button.tsx';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { typeAppDispatch } from '../../store/store.ts';
import {  userActions,  } from '../../store/user.slice.ts';
import { Loginresponse } from '../../interfaces/auth.enterface.ts';
import { register } from '../../store/user.slice.ts';
import { RootState } from "@reduxjs/toolkit/query";


export interface registerForm {
    email: {
        value: string,
    },
    password: {
        value: string,
    },
    name: {
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
           navigate('/menu')
        }
    }, [jwt, navigate])

    const submit = (e: FormEvent) => {
        e.preventDefault();
        seterror(null)
        const target = e.target as typeof e.target & registerForm;
        const { email, password, name } = target;
        dispatch(register({ email: email.value, password: password.value, name: name.value }));
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
                    <div className={cn('container-input2')}>
                        <label htmlFor="password" className={cn('label-input')}>Ваше Имя</label>
                        <InputLogin
                            type="text"
                            placeholder="Name"
                            name="name"
                            id='name'
                        />

                    </div>
                    <div className={cn('button-container')}>
                        <Button type="submit" appersnce="big">Зарегистрироваться</Button>
                    </div>
                    <div className={cn('text-container')}>
                        <p className={cn('text-1')}>уже есть аккакунт?</p>
                        <p className={cn('text-2')}>Вход</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
