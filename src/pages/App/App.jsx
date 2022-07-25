
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import { useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import NewTripPage from "../NewTripPage/NewTripPage";
import TripIndexPage from "../TripIndexPage/TripIndexPage";




export default function App() {
  const [user, setUser] = useState({});





  return (
    <main className="App">
       { user ?
      <Routes>
        <Route path="/trips/new" element={<NewTripPage />} />
        <Route path="/trips" element={<TripIndexPage />} />
      </Routes>
      :
      <AuthPage />
    }
    </main>
  );
}


