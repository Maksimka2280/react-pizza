import cn from 'classnames';
import './Menu2.css';
import Search from '../../components/Search/Search.tsx';
import Card from '../../components/Card/Card.tsx';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API.ts';
import { Product } from '../../interfaces/product.interfsce.ts';
import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from "react-redux";


export function Menu2() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>()

 

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    getMenu(filter)
  }, [filter])

  const getMenu = async (name: string) => {
    try {
      setIsLoading(true)
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: { name }
      });
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      if (error instanceof AxiosError) {
        setError(error.message)
      }

      setIsLoading(false);
    }
  };



  useEffect(() => {
    getMenu()
  }, [])

  return (
    <div className={cn('big-container__catalog')}>
      <nav className={cn('container-navigation')}>
        <h1 className={cn('text-navigation')}>Меню</h1>
        <Search placeholder='Введите блюдо или состав' onChange={handleFilterChange} />
      </nav>
      <div className={cn('Card-pizza')}>
        {error && <>{error}</>}
        {!isLoading && products.map((p) => (
          <Card
            key={p.id}
            title={p.name}
            ingredients={p.ingredients.join(',')}
            rating={p.rating}
            price={p.price}
            image={p.image}
          />
        ))}
      
        {isLoading && <>Загружжаем продукты...</>}
      </div>
    </div>
  );
}

export default Menu2;