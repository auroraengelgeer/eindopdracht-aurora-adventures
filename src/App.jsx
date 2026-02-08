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
import About from "./pages/About/About.jsx";
import Faq from "./pages/Faq/Faq.jsx";
import Layout from "./components/Navigation/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/PublicOnlyRoute/PublicOnlyRoute.jsx";
import { useAutoLogout } from "./hooks/useAutoLogout";



function App() {
    useAutoLogout();

  return (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />

                <Route path="reizen" element={<TravelOverview />} />
                <Route path="reizen/:travelId" element={<TravelDetail />} />

                <Route
                    path="reserveren/:travelId"
                    element={
                        <ProtectedRoute>
                            <Booking />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="profiel"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="registreren"
                    element={
                        <PublicOnlyRoute>
                            <SignUp />
                        </PublicOnlyRoute>
                    }
                />

                <Route
                    path="inloggen"
                    element={
                        <PublicOnlyRoute>
                            <SignIn />
                        </PublicOnlyRoute>
                    }
                />


                <Route path="over-ons" element={<About />} />
                <Route path="faq" element={<Faq />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </>
  )
}

export default App
