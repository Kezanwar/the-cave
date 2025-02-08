import HomePage from '@app/pages/home';
import LobbyPage from '@app/pages/lobby/Lobby';
import React from 'react';
import { useRoutes } from 'react-router-dom';

// pages
// import Home from '@app/pages/Home';
// import Links from '@app/pages/Links';
// import File from '@app/pages/File';

const paths = [
  {
    path: '/',
    element: <HomePage />
  },
  { path: '/lobby', element: <LobbyPage /> }
  // { path: '/file/:uuid', element: <File /> }
];

const Routes: React.FC = () => {
  const elements = useRoutes(paths);
  return elements;
};

export default Routes;
