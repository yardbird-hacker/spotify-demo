import React, { Suspense, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import { loadingMessage } from './common/components/message';
import { exchangeToken } from './apis/authApi';
import useExchangeToken from './hooks/useExchangeToken';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(
  () => import('./pages/SearchWithKeywordPage/SearchWithKeywordPage')
);
const PlaylistDetailPage = React.lazy(
  () => import('./pages/PlaylistDetailPage/PlaylistDetailPage')
);
const PlaylistPage = React.lazy(
  () => import('./pages/PlaylistPage/PlaylistPage')
);

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense
      fallback={<div style={{ fontSize: '24px' }}>{loadingMessage}</div>}
    >
      <Routes>
        <Route path="/callback" element={<AppLayout />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="playlist" element={<PlaylistPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
