import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Catalogue from './pages/Catalogue'
import Navbar from './components/Navbar'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  const handleLoaderFinished = () => {
    setLoading(false)
    // Ensure page starts at top when loader finishes
    window.scrollTo(0, 0)
  }

  return (
    <Router>
      {loading ? (
        <Loader onFinished={handleLoaderFinished} />
      ) : (
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/catalogue/:id" element={<Catalogue />} />
          </Routes>
        </div>
      )}
    </Router>
  )
}

export default App