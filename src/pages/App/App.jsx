
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from "../../components/NavBar/NavBar";
import { useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import NewTripPage from "../NewTripPage/NewTripPage";
import TripIndexPage from "../TripIndexPage/TripIndexPage";




export default function App() {
  const [user, setUser] = useState(null);





  return (
    <main className="App">
       { user ?
      <div>
       <NavBar
       user={user}
      />
      <Routes>
        <Route path="/trips/new" element={<NewTripPage />} />
        <Route path="/trips" element={<TripIndexPage />} />
      </Routes>
      </div>
      :
      <AuthPage />
    }
    </main>
  );
}


