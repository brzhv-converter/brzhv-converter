import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import Trade from './pages/Trade';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import { getAccaptableCoins } from './services/BinanceService';
import { ROUTES } from './constants/routes';

export const Cointext = createContext({});

function App() {
  const routes = [
    {
      path: '/',
      title: 'Sign up',
      element: SignUp,
      navigatable: false
    },
    {
      path: ROUTES.signUp,
      title: 'Sign up',
      element: SignUp,
      navigatable: true
    },
    {
      path: ROUTES.signIn,
      title: 'Sign in',
      element: SignIn,
      navigatable: true
    },
    {
      path: ROUTES.trade,
      title: 'Trade',
      element: Trade,
      navigatable: true
    },
    {
      path: ROUTES.profile,
      title: 'Profile',
      element: Profile,
      navigatable: true
    },
    {
      path: '*',
      title: '404',
      element: PageNotFound,
      navigatable: false
    },
  ]

  const [coins, updateCoins] = useState({});

  useEffect(() => {
    getAccaptableCoins()
    .then((res) => {
      const convertedData = res.data.reduce((obj, coin) => {
        obj[coin.ID] = {
          status: coin.isAccaptable,
          wallet: coin.wallet
        }
        return obj;
      }, {});

      updateCoins(convertedData);
    })
  }, [updateCoins])

  return (
    <Cointext.Provider value={coins}>
      <Router>
        <Header
          routes={routes}
        />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={`route-${path}`} path={path} Component={element} />
          ))}
        </Routes>
        <ToastContainer />
      </Router>
    </Cointext.Provider>
  );
}

export default App;