import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import router components
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './index.css';
import Login from './login';
import EventBookingHomepage from './home';
import CreateEvent from './CreateEvent'; // Import the new component
import Test from './Test';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<EventBookingHomepage />} />
          <Route path="/create-event" element={<CreateEvent />} /> {/* Added route for CreateEvent component */}
          <Route path="/test" element={<Test />} /> {/* Keep the test route */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
