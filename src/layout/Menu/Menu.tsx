import {  NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import cn from 'classnames';
import './Menu.css';
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RooState, typeAppDispatch } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";




export function LAyout() {
    const navigate = useNavigate()
    const dispatch = useDispatch<typeAppDispatch>()
    const sprofile = useSelector((s: RooState) => s.user.profile)

    const LogOut = () => {
        dispatch(userActions.logout())
        navigate('/auth/login')
    }
    const location = useLocation();

    useEffect(() => {
        console.log(location);

    }, [location])

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    return (
        <div className={cn('answer-container')}>
            <div className={cn('menu-big__container')}>
                <img className={cn('img-avatar')} src="../public/man-avatar.webp" alt="" />
                <div className={cn('user-container')}>
                    <h1 className={cn('layout-title')}>
                       {sprofile?.name}
                    </h1>
                    <p className={cn('layout-text')}>
                       {sprofile?.email}
                    </p>
                </div>

                <div className={cn('menu-container')}>
                    <NavLink
                        to='/menu'
                        className={cn('menu-container__mini', { 'active': location.pathname === '/menu' })}
                    >
                        <img
                            src="../public/icon-menu.svg"
                            alt=""
                            className={cn('icon-menu')}
                        />
                        <p className={cn('text-menu', { 'active-text': location.pathname === '/menu' })}>Meню</p>
                    </NavLink>



                    <NavLink
                        to='/cart'
                        className={cn('cart-container', { 'active': location.pathname === '/cart' })}
                    >
                        <img
                            src="../public/shopping-bag.png"
                            alt=""
                            className={cn('icon-menu')}
                        />
                        <p className={cn('text-menu', { 'active-text': location.pathname === '/cart' })}>Корзина</p>
            
                    </NavLink>

                </div>

                <Button appersnce="spall" onClick={LogOut} className={cn('button')}>
                    <img src="../public/power-on-semicircle.png" alt="" />Выйти
                </Button>
                <div>

                </div>
            </div>
            <div>
                <div className={cn('vertical-line')}>
                </div>
            </div>
            <div>
            </div>
            <Outlet />
        </div>



    );
}

export default LAyout;