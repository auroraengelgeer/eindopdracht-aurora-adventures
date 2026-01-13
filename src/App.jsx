import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import TravelOverview from "./pages/TravelOverview/TravelOverview.jsx";
import Booking from "./pages/Booking/Booking.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import TravelDetail from "./pages/TravelDetail/TravelDetail.jsx";


function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reizen" element={<TravelOverview />} />
          <Route path="/reizen/:travelId" element={<TravelDetail />} />

          <Route path="/reserveren" element={<Booking />} />
          <Route path="/profiel" element={<Profile />} />

          <Route path="/registreren" element={<SignUp />} />
          <Route path="/inloggen" element={<SignIn />} />

          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
