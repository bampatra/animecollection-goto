import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './Layout';
import MainPage from './components/MainPage';
import AnimeDetail from './components/AnimeDetail';
import AllCollections from './components/AllCollections';
import CollectionDetail from './components/CollectionDetail';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
            <Route path="/" element={<MainPage /> } />
            <Route path="/detail/:id" element={<AnimeDetail /> } />
            <Route path="/collections" element={<AllCollections /> } />
            <Route path="/collection/:id" element={<CollectionDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
