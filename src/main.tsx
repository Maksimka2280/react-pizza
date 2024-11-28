import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import Login from './pages/LoginLogin/Login.tsx';

import './index.css';

import { Cart } from './pages/Cart/Cart.tsx';
import { LAyout } from './layout/Menu/Menu.tsx';
import { Product } from './components/Product/Product.js';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import AuthLAyout from './layout/Auth/AuthLayout.tsx';
import { RequesAuth } from './helpers/ReauireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx'
const Menu2 = lazy(() => import('./pages/Menu/Menu.tsx'))

const router = createBrowserRouter([

  {
    path: '/',
    element: <RequesAuth><LAyout /></RequesAuth>,
    children: [
      {
        path: '/menu',
        element: <Suspense fallback={<>Загружжаем...</>}><Menu2 /></Suspense>
      },
      {
        path: '/cart',
        element: <Cart />,
        
      },
      {
        path: '/product/:id',
        element: <Product />,
        loader:
        async ({ params }) => {
          return defer({
            data: new Promise<void>((resolve, reject, ) => {
                 setTimeout(() => {
                    axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e) )
                 },2000);
            })
          })
          // return defer({
          //   data:  await axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
          // })


          // const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          // return data;
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLAyout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path:'register',
        element: <RegisterPage />
      }
    ]
  }
  

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> 
       <RouterProvider router={router} />
    </Provider>
   
  </StrictMode>
);
