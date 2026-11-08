import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './fonts.css'
import './styles.css'
import './cursor.css'

const el = document.getElementById('root')
const app = <React.StrictMode><App /></React.StrictMode>
// Em produção o HTML vem pré-renderizado: o React reaproveita (hidrata) em vez de redesenhar.
if (el.hasChildNodes()) hydrateRoot(el, app)
else createRoot(el).render(app)
