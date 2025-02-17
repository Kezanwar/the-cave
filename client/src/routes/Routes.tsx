import AuthGuard from '@app/hocs/auth-guard';
import HomePage from '@app/pages/home';
import LobbyPage from '@app/pages/lobby/Lobby';
import Signin from '@app/pages/sign-in';
import React from 'react';
import { useRoutes } from 'react-router-dom';

// pages
// import Home from '@app/pages/Home';
// import Links from '@app/pages/Links';
// import File from '@app/pages/File';

const paths = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <HomePage />
      </AuthGuard>
    )
  },
  {
    path: '/lobby',
    element: (
      <AuthGuard>
        <LobbyPage />
      </AuthGuard>
    )
  },
  { path: '/sign-in', element: <Signin /> }
];

const Routes: React.FC = () => {
  const elements = useRoutes(paths);
  return elements;
};

export default Routes;
