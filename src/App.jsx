import Header from './components/Header/Header.jsx'
import './App.css'
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import React, { useEffect, useState } from 'react';


function App() {

  return (
    <>
      <Header />
      <main>
        <div style={{
          width: '90%',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
          alignItems: 'center',
          padding: '2rem 0'
        }}><ProductCard /></div>
      </main>
      <footer></footer>
    </>
  )
}

export default App
