import  { forwardRef, InputHTMLAttributes } from "react";

import './Search.css';


import cn from 'classnames';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    isValid?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, SearchProps>(function Input(
    { isValid = true, className, ...props }:SearchProps ,
    ref 
) {
    return (
        <div>
            <input
                ref={ref} 
                className={cn('input-navigation', className, { invalid: !isValid })} 
                {...props}
            />
            {!isValid && <p className="error-message">Please enter a valid search term</p>} 
            <img src="../public/free-icon-magnifier-2319177.png" alt="" className={cn('img-lypa')} />
        </div>
    );
});

export default SearchInput;
