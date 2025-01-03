import './Cart.css';
import { useSelector } from 'react-redux';
import { CardProps } from '../../components/Card/Card';

export function Cart() {
  const items = useSelector((state: { cart: { items: CardProps[] } }) => state.cart.items);
  const totalSum = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleButtonClick = () => {
    const completeAnimation = document.getElementById('complete');
    completeAnimation?.classList.add('active');
    setTimeout(() => {
      completeAnimation?.classList.remove('active');
    }, 3000);
  };

  return (
    <>
      <div className='owner-main'>
        <main className="main-cart">
          <h1 className="main-cart__title">Корзина</h1>
          <div className="main-cart__cart-container">
            {items.length > 0 ? (
              <>
                <ul className="Cart-item-list">
                  {items.map((item, index) => (
                    <li key={index} className="Cart-item">
                      <div className="Cart-item-details">
                        <h2>{item.title}</h2>
                        <p className="Cart-item-details__text">{item.rating}⭐</p>
                        <p className="Cart-item-details__text">{item.ingredients}</p>
                        <p className="Cart-item-details__price">
                          {item.price} <span className="Rubl">₽</span>
                        </p>
                      </div>
                      <div className="Cart-item-details__grey-line"></div>
                    </li>
                  ))}
                </ul>

              </>
            ) : (
              <p className="Cart-empty">Ваша корзина пуста...</p>
            )}
          </div>

        </main>
        <div className='owner-total-sum-container'>
          {items.length > 0 ? (
            <>
              <div className="total-sum-container">
                <h2>Общая сумма:</h2>
                <p className="total-sum">
                  {`${totalSum}`} <span className="Rubl">₽</span>
                </p>

              </div>
              <div className='button-owner'>
                <button className='Cart-item-button ' id='button'  onClick={handleButtonClick}>Оформить заказ</button>
              </div>

            </>



          ) : (
            null
          )
          }
            <div className='owner-tick' id='complete'>
              <img className='animate-tick' src="/public/icons8-подтвержденная-учетная-запись.gif" alt="" />
            </div>
        </div>

      </div>


    </>
  );
}

export default Cart;
