import cn from 'classnames';
import './Card.css';
import { CardProps } from './Card';
import { useDispatch } from 'react-redux';
import { typeAppDispatch } from '../../store/store';
import { cartActions } from '../../store/Cart.slice';

export function Card(props: CardProps) {
    const dispatch = useDispatch<typeAppDispatch>()

    const add = (e: MouseEvent) => {
          e.preventDefault();
             dispatch(cartActions.add(props.id))
    
    }
    return (
        <div className={cn('Card-container')}>
            <div>
                <div className={cn('number-container')}>
                    <div className={cn('price')}>
                        {props.price}
                        <span className={cn('Rubl')}>₽</span>
                    </div>
                    <button onClick={add}>
                        +++
                    </button>
                    <img src={props.image} alt={props.title} className={cn('img-product')} />
                    <div className={cn('rating')}>
                        {props.rating}
                        <span className={cn('star')}>⭐</span>
                    </div>
                </div>
            </div>
            <div className={cn('text-container--2')}>
                <h1 className={cn('title')}>{props.title}</h1>
                <p className={cn('description')}>{props.ingredients}</p>
            </div>
        </div>
    );
}

export default Card;
