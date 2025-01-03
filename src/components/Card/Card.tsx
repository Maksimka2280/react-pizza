import cn from 'classnames';
import './Card.css';
import { CardProps } from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { typeAppDispatch } from '../../store/store';
import { cartActions } from '../../store/Cart.slice';

// Основной компонент Card
export function Card(props: CardProps) {
  const dispatch = useDispatch<typeAppDispatch>();

  // Получаем текущие элементы корзины из Redux
  const items = useSelector((state: { cart: { items: CardProps[] } }) => state.cart.items);

  // Функция для добавления товара в корзину
  const handleCardAdd = () => {
    const product: CardProps = {
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.image,
      ingredients: props.ingredients,
      rating: props.rating,
    };
    dispatch(cartActions.addItem(product)); // Добавляем товар в корзину
    console.log('add to cart', product);
    console.log('Текущая корзина:', items);
  };

  return (
    <div className={cn('Card-container')}>
      <div>
       

        {/* Основная информация о товаре */}
        <div className={cn('number-container')}>
          <div className={cn('price')}>
            {props.price}
            <span className={cn('Rubl')}>₽</span>
          </div>

          <div className={cn('cart-button__container')}>
            <button className={cn('cart-button')} onClick={handleCardAdd}>
              <img src="./dist/white-cart.png" alt="Добавить в корзину" />
            </button>
          </div>

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
