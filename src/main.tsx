import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='min-h-screen flex flex-col'>
      <Header />
      <Navbar />
      <main className='flex-grow'>
          {/* Contenu principal de l'application */}  
      </main>
      <Footer />
    </div>
  </StrictMode>,
)
