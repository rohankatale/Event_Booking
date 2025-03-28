import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './login'
import EventBookingHomepage from './home'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EventBookingHomepage/>
  </StrictMode>,
)
