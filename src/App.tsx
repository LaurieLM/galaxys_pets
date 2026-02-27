import { Navigate, Route, Routes } from "react-router-dom";
import Shelters from "./pages/Shelters";
import Nutrition from "./pages/Nutrition";
import Health from "./pages/Health";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Navbar />
            
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Navigate to="/shelters" replace />} />
                    <Route path="/shelters" element={<Shelters />} />
                    <Route path="/health" element={<Health />} />
                    <Route path="/nutrition" element={<Nutrition />} />
                </Routes>
            </main>

            <Footer />
        </div>
    )
}