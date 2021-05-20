import './App.css';
import { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/Profile'
import ProductPage from './pages/ProductPage'
import OrderPage from './pages/OrderPage'
import AdminPage from './pages/AdminPage'
import { useAuthContext } from './context/AuthenContextProvider'



const privateRoute = [

  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/product',
    component: ProductPage
  },
  {
    path: '/order',
    component: OrderPage
  },
  {
    path: '/admin',
    component: AdminPage
  }

]

const publicRoute = [
  {
    path: '/signin',
    component: SignInPage
  },
  {
    path: '/signup',
    component: SignUpPage
  },
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/product',
    component: ProductPage
  }
]

function App() {
  const { state } = useAuthContext()

  return (
    <BrowserRouter>
      <Switch>
        {state.isAuthen && privateRoute.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)}
        {!state.isAuthen && publicRoute.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
