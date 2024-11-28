import { Outlet } from "react-router-dom";
import cn from 'classnames';
import './AuthLatout.css';

function AuthLayout() {
  return (
    <div className={cn('big-container')}>
      <div className={cn('one-container')}>
        <img className={cn('img')} src="../public/flower.png" alt="" />
      </div>
      <div className={cn('vertical-line')}></div>
      <div className={cn('two-container')}>
     
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
