import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import Trade from './pages/Trade';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';

function App() {
  const routes = [
    {
      path: '/',
      title: 'Sign up',
      element: SignUp,
      navigatable: true
    },
  {
      path: '/sign-in',
      title: 'Sign in',
      element: SignIn,
      navigatable: true
    },
    {
      path: '/trade',
      title: 'Trade',
      element: Trade,
      navigatable: true
    },
    {
      path: '/profile',
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

  return (
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
  );
}

export default App;