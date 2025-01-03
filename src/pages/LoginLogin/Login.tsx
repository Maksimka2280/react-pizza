import React, { FormEvent, useEffect, useState } from 'react';
import cn from 'classnames';
import './Login.css';
import InputLogin from '../../components/Input/InputLogin.tsx';
import Button from '../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { typeAppDispatch } from '../../store/store.ts';
import { login } from '../../store/user.slice.ts';

function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ useremail?: string; password?: string }>({});
    const navigate = useNavigate();
    const dispatch = useDispatch<typeAppDispatch>();
    const jwt = useSelector((s: RooState) => s.user.jwt);


    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    // Функция валидации полей
    const validate = () => {
        const errors: { useremail?: string; password?: string } = {};

        if (!useremail.trim()) {
            errors.useremail = 'Почта пользователя обязательна';
        }
        if (!password) {
            errors.password = 'Пожалуйста, введите пароль';
        }

        return errors;
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; 
        }
        sendLogin(useremail, password);
    };

    const sendLogin = async (email: string, password: string) => {
        try {
            await dispatch(login({ email, password }));
            navigate('/'); 
        } catch (err: any) {
            setError(err.message || 'Ошибка входа. Попробуйте снова.');
        }
    };

    return (
        <div className={cn('big-container')}>
            <div className={cn('two-container')}>
                <form className={cn('login-container')} onSubmit={submit}>
                    <h1>Вход</h1>

                    {/* Поле для email */}
                    <div className={cn('container-input')}>
                        {errors.useremail && <div className={cn('error-div')}>{errors.useremail}</div>}
                        <label htmlFor="email" className={cn('label-input')}>Ваш Email</label>
                        <InputLogin
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={useremail}
                            onChange={(e) => setUseremail(e.target.value)}
                        />
                    </div>

                 
                    <div className={cn('container-input2')}>
                        {errors.password && <div className={cn('error-div')}>{errors.password}</div>}
                        <label htmlFor="password" className={cn('label-input')}>Ваш пароль</label>
                        <InputLogin
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className={cn('error-global')}>{error}</div>}

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
