import Header from './components/Header/Header.jsx'
import './App.css'
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import React, { useEffect, useState } from 'react';


function App() {

  return (
    <>
      <Header />
      <main>
        <h2 style={{ color: '#b22234', fontSize: '32px'}}>NOSSAS NOVIDADES</h2>
        <div style={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}><ProductCard /></div>
      </main>
      <footer></footer>
    </>
  )
}

export default App
